import { router } from "../../main";

function validationInput(email, password) {
    if(!email.value || !password.value) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return false;
    }
    return true;
}

function validationPassword(password) {
    if(password.value.length < 6) {
        alert("Mật khẩu cần dài hơn 6 ý tự");
        return false
    }
    return true
}

export async function afterRegister() {
    const registerForm = document.querySelector("#registerForm");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
        if(!validationInput(email, password)) return;
        if(!validationPassword(password)) return;
      const formData = new FormData(registerForm);
      const userInfor = Object.fromEntries(formData);
  
      try {
        const res = await fetch("http://localhost:3000/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userInfor),
        });
        
        const data = await res.json();
  
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
            alert("Đăng ký thành công")
            window.location.href = "http://localhost:5173/login";
        } else if (data === "Email already exists") {
          alert("Email đã tồn tại");
          registerForm.reset();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }