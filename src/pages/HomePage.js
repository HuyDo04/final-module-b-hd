import { Button } from "../components/common/Button";
import { Slides, initSlides } from "../components/ui/Slides";
import { Sidebar, handleSidebar } from "../components/ui/Sidebar";
import { ProductList, loadProducts } from "../features/product/ProductList";
import "../assets/slide.css";
import "../assets/sidebar.css";

async function HomePage() {  
    try {  
        const appContainer = document.getElementById("app");  
        const slidesHtml = await Slides(); 
        if (!appContainer) {  
            console.error("Lỗi: Không tìm thấy phần tử #app");  
            return;  
        }  

        appContainer.innerHTML = `<div class="loading">Đang tải...</div>`;  

        // Lấy dữ liệu sản phẩm và sidebar đồng thời  
        const [products, sideBar] = await Promise.all([  
            loadProducts(),  
            Sidebar()  
        ]);  

        const productList = await ProductList(products);  

        appContainer.innerHTML = `  
            <div>  
            ${slidesHtml}
                <div id="slider-wrapper">  
                    <div id="slider-container"></div>  
                </div>  
                <div id="sidebar-container" class="row">  
                    <div class="col-md-3">${sideBar}</div>  
                    <div class="col-md-9" id="product-container">${productList}</div>  
                </div>  
            </div>  
        ` 
         initSlides();
         handleSidebar();
    } catch (error) {  
        console.error("Lỗi khi tải trang chủ:", error);  
        const appContainer = document.getElementById("app");  
        if (appContainer) {  
            appContainer.innerHTML = `<div class="error">Lỗi tải dữ liệu. Vui lòng thử lại sau.</div>`;  
        }  
    }  
}  

export default HomePage;
