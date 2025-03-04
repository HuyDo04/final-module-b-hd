function RegisterPage() {
	return `<div>
	<h1 style="text-align: center;">Register</h1>

			 <form id="registerForm">
				<div class="mb-3">
				<label for="" class="form-label">Email address</label>
				<input type="email" class="form-control" name="email" id="email" required/>
				</div>
				<div class="mb-3">
				<label for="" class="form-label">Password</label>
				<input
					type="password"
					class="form-control"
					id="password"
					name="password"
					required
				/>
				</div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
		</div>`;
}

export default RegisterPage;
