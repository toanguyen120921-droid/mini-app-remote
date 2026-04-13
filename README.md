# Remote App

React Native app với Re.Pack và Module Federation.

## Remote Configuration

App này là **REMOTE** trong kiến trúc Module Federation:
- Expose components cho Host App load động
- Sử dụng shared dependencies từ Host App
- Bundle size nhỏ hơn nhờ không duplicate dependencies

## Exposed Components

- `./Button` - Remote Button component
- `./Card` - Remote Card component

## Commands

```bash
# Development
yarn start              # Start Metro bundler (port 9001)
yarn android           # Run on Android
yarn ios               # Run on iOS

# Production
yarn bundle:android    # Bundle for Android
yarn bundle:ios        # Bundle for iOS
```

## Module Federation Setup

Xem `webpack.config.mjs` để hiểu cấu hình Module Federation.

## Thêm Components mới

1. Tạo component trong `src/components/`
2. Expose trong `webpack.config.mjs`:

```javascript
exposes: {
  './Button': './src/components/Button',
  './Card': './src/components/Card',
  './YourNewComponent': './src/components/YourNewComponent', // ✅
}
```

3. Restart bundler
4. Import từ Host App
# mini-app-remote
# mini-app-remote
