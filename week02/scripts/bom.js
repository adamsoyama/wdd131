const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

document.addEventListener("DOMContentLoaded", function () {
    const currentYearElement = document.getElementById("currentyear");
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    const lastUsedElement = document.getElementById("lastUsed");
    const lastUsedDate = new Date(document.lastModified);
    lastUsedElement.textContent = `Last Used: ${lastUsedDate.toLocaleDateString()} ${lastUsedDate.toLocaleTimeString()}`;

    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && input.value !== '') {
            addChapter();
        }
    });

    button.addEventListener('click', function () {
        if (input.value !== '') {
            addChapter();
        }
    });

    function addChapter() {
        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        li.appendChild(deleteButton);
        list.appendChild(li);

        input.value = '';

        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
        });
    }
});
