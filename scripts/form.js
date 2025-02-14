// Product array
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Populate product options
const productNameSelect = document.getElementById('product-name');
products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    productNameSelect.appendChild(option);
});

// Counter
if (localStorage.getItem('reviewCount') === null) {
    localStorage.setItem('reviewCount', 0);
}

document.getElementById('review-form').addEventListener('submit', () => {
    let count = parseInt(localStorage.getItem('reviewCount'));
    localStorage.setItem('reviewCount', ++count);
});

// Update current year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Update last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
