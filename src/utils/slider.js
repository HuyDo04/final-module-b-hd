export function initSlider() {
    setTimeout(() => {
        // 🛠️ Kiểm tra nếu thư viện slider đã được load
        if (typeof $ !== "undefined" && $(".slider").length) {
            $(".slider").slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
        }
    }, 300); // Đợi DOM load xong rồi mới chạy slider
}
