// Toggle Password Visibility
function togglePassword(inputId) {
const input = document.getElementById(inputId);
const button = event.target.closest('.toggle-password');
const icon = button.querySelector('i');

if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
} else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
}
}
// Show Error
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  errorText.textContent = message;
  errorDiv.style.display = 'flex';
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => {
      errorDiv.style.display = 'none';
  }, 4000);
}
// Validate Email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}