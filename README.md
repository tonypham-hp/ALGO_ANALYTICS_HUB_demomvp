
# ALGO Analytics Hub — MVP Demo

Bản demo giao diện MVP hợp nhất 42 chức năng đã đề xuất (3 giai đoạn phát triển),
dùng để trình bày cho sếp hình dung sản phẩm cuối cùng. **Toàn bộ số liệu, biểu đồ,
đoạn chat, bản tin trong bản demo này là dữ liệu MINH HỌA — không phải dữ liệu thị
trường thực.** Khi làm việc với đội dev, các API/data source thật sẽ thay thế file `data.js`.

Web thuần HTML/CSS/JS, không cần build, không phụ thuộc thư viện ngoài (trừ Google Fonts)

## BA-DEV: tonypham_hp    

## Cách deploy qua Vercel CLI 

```bash
npm i -g vercel
cd algo-hub-mvp
vercel         
vercel --prod   # deploy bản chính thức
```

## Cách deploy qua GitHub 

1. Đẩy thư mục này lên 1 repo GitHub mới
2. Vào vercel.com → **New Project** → chọn repo đó → Deploy 
3. Mỗi lần push code mới, Vercel tự động deploy lại

## Cấu trúc file

```
index.html      → khung giao diện chính (topbar, sidebar, main)
styles.css      → toàn bộ style, bảng màu, typography
data.js         → DỮ LIỆU MẪU — sửa file này để đổi số liệu demo
charts.js       → thư viện vẽ biểu đồ canvas tự viết (không phụ thuộc ngoài)
copy.js         → mô tả ngắn cho từng miền/chức năng (hiện ở màn hub)
app.js          → cấu hình 7 miền điều hướng, engine sidebar/routing
screens1-5.js   → toàn bộ 41 màn hình chức năng chi tiết (chia theo miền)
main.js         → trang chủ tổng quan, tìm kiếm toàn cục, khởi tạo app
```

## Đã kiểm thử

Toàn bộ 41 màn hình chức năng, chuyển đổi mã trong DN 360, chatbot AI (2 phiên bản),
tìm kiếm toàn cục, và watchlist đã được kiểm thử tự động (Playwright) — không phát sinh
lỗi JavaScript khi tải và điều hướng.
