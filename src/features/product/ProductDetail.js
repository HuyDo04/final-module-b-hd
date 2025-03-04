import "../../assets/ProductDetail.css";
import { addToCart } from "../../cart/cart";
import { fetchData } from "../../utils/api";
export async function loadProductById(productId) {
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        return null;
    }
}

// 🟢 Render trang chi tiết sản phẩm
export async function renderProductDetail(productId) {
    const container = document.getElementById("product-detail-container");

    if (!container) {
        console.error("Lỗi: Không tìm thấy phần tử #product-detail-container");
        return;
    }

    const product = await loadProductById(productId);

    if (!product) {
        container.innerHTML = `<p class="text-danger text-center">Không tìm thấy sản phẩm.</p>`;
        return;
    }

    container.innerHTML = `
        <div class="container mt-4 product-detail-container">
            <div class="row">
                <!-- Ảnh sản phẩm -->
                <div class="col-md-6 d-flex justify-content-center">
                    <img src="${product.images?.[0] || 'default.jpg'}" class="img-fluid rounded" alt="${product.title}">
                </div>

                <!-- Thông tin sản phẩm -->
                <div class="col-md-6 d-flex flex-column justify-content-center">
                    <h2 class="fw-bold">${product.title}</h2>
                    <p><strong>Giá:</strong> ${product.price}$</p>
                    <p><strong>Danh mục:</strong> ${product.category}</p>
                    <p><strong>Thương hiệu:</strong> ${product.brand}</p>
                    <p><strong>Mô tả:</strong> ${product.description}</p>

                    <!-- Nút thêm vào giỏ hàng -->
                    <button class="btn btn-primary mt-3" id="add-to-cart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    `;

         document.getElementById("add-to-cart").addEventListener("click", () => {
            addToCart(product);
            alert("Đã thêm vào giỏ hàng!");
        });
  
}
