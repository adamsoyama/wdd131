document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    const editTaskSection = document.getElementById('task-details-section');
    const editTaskForm = document.getElementById('edit-task-form');
    const editTaskTitle = document.getElementById('edit-task-title');
    const editTaskStartDate = document.getElementById('edit-task-start-date');
    const editTaskStartTime = document.getElementById('edit-task-start-time');
    const editTaskEndDate = document.getElementById('edit-task-end-date');
    const editTaskEndTime = document.getElementById('edit-task-end-time');
    const cancelChangesButton = document.getElementById('cancel-changes-button');
    let currentEditTaskId = null;

    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(getTaskClass(task));
            taskItem.innerHTML = `
                <span>${task.title}</span>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            console.log('Editing task:', taskId);
            currentEditTaskId = taskId;
            editTaskTitle.value = task.title;
            editTaskStartDate.value = task.startDate;
            editTaskStartTime.value = task.startTime;
            editTaskEndDate.value = task.endDate;
            editTaskEndTime.value = task.endTime;
            editTaskSection.classList.remove('hidden');
        }
    }

    function cancelChanges() {
        console.log('Canceling changes');
        editTaskSection.classList.add('hidden');
    }

    editTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskIndex = tasks.findIndex(task => task.id === currentEditTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].title = editTaskTitle.value;
            tasks[taskIndex].startDate = editTaskStartDate.value;
            tasks[taskIndex].startTime = editTaskStartTime.value;
            tasks[taskIndex].endDate = editTaskEndDate.value;
            tasks[taskIndex].endTime = editTaskEndTime.value;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            editTaskSection.classList.add('hidden');
        }
    });

    cancelChangesButton.addEventListener('click', cancelChanges);

    function getTaskClass(task) {
        const now = new Date();
        const endDateTime = new Date(`${task.endDate}T${task.endTime}`);
        const diff = (endDateTime - now) / (1000 * 60 * 60); // Difference in hours

        if (task.status === 'completed') {
            return 'task-completed';
        } else if (diff <= 0) {
            return 'task-overdue';
        } else if (diff <= 24) {
            return 'task-urgent';
        } else {
            return 'task-normal';
        }
    }

    // Event delegation for dynamically added tasks
    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            editTask(parseInt(event.target.dataset.id));
        }
    });

    displayTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    const currentyear = document.getElementById('currentyear');
    currentyear.textContent = new Date().getFullYear();

    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = `Last modified: ${document.lastModified}`;
});
