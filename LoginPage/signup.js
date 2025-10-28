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
