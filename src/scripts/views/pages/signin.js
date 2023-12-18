/* eslint-disable no-alert */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../globals/config';

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
          <h1>Sign In</h1>
          <p>Let’s get started with us!</p>
        </div>
        <div class="input-container">
          <input type="text" id="email" name="email" required />
          <label for="email">Email</label>
        </div>
        <div class="input-container">
          <input type="password" id="password" name="password" required />
          <label for="password">Password</label>
        </div>
        <button class="signin-btn" type="submit">Sign In</button>
        <div class="akun">Tidak punya akun? <a href="#/register">Register</a></div>
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

      const auth = getAuth(firebaseApp);
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
