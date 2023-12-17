/* eslint-disable no-alert */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/Firebase';

const SignIn = {
  async render() {
    const headerH1 = document.querySelector('header');
    headerH1.style.display = 'none';
    const landingHead = document.querySelector('.landing-head');

    if (landingHead) {
      landingHead.style.display = 'none';
    } else {
      console.error("Elemen dengan kelas 'landing-head' tidak ditemukan.");
    }

    const footer = document.querySelector('footer');
    footer.style.display = 'none';

    return `
    <section class="signin">
      <div class="container">
        <div class="signin-image"></div>
        <div class="form">
          <form id="signin-form">
            <div class="signin-header">
              <h1 style="color: #CE5A18; font-family: Poppins; font-size: 24px; font-style: normal; font-weight: 600; line-height: normal; letter-spacing: 0.48px;">Signin</h1>
              <p style="color: #000; font-family: Poppins; font-size: 14px; font-style: normal; font-weight: 300; line-height: normal; letter-spacing: 0.28px;">Let’s get started with us!</p>
            </div>
            <div class="input-container">
              <input style="padding: 10px; margin: 8px 0; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; outline: none; transition: border-color 0.3s;" type="text" id="email" name="email" required />
              <label for="email">Email</label>
            </div>
            <div class="input-container">
              <input style="padding: 10px; margin: 8px 0; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; outline: none; transition: border-color 0.3s;" type="password" id="password" name="password" required />
              <label for="password">Password</label>
            </div>
            <button class="signin-button" type="submit">Sign In</button>
            <div style="display:inline">Tidak punya akun <a href="#/register">Register</a></div>
          </form>
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const auth = getAuth(app);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          alert('akun kamu belum terverifikasi silahkan cek email kamu');
        } else {
          alert('Sukses Login');
          window.location.href = '/#/home';
        }
      } catch (error) {
        alert(error.message);
        console.error('Login error:', error.message);
      }
    });
  },
};

export default SignIn;
