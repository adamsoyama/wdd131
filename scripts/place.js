// JavaScript code to update the current year and last modified date
document.addEventListener("DOMContentLoaded", function () {
    // Update the current year
    const currentYearElement = document.getElementById("currentyear");
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    // Update the last modified date
    const lastModifiedElement = document.getElementById("lastModified");
    const lastModifiedDate = new Date(document.lastModified);
    lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`;

    // Static temperature and wind speed
    const temperature = 28; // °C
    const windSpeed = 15; // km/h

    // Calculate Wind Chill
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById('wind-chill').textContent = windChill ? windChill + '°C' : 'N/A';
});

function calculateWindChill(temperature, windSpeed) {
    if ((temperature <= 10 && windSpeed > 4.8) || (temperature <= 50 && windSpeed > 3)) {
        return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1);
    } else {
        return null;
    }
}
