// Array of product objects
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

// Function to populate the product select options
function populateProductOptions() {
    const productSelect = document.getElementById('productName');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Function to populate the rating stars
function populateRatingOptions() {
    const ratingGroup = document.getElementById('ratingGroup');
    for (let i = 1; i <= 5; i++) {
        const label = document.createElement('label');
        label.innerHTML = `&#9733;`.repeat(i); // Use stars for each rating level (e.g., 3 stars for rating 3)
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'rating';
        radio.id = `rating${i}`;
        radio.value = i;
        radio.required = true;
        ratingGroup.appendChild(radio);
        ratingGroup.appendChild(label);
    }
}

// Function to populate the useful features checkboxes
function populateFeaturesOptions() {
    const features = ["Durability", "Ease of Use", "Performance", "Design"];
    const featuresGroup = document.getElementById('featuresGroup');
    features.forEach(feature => {
        const label = document.createElement('label');
        label.textContent = feature;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'features';
        checkbox.value = feature;
        featuresGroup.appendChild(checkbox);
        featuresGroup.appendChild(label);
    });
}

// Run the functions to populate the form dynamically
populateProductOptions();
populateRatingOptions();
populateFeaturesOptions();

// Handle form submission confirmation and counter
window.onload = function() {
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form from submitting to a server
        const reviewCount = localStorage.getItem('reviewCount') || 0;
        localStorage.setItem('reviewCount', parseInt(reviewCount) + 1);
        window.location.href = "review.html";
    });
};
