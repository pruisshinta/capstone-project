const SignIn = {
  async render() {
    return `
      <section class="signin">
        <h2 class="label-title">Sign In</h2>
        <form id="signin-form">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>

          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>

          <button type="submit">Sign In</button>
        </form>
      </section>
    `;
  },

  async afterRender() {
    const signinForm = document.getElementById("signin-form");
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
    });
  },
};

export default SignIn;
