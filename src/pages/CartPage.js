import { getCart, updateCart, removeFromCart } from "../cart/cart";  

export async function fetchCart() {  
    try {  
        const response = await fetch("http://localhost:3000/cart");  
        return await response.json();  
    } catch (error) {  
        console.error("❌ Lỗi khi tải giỏ hàng:", error);  
        return [];  
    }  
}  

export default async function CartPage() {  
    const cartItems = await fetchCart();  

    if (!cartItems || cartItems.length === 0) {  
        return `<h2 class="text-center mt-4">Giỏ hàng của bạn đang trống!</h2>`;  
    }  

    return `  
        <div class="container mt-4">  
            <h2>Giỏ hàng của bạn</h2>  
            <table class="table">  
                <thead>  
                    <tr>  
                        <th>Tên sản phẩm</th>  
                        <th>Giá</th>  
                        <th>Số lượng</th>  
                        <th>Thành tiền</th>  
                        <th>Thao tác</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    ${cartItems.map(item => `  
                        <tr data-id="${item.id}">  
                            <td>${item.title}</td>  
                            <td>${item.price.toLocaleString()} $</td>  
                            <td>  
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1">  
                            </td>  
                            <td>${(item.price * item.quantity).toLocaleString()} $</td>  
                            <td>  
                                <button class="btn btn-danger btn-remove">Xóa</button>  
                            </td>  
                        </tr>  
                    `).join("")}  
                </tbody>  
            </table>  
            <h4 class="text-end">Tổng tiền: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} $</h4>  
            <button class="btn btn-primary mt-3" id="checkout-btn">Thanh toán</button>  
        </div>  
    `;  
}  

// 🛒 Xử lý sự kiện thay đổi số lượng và xóa sản phẩm  
export function setupCartEvents() {  
    document.querySelectorAll(".quantity-input").forEach(input => {  
        input.addEventListener("change", async function () {  
            const productId = this.closest("tr").dataset.id;  
            await updateCart(productId, parseInt(this.value));  
            location.reload();  
        });  
    });  

    document.querySelectorAll(".btn-remove").forEach(button => {  
        button.addEventListener("click", async function () {  
            const productId = this.closest("tr").dataset.id;  
            await removeFromCart(productId);  
            location.reload();  
        });  
    });  

    // 🛒 Thêm sự kiện cho nút "Thanh toán"
   const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {  // Kiểm tra nếu nút tồn tại
    checkoutBtn.addEventListener("click", async () => {
        // Xóa tất cả dữ liệu trong localStorage  
        localStorage.clear();

        try {
            // Lấy dữ liệu giỏ hàng hiện tại
            const response = await fetch("http://localhost:3000/cart");
            if (!response.ok) {
                throw new Error('Không thể lấy dữ liệu giỏ hàng');
            }
            const cartItems = await response.json();

            // Xóa từng sản phẩm trong giỏ hàng
            for (const item of cartItems) {
                const deleteResponse = await fetch(`http://localhost:3000/cart/${item.id}`, {
                    method: 'DELETE'
                });
                if (!deleteResponse.ok) {
                    throw new Error(`Không thể xóa sản phẩm với ID: ${item.id}`);
                }
            }

            // Nếu xóa thành công hết, hiển thị thông báo
            alert('Đặt hàng thành công!');
            location.reload(); // Tải lại trang để làm mới giỏ hàng  
        } catch (error) {
            console.error('Có lỗi xảy ra khi xử lý thanh toán:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    });
}
}
