/* eslint-disable no-alert */
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import app from '../../firebase/Firebase';

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
                <div class="register-header">
                  <h1 style="color: #CE5A18; font-family: Poppins; font-size: 24px; font-style: normal; font-weight: 600; line-height: normal; letter-spacing: 0.48px;">register</h1>
                  <p style="color: #000; font-family: Poppins; font-size: 14px; font-style: normal; font-weight: 300; line-height: normal; letter-spacing: 0.28px;">Create your account!</p>
                </div>
                <div class="input-container">
                  <input style="padding: 10px; margin: 8px 0; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; outline: none; transition: border-color 0.3s;" type="text" id="username" name="username" required />
                  <label for="username">Username</label>
                </div>
                <div class="input-container">
                  <input style="padding: 10px; margin: 8px 0; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; outline: none; transition: border-color 0.3s;" type="email" id="email" name="email" required />
                  <label for="email">Email</label>
                </div>
                <div class="input-container">
                  <input style="padding: 10px; margin: 8px 0; width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; font-size: 16px; outline: none; transition: border-color 0.3s;" type="password" id="password" name="password" required />
                  <label for="password">Password</label>
                </div>
                <button class="register-button" type="submit">Register</button>
              </form>
              <p> Already have an account? <a href="#/signin" style="display:inline; text-decoration:none; color:#ce5a18">Sign in</a></p>
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

      const auth = getAuth(app);

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
