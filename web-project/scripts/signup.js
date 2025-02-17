document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const currentYear = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');

    // Update footer with the current year and last modified date
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Modified: ${document.lastModified}`;

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Store user data in localStorage
        const userData = {
            firstName,
            lastName,
            email,
            password
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
    });
});
