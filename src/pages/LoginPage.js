import { afterLogin } from "../features/afterLogin";

function Login() {
    const view = /*html*/ `
	<h1 style="text-align: center;">Login</h1>
        <form id="loginForm">
            <div class="mb-3">
                <label for="" class="form-label">Email</label>
                <input type="email" class="form-control" name="email" required/>
            </div>

            <div class="mb-3">
                <label for="" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" required/>
            </div>

            <div class="mb-3">
                <button class="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
    `;
    
    // Đợi DOM load xong rồi mới gắn sự kiện
    setTimeout(() => {
        afterLogin();
    }, 0);

    return view;
}

export default Login;