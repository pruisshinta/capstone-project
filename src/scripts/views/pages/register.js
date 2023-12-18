/* eslint-disable no-alert */
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import firebaseApp from '../../globals/config';

const Register = {
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
    <section class="register">
    <div class="container">
      <div class="register-image"></div>
      <div class="form">
        <form id="register-form">
          <div class="signin-header">
            <h1>Register</h1>
            <p>Create your account!</p>
          </div>
          <div class="input-container">
            <input type="text" id="username" name="username" required />
            <label for="username">Username</label>
          </div>
          <div class="input-container">
            <input type="email" id="email" name="email" required />
            <label for="email">Email</label>
          </div>
          <div class="input-container">
            <input type="password" id="password" name="password" required />
            <label for="password">Password</label>
          </div>
          <button class="register-button" type="submit">Register</button>
        </form>
        <p class="akun">Already have an account? <a href="#/signin">Sign in</a></p>
      </div>
    </div>
  </section>
  
      `;
  },

  async afterRender() {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      const auth = getAuth(firebaseApp);

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await updateProfile(userCredential.user, {
          username,
          // Add more fields as needed
        });
        alert('registered');
        console.log('User registered:', userCredential.user);
      } catch (error) {
        alert(error.message);
        console.error('Registration error:', error.message);
      }
    });
  },
};

export default Register;
