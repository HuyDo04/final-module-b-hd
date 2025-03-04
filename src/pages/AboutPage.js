import "../assets/about.css";

function AboutPage() {
	return `<div>
			 <section class="about-section">
        <div class="container">
            <h2>Về Chúng Tôi</h2>
            <p>Chào mừng bạn đến với <strong>Cosmetics</strong>! Chúng tôi là cửa hàng chuyên cung cấp các sản phẩm mỹ phẩm
                chính hãng và chất lượng nhất. Với sứ mệnh mang lại vẻ đẹp tự nhiên và sự tự tin cho phái đẹp, chúng tôi
                không ngừng nỗ lực để cung cấp các sản phẩm tốt nhất với giá cả hợp lý.</p>
        </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
        <div class="container">
            <h2>Đội Ngũ Của Chúng Tôi</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card team-card">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" class="card-img-top" alt="Team Member 1">
                        <div class="card-body text-center">
                            <h5 class="card-title">Alex</h5>
                            <p class="card-text">Chuyên gia mỹ phẩm</p>
                            <a href="#" class="btn btn-outline-primary">Liên hệ</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card team-card">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D" class="card-img-top" alt="Team Member 2">
                        <div class="card-body text-center">
                            <h5 class="card-title">Alice</h5>
                            <p class="card-text">Chuyên viên tư vấn</p>
                            <a href="#" class="btn btn-outline-primary">Liên hệ</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card team-card">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" class="card-img-top" alt="Team Member 3">
                        <div class="card-body text-center">
                            <h5 class="card-title">Bob</h5>
                            <p class="card-text">Nhân viên marketing</p>
                            <a href="#" class="btn btn-outline-primary">Liên hệ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

		</div>`;
}

export default AboutPage;
