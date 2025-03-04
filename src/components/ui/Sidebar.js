
export async function Sidebar () {
   try {
    const response  = await fetch("http://localhost:3000/products");
    const data = await response.json();
    const products = data.products || data;
    const categories = [...new Set(products.map((item) => item.category))];
    console.log(categories)
     return `
        <div class="">
                <!-- Sidebar -->
                <div class="col-md-3">
                    <div class="sidebar p-3 bg-light rounded shadow-sm sticky-top">
                        <h5 class="mb-3">Danh Mục Sản Phẩm</h5>
                        <ul class="list-group">
                        <li class="list-group-item category-filter active" data-category="all">Tất Cả</li>
                        ${categories.map((item) =>
                            `
                                <li class="list-group-item category-filter active" data-category="${item}">${item}</li>
                            `
                        ).join('')}
                        </ul>
                        <a href="http://localhost:5173/register" class = "register">Register</a>
                        <a href="http://localhost:5173/login" class = "login">Login</a>
                    </div>
                </div>
        </div>
    `
   } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
   }
}

export function handleSidebar() {
    const categories = document.querySelectorAll(".category-filter");
    const products = document.querySelectorAll(".product");

    categories.forEach(category => {
        category.addEventListener("click", function () {
            // Xóa class active ở tất cả danh mục
            categories.forEach(c => c.classList.remove("active"));
            this.classList.add("active");

            const selectedCategory = this.getAttribute("data-category");

            // Lọc sản phẩm
            products.forEach(product => {
                if (selectedCategory === "all" || product.getAttribute("data-category") === selectedCategory) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });
}
