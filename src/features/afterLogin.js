export async function afterLogin() {
    document.addEventListener("DOMContentLoaded", () => {
        const loginForm = document.querySelector("#loginForm");
        
        if (loginForm) {  // Kiểm tra nếu form tồn tại
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(loginForm);
                const loginData = Object.fromEntries(formData);
                
                try {
                    const res = await fetch("http://localhost:3000/login", {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(loginData),
                    });

                    const data = await res.json();

                    if (data.accessToken) {
                        localStorage.setItem("accessToken", data.accessToken);
                        localStorage.setItem("userLogin", JSON.stringify(data));
                        alert("Đăng nhập thành công!");
                        window.location.href = "http://localhost:5173";
                    } else if (data === "Cannot find user") {
                        alert("Tài khoản không tồn tại");
                    } else if (data === "Incorrect password") {
                        alert("Mật khẩu không chính xác");
                    } else {
                        alert("Đăng nhập thất bại, vui lòng thử lại.");
                    }
                } catch (error) {
                    console.error("Có lỗi xảy ra khi xử lý đăng nhập:", error);
                    alert("Có lỗi xảy ra, vui lòng thử lại.");
                }
            });
        } else {
            console.error("Không tìm thấy form #loginForm");
        }
    });
}
