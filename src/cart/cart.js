export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export async function addToCart(product) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    try {
        const response = await fetch("http://localhost:3000/cart");
        const serverCart = await response.json();

        const itemInServer = serverCart.find(item => item.id === product.id);

        if (itemInServer) {
            await fetch(`http://localhost:3000/cart/${product.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: itemInServer.quantity + 1 })
            });
        } else {
            // 🟢 Nếu chưa có, thêm sản phẩm vào db.json
            await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...product, quantity: 1 })
            });
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
}

//  Cập nhật số lượng sản phẩm
export async function updateCart(productId, quantity) {
    let cart = getCart();
    cart = cart.map(item => item.id === productId ? { ...item, quantity } : item);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật trong db.json
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
    });
}

//  Xóa sản phẩm khỏi giỏ hàng
export async function removeFromCart(productId) {
    let cart = getCart().filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));

    //  Xóa sản phẩm khỏi db.json
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE"
    });
}
