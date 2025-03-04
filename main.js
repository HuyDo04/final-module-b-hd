import Navigo from "navigo";
import "./style.css";
import HomePage from "./src/pages/HomePage";
import AboutPage from "./src/pages/AboutPage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import NotFoundPage from "./src/pages/NotFoundPage";
import { renderProductDetail } from "./src/features/product/ProductDetail";
import CartPage, { setupCartEvents } from "./src/pages/CartPage";
import { afterRegister } from './src/features/afterRegister';
import { afterLogin } from './src/features/afterLogin';

const app = document.querySelector("#app");

function render(contentFn, beforeFn = null, afterFn = null) {
    beforeFn && beforeFn();
    app.innerHTML = contentFn();
    afterFn && afterFn();

    // Gán lại sự kiện điều hướng sau khi render nội dung mới
    document.querySelectorAll("a[data-navigo]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            router.navigate(link.getAttribute("href"));
        });
    });
}

export const router = new Navigo("/", { linksSelector: "a[data-navigo]", hash: true });

router.on("/", () => render(HomePage));
router.on("/about", () => render(AboutPage));
router.on("/register", () => render(RegisterPage, null, afterRegister));
router.on("/login", () => render(LoginPage, null, afterLogin));


// 🟢 Thêm route chi tiết sản phẩm
router.on("/product/:id", ({ data }) => {
    const productId = data.id;
    render(() => `<div id="product-detail-container"></div>`, null, () => {
        renderProductDetail(productId);
    });
});
router.on("/cart", async () => {  
    const content = await CartPage(); // Giả sử CartPage bây giờ là một hàm trả về một Promise  
    render(() => content, null, setupCartEvents);  
});  

router.notFound(() => render(NotFoundPage));
router.resolve();
