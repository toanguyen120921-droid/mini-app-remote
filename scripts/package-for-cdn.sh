#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Resolve node binary — ưu tiên node@22 của homebrew
NODE_BIN=""
for candidate in \
  "/opt/homebrew/opt/node@22/bin/node" \
  "/opt/homebrew/opt/node@18/bin/node" \
  "$(which node 2>/dev/null || true)"; do
  if [ -x "$candidate" ]; then
    NODE_BIN="$candidate"
    break
  fi
done

if [ -z "$NODE_BIN" ]; then
  echo "❌  Không tìm thấy node. Hãy cài node và thử lại."
  exit 1
fi

export PATH="$(dirname "$NODE_BIN"):$PATH"
echo "✅  Dùng node: $NODE_BIN ($(node --version))"

# --------------------------------------------------------------------------
# Version: ưu tiên arg truyền vào, fallback về version trong package.json
# --------------------------------------------------------------------------
if [ "${1:-}" != "" ]; then
  VERSION="$1"
else
  VERSION="$("$NODE_BIN" -p "require('$ROOT_DIR/package.json').version" 2>/dev/null || echo "0.0.1")"
fi

OUT_DIR="$ROOT_DIR/cdn-dist"
PLATFORMS=("ios" "android")

echo ""
echo "🎬  movies-app — Đóng gói CDN bundle"
echo "📦  Version : $VERSION"
echo "📁  Output  : $OUT_DIR"
echo ""

for platform in "${PLATFORMS[@]}"; do
  echo "──────────────────────────────────────────"
  echo "▶  Bundling platform: $platform"
  echo "──────────────────────────────────────────"

  # Bước 1: webpack bundle (production, minified bởi Terser + webpack-obfuscator)
  YARN_IGNORE_PATH=1 "$NODE_BIN" "$ROOT_DIR/node_modules/.bin/react-native" \
    webpack-bundle \
    --platform "$platform" \
    --dev false \
    --entry-file index.js

  # Bước 2: embed federation exposes (generate chunk index)
  "$NODE_BIN" "$ROOT_DIR/embed-federation-exposes.mjs" "$ROOT_DIR/build/$platform"

  # Bước 3: javascript-obfuscator lần 2 (extra obfuscation lên toàn bộ bundles)
  "$NODE_BIN" "$ROOT_DIR/obfuscate-bundles.mjs" "$ROOT_DIR/build/$platform"

  # Bước 4: copy vào cdn-dist với version path
  DEST="$OUT_DIR/movies-app/$platform/$VERSION"
  mkdir -p "$DEST"
  cp -R "$ROOT_DIR/build/$platform/." "$DEST/"

  echo "✅  $platform → $DEST"
done

# --------------------------------------------------------------------------
# Tạo manifest.json
# --------------------------------------------------------------------------
cat > "$OUT_DIR/manifest.json" <<EOF
{
  "version": "$VERSION",
  "apps": {
    "movies-app": {
      "version": "$VERSION",
      "ios": "movies-app/ios/$VERSION",
      "android": "movies-app/android/$VERSION"
    }
  }
}
EOF

echo ""
echo "══════════════════════════════════════════"
echo "🎉  Hoàn tất! CDN payload sẵn sàng tại:"
echo "    $OUT_DIR"
echo ""
echo "Cấu trúc CDN dự kiến:"
echo "  movies-app/android/$VERSION/MoviesApp.container.js.bundle"
echo "  movies-app/ios/$VERSION/MoviesApp.container.js.bundle"
echo "══════════════════════════════════════════"
