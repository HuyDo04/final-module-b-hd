// Hàm lấy dữ liệu sản phẩm từ API
export async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        return data.products || data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        return [];
    }
}

// Hàm render danh sách sản phẩm
export async function ProductList(products, sortOrder) {
    if (!products || products.length === 0) {
        return `<p class="text-center text-danger">Không có sản phẩm nào.</p>`;
    }

    return `
        <div class="col-md-10">
            <h2 class="mb-4 text-center">Danh Sách Sản Phẩm</h2>

            <!-- Ô chọn sắp xếp giá -->
            <div class="mb-3 text-end">
                <label for="sort-price" class="me-2">Sắp xếp theo giá:</label>
                <select id="sort-price" class="form-select w-auto d-inline-block">
                    <option value="default" ${sortOrder === "default" ? "selected" : ""}>Mặc định</option>
                    <option value="asc" ${sortOrder === "asc" ? "selected" : ""}>Giá tăng dần</option>
                    <option value="desc" ${sortOrder === "desc" ? "selected" : ""}>Giá giảm dần</option>
                </select>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4" id="product-list">
                ${products.map((item) => `
                    <div class="col product" data-category="${item.category}">
                        <div class="card h-100">
                            <a href="/product/${item.id}" data-navigo class="text-decoration-none text-dark">

                        <img src="${item.images[0]}" class="card-img-top" alt="${item.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text">${item.price}$</p>
                                </div>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Hàm lọc sản phẩm theo từ khóa tìm kiếm
async function filterProducts(keyword) {
    const products = await loadProducts();
    const lowerKeyword = keyword.toLowerCase();

    return products.filter((item) => 
        item.title.toLowerCase().includes(lowerKeyword) || 
        item.category.toLowerCase().includes(lowerKeyword)
    );
}

// Hàm hiển thị danh sách sản phẩm lên giao diện với sắp xếp
export async function renderProducts(keyword = "", sortOrder = "default") {
    const container = document.getElementById("product-container");

    if (!container) {
        console.error("Lỗi: Không tìm thấy phần tử #product-container");
        return;
    }

    // Lọc sản phẩm theo từ khóa nếu có
    let filteredProducts = keyword ? await filterProducts(keyword) : await loadProducts();

    if (sortOrder === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price); 
    } else if (sortOrder === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price); 
    }

    const productHtml = await ProductList(filteredProducts, sortOrder);
    container.innerHTML = productHtml;

    // Đảm bảo gán lại sự kiện cho <select> sau khi render
    const sortSelect = document.getElementById("sort-price");
    if (sortSelect) {
        sortSelect.addEventListener("change", (event) => {
            renderProducts(keyword, event.target.value); // Gọi lại render với tùy chọn sắp xếp mới
        });
    }
}

// Xử lý sự kiện tìm kiếm khi nhập vào ô input
document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.querySelector("input[type='search']");
    let currentSortOrder = "default";

    // Gán sự kiện khi nhập vào ô tìm kiếm
    searchInput.addEventListener("input", async () => {
        const keyword = searchInput.value.trim();
        await renderProducts(keyword, currentSortOrder);
    });

    // Gọi hàm hiển thị sản phẩm ban đầu
    await renderProducts();

    // Lắng nghe sự kiện thay đổi trên select (sắp xếp giá)
    document.addEventListener("change", async (event) => {
        if (event.target.id === "sort-price") {
            currentSortOrder = event.target.value;
            const keyword = searchInput.value.trim();
            await renderProducts(keyword, currentSortOrder);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".product a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const url = event.target.closest("a").getAttribute("href");
            window.location.href = url;
        });
    });
});

