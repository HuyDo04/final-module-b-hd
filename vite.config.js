import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // Cổng chạy Vite (có thể thay đổi nếu cần)
    open: true, // Mở trình duyệt khi chạy
    historyFallback: true, // 🟢 Quan trọng: Hỗ trợ điều hướng trang khi tải lại
    watch: {
      usePolling: true
    }
  }
});
