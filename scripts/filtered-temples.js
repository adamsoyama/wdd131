document.addEventListener("DOMContentLoaded", function () { 
    const temples = [
        {
            name: "Aba Nigeria Temple",
            location: "Aba, Nigeria",
            dedicated: "2005",
            area: 11300,
            imageUrl: "images/aba_nigeria_temple_lds.jpg",
            alt: "Aba, Nigeria Temple"
        },
        {
            name: "Salt Lake Temple",
            location: "Salt Lake City, Utah",
            dedicated: "1893",
            area: 253000,
            imageUrl: "images/salt_lake_temple.jpg",
            alt: "Salt Lake Temple"
        },
        {
            name: "Provo City Center Temple",
            location: "Provo, Utah",
            dedicated: "2016",
            area: 90000,
            imageUrl: "images/provo_city_center_temple.jpg",
            alt: "Provo City Center Temple"
        },
        {
            name: "Kyiv Ukraine Temple",
            location: "Kyiv, Ukraine",
            dedicated: "2010",
            area: 22250,
            imageUrl: "images/kyiv_ukraine_temple.jpg",
            alt: "Kyiv Ukraine Temple"
        },
        {
            name: "Guadalajara Mexico Temple",
            location: "Guadalajara, Mexico",
            dedicated: "2001",
            area: 18000,
            imageUrl: "images/guadalajara_mexico_temple.jpg",
            alt: "Guadalajara Mexico Temple"
        },
        {
            name: "Rome Italy Temple",
            location: "Rome, Italy",
            dedicated: "2019",
            area: 40000,
            imageUrl: "images/rome_italy_temple.jpg",
            alt: "Rome Italy Temple"
        },
        {
            name: "Papeete Tahiti Temple",
            location: "Papeete, Tahiti",
            dedicated: "1983",
            area: 10500,
            imageUrl: "images/papeete_tahiti_temple.jpg",
            alt: "Papeete Tahiti Temple"
        },
        {
            name: "Accra Ghana Temple",
            location: "Accra, Ghana",
            dedicated: "2004",
            area: 17000,
            imageUrl: "images/accra_ghana_temple_lds.jpg",
            alt: "Accra Ghana Temple"
        },
        {
            name: "Manti Utah Temple",
            location: "Manti, Utah, United States",
            dedicated: "1888",
            area: 74700,
            imageUrl: "images/manti_utah_temple.jpg",
            alt: "Manti Utah Temple"
        },
        {
            name: "Payson Utah Temple",
            location: "Payson, Utah, United States",
            dedicated: "2015",
            area: 96630,
            imageUrl: "images/payson_utah_temple.jpg",
            alt: "Payson Utah Temple"
        }
    ];

    const templeContainer = document.getElementById("temple-container");

    function displayTemples(temples) {
        templeContainer.innerHTML = "";
        temples.forEach(temple => {
            const templeCard = document.createElement("figure");
            templeCard.innerHTML = `
                <figcaption>
                    <h3>${temple.name}</h3>
                    <p>Location: ${temple.location}</p>
                    <p>Dedicated: ${temple.dedicated}</p>
                    <p>Area: ${temple.area} sq ft</p>
                </figcaption>
                <img src="${temple.imageUrl}" alt="${temple.alt}" loading="lazy">
            `;
            templeContainer.appendChild(templeCard);
        });
    }

    displayTemples(temples); // Display all temples initially

    // Filter temples based on the navigation menu items
    document.getElementById("home").addEventListener("click", () => displayTemples(temples));
    document.getElementById("old").addEventListener("click", () => displayTemples(temples.filter(temple => parseInt(temple.dedicated) < 1900)));
    document.getElementById("new").addEventListener("click", () => displayTemples(temples.filter(temple => parseInt(temple.dedicated) > 2000)));
    document.getElementById("large").addEventListener("click", () => displayTemples(temples.filter(temple => temple.area > 90000)));
    document.getElementById("small").addEventListener("click", () => displayTemples(temples.filter(temple => temple.area < 10000)));

    // Update the current year in the footer 
    const currentYearElement = document.getElementById("currentyear"); 
    const currentYear = new Date().getFullYear(); 
    currentYearElement.textContent = currentYear; 
    
    // Update the last modified date in the footer 
    const lastModifiedElement = document.getElementById("lastModified"); 
    const lastModifiedDate = new Date(document.lastModified); 
    lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`; 
    
    // Toggle the navigation menu for mobile view
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
});
