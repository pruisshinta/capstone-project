document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout');

  logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '#/landing';
  });
});
