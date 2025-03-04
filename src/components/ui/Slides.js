async function Slides() {
  try {
    const response = await fetch("http://localhost:3000/products"); // Fetch data từ API
    const data = await response.json();

    const products = data.products || data; // Đảm bảo lấy danh sách sản phẩm

    if (!Array.isArray(products) || products.length === 0) {
      console.error("❌ Lỗi: Không có sản phẩm nào!");
      return `<div class="container">Không có sản phẩm nào để hiển thị!</div>`;
    }

    // Lấy tất cả ảnh từ tất cả sản phẩm
    const slidesData = products.flatMap((product) =>
      product.images.map((image) => ({
        image,
        title: product.title,
      }))
    );

    if (slidesData.length === 0) {
      console.error("❌ Lỗi: Không có ảnh nào để hiển thị!");
      return `<div class="container">Không có ảnh nào để hiển thị!</div>`;
    }

    // Tạo HTML cho slider
    return `
      <div class="container">
        <section id="hero-section">
          <ul class="slides"></ul>
          <div class="controls">
            <i class="fa-solid fa-circle-chevron-left control-btn btn-prev"></i>
            <i class="fa-solid fa-circle-chevron-right control-btn btn-next"></i>
          </div>
          <div class="dots"></div>
        </section>
      </div>
    `;
  } catch (error) {
    console.error("❌ Lỗi khi tải ảnh:", error);
    return `<div class="container">Lỗi khi tải dữ liệu</div>`;
  }
}

// 🔹 **Xử lý logic slider**
async function initSlides() {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    const products = data.products || data;
    if (!Array.isArray(products) || products.length === 0) return;

    // Lấy danh sách ảnh từ tất cả sản phẩm
    const slidesData = products.flatMap((product) =>
      product.images.map((image) => ({
        image,
        title: product.title,
      }))
    );

    const slidesContainer = document.querySelector(".slides");
    const btnNext = document.querySelector(".btn-next");
    const btnPrev = document.querySelector(".btn-prev");
    const dotsContainer = document.querySelector(".dots");
    const heroSection = document.querySelector("#hero-section");

    let currentIndex = 0;
    const slideLength = slidesData.length;
    const dotCount = 5; 
    let slideInterval = null; 

    
    dotsContainer.innerHTML = "";

    // Tạo slides
    slidesContainer.innerHTML = ""; 
    slidesData.forEach((slide) => {
      const slideItem = document.createElement("li");
      slideItem.classList.add("slide");
      slideItem.innerHTML = `
        <img src="${slide.image}" alt="${slide.title}">
        <p>${slide.title}</p>
      `;
      slidesContainer.appendChild(slideItem);
    });

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }

    const dotsItem = document.querySelectorAll(".dot");

    // Hiển thị slide
    function showSlide() {
      const slideAll = document.querySelectorAll(".slide");

      slideAll.forEach((slide) => (slide.style.display = "none"));
      slideAll[currentIndex].style.display = "block";

      updateDots();
    }

    // Next slide
    function changeSlide() {
      currentIndex = (currentIndex + 1) % slideLength;
      showSlide();
    }

    // Prev slide
    function handlePrevSlide() {
      currentIndex = (currentIndex - 1 + slideLength) % slideLength;
      showSlide();
    }

    if (btnNext && btnPrev) {
      btnNext.addEventListener("click", changeSlide);
      btnPrev.addEventListener("click", handlePrevSlide);
    }

    function updateDots() {
      dotsItem.forEach((dot) => dot.classList.remove("active-dot"));

      // Xác định vị trí dot hiển thị tương ứng với ảnh
      const activeDotIndex = currentIndex % dotCount;
      dotsItem[activeDotIndex].classList.add("active-dot");
    }

    // Click vào dot để chuyển slide
    dotsItem.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        currentIndex = index;
        showSlide();
      });
    });

    // Hàm khởi động interval
    function startAutoSlide() {
      if (!slideInterval) {
        slideInterval = setInterval(changeSlide, 3000);
      }
    }

    // Hàm dừng interval
    function stopAutoSlide() {
      clearInterval(slideInterval);
      slideInterval = null;
    }

    // Bắt đầu chạy slider tự động
    startAutoSlide();

    // Dừng slider khi hover vào heroSection
    heroSection.addEventListener("mouseover", stopAutoSlide);

    // Chạy lại slider khi rời chuột
    heroSection.addEventListener("mouseout", startAutoSlide);

    showSlide();
  } catch (error) {
    console.error("❌ Lỗi khi khởi động slider:", error);
  }
}

export { Slides, initSlides };
