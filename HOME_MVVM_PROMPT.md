# Home Screen MVVM Prompt

## Bản đầy đủ

Bạn là một Senior React Native Engineer đã làm nhiều super app. Hãy tích hợp màn hình `Home` của app phim vào codebase hiện tại theo đúng kiến trúc `MVVM`, ưu tiên cách tổ chức sạch, dễ mở rộng, production-ready.

### Bối cảnh project

- Đây là app `React Native` thuần, không dùng `expo-router`.
- Project đang chạy theo kiểu `remote mini-app` với `Re.Pack + Module Federation`.
- Codebase đã có pattern `features/.../models`, `features/.../viewmodels`.
- Không được phá cấu trúc hiện có, không revert các thay đổi unrelated trong git worktree.
- Không thêm dependency mới nếu project đã có sẵn giải pháp tương đương.

### Yêu cầu triển khai

- Tạo module `home` riêng theo MVVM.
- Tách rõ:
  - `model`: định nghĩa `Movie`, `HomeSection`, theme, copy text, mock data, helper filter/sort/build sections.
  - `viewmodel`: quản lý `activeCategory`, `activeSlide`, xử lý `onLoadComplete`, `onRequestUpdate`, `onMoviePress`, `onSeeAllPress`.
  - `view`: render `HomeScreen` từ dữ liệu của ViewModel, không nhét business logic vào UI.
- Tích hợp màn `Home` vào `App.tsx` theo kiểu entry mỏng, chỉ bọc provider cần thiết rồi render `HomeScreen`.
- Vì app không dùng `expo-router`, phải thay `router.push` bằng callback sạch ở tầng ViewModel để host app có thể cắm navigation sau này.
- Nếu host chưa truyền callback thì fallback hợp lý bằng `Alert`.
- Dùng `react-native-linear-gradient` cho overlay.
- Dùng icon nội bộ bằng `react-native-svg` thay vì phụ thuộc font icon ngoài.
- Ưu tiên `useWindowDimensions` để tính width responsive thay vì hardcode cứng theo `Dimensions` một lần.
- UI cần giữ tinh thần cinematic, premium, đúng chất app phim, nhưng vẫn chạy ổn trên mobile nhỏ.
- Categories phải filter được danh sách phim.
- Carousel phải cập nhật pagination theo slide hiện tại.
- Các section như `Most Popular`, `Latest Movies` phải được build từ model/helper thay vì hardcode rời rạc trong view.
- Chuẩn bị sẵn các props integration cho host app như:
  - `onLoadComplete`
  - `onRequestUpdate`
  - `onMoviePress`
  - `onSeeAllPress`

### Yêu cầu kỹ thuật

- Không viết mọi thứ dồn trong một file.
- Không đưa navigation logic trực tiếp vào UI.
- Không dùng `expo-router`.
- Không dùng mock theo kiểu tạm bợ khó mở rộng.
- Nếu `tsconfig` hiện tại khiến `tsc --noEmit` fail do config cũ, hãy sửa tối thiểu để typecheck pass.
- Sau khi làm xong phải tự chạy kiểm tra type và sửa hết lỗi.

### Kết quả mong muốn

- Có `feature/home` hoàn chỉnh theo MVVM.
- `App.tsx` render được màn `Home`.
- Project typecheck pass.
- Cuối cùng, tóm tắt ngắn gọn:
  - đã tạo những phần nào
  - đã thay thế logic gì
  - đã verify bằng cách nào

## Bản ngắn

Hãy tích hợp màn hình `Home` của app phim vào project `React Native` hiện tại theo kiến trúc `MVVM`. App này là `React Native` thuần, không dùng `expo-router`, đang theo mô hình `remote mini-app` với `Re.Pack + Module Federation`, và codebase đã có pattern `features/.../models`, `features/.../viewmodels`.

Yêu cầu:

- Tạo `feature/home` tách rõ `model`, `viewmodel`, `view`.
- `model` phải chứa `Movie`, `HomeSection`, theme, copy text, mock data, helper filter/sort/build sections.
- `viewmodel` quản lý `activeCategory`, `activeSlide`, `onLoadComplete`, `onRequestUpdate`, `onMoviePress`, `onSeeAllPress`.
- `view` chỉ render UI từ dữ liệu ViewModel, không chứa business logic.
- Thay `router.push` bằng callback ở ViewModel để host app có thể gắn navigation sau này.
- Nếu chưa có callback thì fallback bằng `Alert`.
- Dùng `react-native-linear-gradient`, `react-native-svg`, `useWindowDimensions`.
- Categories phải filter phim, carousel phải sync pagination, các section phải được build từ helper thay vì hardcode trong UI.
- `App.tsx` chỉ là entry mỏng render `HomeScreen`.
- Không thêm dependency mới nếu project đã có sẵn.
- Không revert các thay đổi unrelated trong git worktree.
- Sau khi làm xong phải chạy `tsc --noEmit` và sửa hết lỗi.

Đầu ra mong muốn:

- Có màn `Home` hoạt động được trong app.
- Cấu trúc đúng MVVM, sạch, dễ mở rộng, production-ready.
- Cuối cùng tóm tắt ngắn phần đã làm và cách verify.
