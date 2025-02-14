const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Declare chaptersArray and initialize it with data from getChapterList or an empty array
let chaptersArray = getChapterList() || [];

// Function to get chapter list from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('chapters')) || [];
}

// Function to set chapter list in localStorage
function setChapterList() {
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
}

// Function to display a chapter in the list
function displayList(item) {
    // Create list item element
    const li = document.createElement('li');
    li.textContent = item;

    // Create delete button element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';

    // Append delete button to list item
    li.appendChild(deleteButton);
    // Append list item to the list
    list.appendChild(li);

    // Event listener for delete button
    deleteButton.addEventListener('click', function () {
        deleteChapter(item);
    });
}

// Function to delete a chapter from the array and localStorage
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // Remove the ❌ character
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
    list.innerHTML = ''; // Clear the current list
    chaptersArray.forEach(displayList); // Re-populate the list
}

// Populate the list with chapters on page load
chaptersArray.forEach(displayList);

// Add event listener for button click
button.addEventListener('click', function () {
    if (input.value !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = ''; // Clear the input field
        input.focus(); // Set focus back to the input
    }
});

// Add event listener for the 'Enter' key on the input field
input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && input.value !== '') {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = ''; // Clear the input field
        input.focus(); // Set focus back to the input
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const currentYearElement = document.getElementById("currentyear");
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    const lastUsedElement = document.getElementById("lastUsed");
    const lastUsedDate = new Date(document.lastModified);
    lastUsedElement.textContent = `Last Used: ${lastUsedDate.toLocaleDateString()} ${lastUsedDate.toLocaleTimeString()}`;
});
