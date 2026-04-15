import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import * as Repack from "@callstack/repack";
import WebpackObfuscator from "webpack-obfuscator";

const HOST_OWNED_NATIVE_MODULES = {
  "react-native-safe-area-context": "5.7.0",
  "react-native-svg": "15.15.4",
  "react-native-linear-gradient": "2.8.3",
  "react-navigation/bottom-tabs": "7.15.9",
  "react-navigation/compat": "5.3.20",
};

const createNativeSharedConfig = () =>
  Object.fromEntries(
    Object.entries(HOST_OWNED_NATIVE_MODULES).map(([name, version]) => [
      name,
      {
        singleton: true,
        eager: true,
        requiredVersion: version,
      },
    ]),
  );

export default (env) => {
  const {
    mode = "development",
    context = Repack.getDirname(import.meta.url),
    entry = "./index.js",
    minimize = mode === "production",
    devServer = undefined,
  } = env || {};
  const platform = env?.platform ?? process.env.PLATFORM;

  if (!platform) {
    throw new Error("Missing platform");
  }

  const dirname = Repack.getDirname(import.meta.url);
  const reactNativePath = path.join(dirname, "node_modules/react-native");

  return {
    mode,
    devtool: false,
    context,
    entry,
    resolve: {
      ...Repack.getResolveOptions(platform),
      alias: {
        "react-native": reactNativePath,
        "@babel/runtime": path.join(dirname, "node_modules/@babel/runtime"),
        // Force @tanstack packages to use compiled ESM builds.
        // Without this, Repack may resolve the @tanstack/custom-condition
        // export entry which points to src/index.ts (raw TypeScript).
        // Use .js (ESM) instead of .cjs to avoid Property 'exports' errors.
        // "@tanstack/query-core": path.join(
        //   dirname,
        //   "node_modules/@tanstack/query-core/build/legacy/index.js",
        // ),
        // "@tanstack/react-query": path.join(
        //   dirname,
        //   "node_modules/@tanstack/react-query/build/legacy/index.js",
        // ),
      },
    },
    output: {
      clean: true,
      path: path.join(dirname, "build", platform),
      filename: "index.bundle",
      chunkFilename: "[name].chunk.bundle",
      publicPath: "http://localhost:9004/",
    },
    optimization: {
      minimize,
      minimizer: [
        new TerserPlugin({
          test: /\.(js)?bundle(\?.*)?$/i,
          extractComments: false,
          terserOptions: {
            compress: {
              passes: 2,
              drop_console: true,
            },
            mangle: {
              reserved: ["MoviesApp"],
            },
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        // ── Fix 0: CommonJS explicit files ──────────────────────────────────────
        // Packages with "type":"module" cause .cjs files to be treated as ESM,
        // making `module.exports` undefined in Hermes ("Property 'exports'
        // doesn't exist"). Force webpack to treat them as plain CommonJS.
        {
          test: /\.cjs$/,
          type: 'javascript/auto',
        },
        // ── Fix 1: ESM strict resolution ────────────────────────────────────────
        // @react-navigation/* and other ESM packages import without file
        // extensions (e.g. 'react/jsx-runtime', 'nanoid/non-secure').
        // Setting fullySpecified:false tells webpack not to require them.
        {
          test: /\.m?[jt]sx?$/,
          resolve: {
            fullySpecified: false,
          },
        },
        // ── Fix 2: babel-loader for ESM node_modules ─────────────────────────────
        // Extend the include list to cover all packages that ship ESM modules
        // or TypeScript source that needs transpilation.
        {
          test: /\.[jt]sx?$/,
          include: [
            /node_modules(.*[/\\])+react/,
            /node_modules(.*[/\\])+@react-native/,
            /node_modules(.*[/\\])+@callstack\/repack/,
            /node_modules(.*[/\\])+@tanstack/,
            /node_modules(.*[/\\])+zustand/,
          ],
          use: "babel-loader",
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
              plugins: ['@babel/plugin-transform-async-generator-functions'],
            },
          },
        },
        {
          test: Repack.getAssetExtensionsRegExp(Repack.ASSET_EXTENSIONS),
          use: {
            loader: "@callstack/repack/assets-loader",
          },
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        platform,
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: "MoviesApp",
        dts: false,
        filename: "MoviesApp.container.js.bundle",
        exposes: {
          "./Button": "./src/components/Button/index",
          "./Card": "./src/components/Card/index",
          "./App": "./src/App",
          "./ProfileScreen": "./src/features/profile/views/ProfileScreen",
        },
        shared: {
          react: {singleton: true, eager: true, requiredVersion: "19.2.3"},
          "react-native": {
            singleton: true,
            eager: true,
            requiredVersion: "0.85.0",
          },
          ...createNativeSharedConfig(),
        },
      }),
      new WebpackObfuscator(
        {
          compact: true,
          identifierNamesGenerator: "hexadecimal",
          stringArray: true,
          stringArrayThreshold: 0.75,
          rotateStringArray: true,
          simplify: true,
          deadCodeInjection: false,
          controlFlowFlattening: false,
          renameGlobals: false,
          renameProperties: false,
          selfDefending: false,
          debugProtection: false,
        },
        ["MoviesApp.container.js.bundle"],
      ),
    ],
  };
};
