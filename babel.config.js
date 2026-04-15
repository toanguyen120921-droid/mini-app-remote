module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // // @tanstack/query-core uses `for await` (async iteration) in
    // // streamedQuery.js.  Hermes cannot parse this syntax natively,
    // // so we need to transpile it explicitly.
    // '@babel/plugin-transform-async-generator-functions',
  ],
};
