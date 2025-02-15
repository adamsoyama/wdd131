document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');

    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Here you can add your sign-in logic, e.g., authentication with a server
        console.log('Sign In:', { email, password });
        
        // Redirect to dashboard after successful sign-in
        window.location.href = 'dashboard.html';
    });

    // Display current year in the footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    // Display last modified date in the footer
    document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
});
