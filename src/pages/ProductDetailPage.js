import { renderProductDetail } from "../features/product/ProductDetail.js";

export default function ProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Lấy ID sản phẩm từ URL

    if (!productId) {
        return `<p class="text-danger text-center">Sản phẩm không hợp lệ.</p>`;
    }

    setTimeout(() => {
        renderProductDetail(productId); // Render sản phẩm sau khi load DOM
    }, 0);

    return `<div id="product-detail-container"></div>`; // Container để hiển thị sản phẩm
}
