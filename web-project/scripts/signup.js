document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const currentYear = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');

    // Update footer with the current year and last modified date
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Modified: ${document.lastModified}`;

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Store user data in localStorage
        localStorage.setItem('fname', fname);
        localStorage.setItem('lname', lname);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
    });
});
