// Function to save profile information
function saveProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const profilePicture = document.getElementById('profile-picture').files[0];
    
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profilePictureData = e.target.result;
            alert(`Profile saved! \nName: ${name} \nEmail: ${email} \nProfile Picture: Uploaded`);
        };
        reader.readAsDataURL(profilePicture);
    } else {
        alert(`Profile saved! \nName: ${name} \nEmail: ${email} \nProfile Picture: Not Uploaded`);
    }
}

// Function to log out and redirect to homepage
function logout() {
    alert('Logged out!');
    window.location.href = 'homepage.html';  // Redirecting to homepage.html
}

// Function to change password
function changePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    // Implement password change logic (e.g., API call)
    alert('Password changed successfully!');
}

// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
