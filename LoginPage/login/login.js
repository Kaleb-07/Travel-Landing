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

        // Handle Login
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');

            // Validation
            if (!email || !password) {
                showError('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                showError('Password must be at least 6 characters');
                return;
            }

            // Show loading
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-block';

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                const userData = {
                    email: email,
                    firstName: email.split('@')[0],
                    loginTime: new Date().toISOString()
                };

                localStorage.setItem('wanderlustUser', JSON.stringify(userData));
                alert('✅ Login successful! Welcome back!');
                window.location.href = 'dashboard.html';
            } catch (error) {
                showError('Login failed. Please try again.');
            } finally {
                btnText.style.display = 'inline';
                btnSpinner.style.display = 'none';
            }
        });

        // Social Login
        function socialLogin(provider) {
            alert(`Logging in with ${provider}... (Integration needed)`);
        }