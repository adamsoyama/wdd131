document.addEventListener('DOMContentLoaded', () => {
    const currentYear = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');
    const usernameSpan = document.getElementById('username');
    const profileFname = document.getElementById('profile-fname');
    const profileLname = document.getElementById('profile-lname');
    const profileEmail = document.getElementById('profile-email');
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureForm = document.getElementById('profile-picture-form');
    const profilePictureInput = document.getElementById('profile-picture-input');
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskStartDateInput = document.getElementById('task-start-date');
    const taskStartTimeInput = document.getElementById('task-start-time');
    const taskEndDateInput = document.getElementById('task-end-date');
    const taskEndTimeInput = document.getElementById('task-end-time');
    const taskDisplayList = document.getElementById('task-display-list');
    const calendar = document.getElementById('calendar');
    const eisenhowerMatrix = document.getElementById('eisenhower-matrix');
    const pomo = document.getElementById('pomo');
    const habitsPerformance = document.getElementById('habits-performance');
    const taskPieChartCanvas = document.getElementById('taskPieChart').getContext('2d');

    // Update footer with the current year and last modified date
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Modified: ${document.lastModified}`;

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        usernameSpan.textContent = userData.firstName;
        profileFname.textContent = userData.firstName;
        profileLname.textContent = userData.lastName;
        profileEmail.textContent = userData.email;
        profilePicture.src = userData.profilePicture || 'images/default-profile.png';
    } else {
        // Redirect to sign-up if no user data is found
        window.location.href = 'signup.html';
    }

    // Retrieve tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to display tasks
    function displayTasks() {
        taskDisplayList.innerHTML = '';
        let completedCount = 0, urgentCount = 0, normalCount = 0, overdueCount = 0;

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(getTaskClass(task));
            taskItem.innerHTML = `
                <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} onclick="toggleTaskCompletion(${task.id})" class="checkbox-completed">
                <span class="task-title">${task.title}</span>
                <span class="task-deadline">${task.endDate} ${task.endTime}</span>
                <div class="task-actions">
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})" class="delete-button">Delete</button>
                </div>
            `;
            taskDisplayList.appendChild(taskItem);

            // Count tasks for pie chart
            if (task.status === 'completed') {
                completedCount++;
            } else {
                switch (getTaskClass(task)) {
                    case 'task-normal':
                        normalCount++;
                        break;
                    case 'task-urgent':
                        urgentCount++;
                        break;
                    case 'task-overdue':
                        overdueCount++;
                        break;
                }
            }
        });

        const totalCount = completedCount + urgentCount + normalCount + overdueCount;
        const completedPercentage = (completedCount / totalCount) * 100;
        const urgentPercentage = (urgentCount / totalCount) * 100;
        const normalPercentage = (normalCount / totalCount) * 100;
        const overduePercentage = (overdueCount / totalCount) * 100;

        // Create pie chart
        const taskPieChart = new Chart(taskPieChartCanvas, {
            type: 'pie',
            data: {
                labels: ['Completed', 'Urgent', 'Normal', 'Overdue'],
                datasets: [{
                    data: [completedPercentage, urgentPercentage, normalPercentage, overduePercentage],
                    backgroundColor: ['#dff0d8', '#fcf8e3', '#d9edf7', '#f2dede'],
                    borderColor: ['#003377', '#003377', '#003377', '#003377'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.raw.toFixed(2)}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    // Function to display tasks in calendar format with 3-hour intervals
    function displayCalendar() {
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
        const hours = Array.from({ length: 4 }, (_, i) => `${i * 6}:00`);

        const calendarHtml = `
        <div class="calendar-row">
            <div class="calendar-time"></div>
            ${daysOfWeek.map(day => `<div class="calendar-day"><h4>${day}</h4></div>`).join('')}
        </div>
        ${hours.map(hour => `
            <div class="calendar-row">
                <div class="calendar-time">${hour}</div>
                ${daysOfWeek.map(() => `<div class="calendar-hour"></div>`).join('')}
            </div>
        `).join('')}
    `;
        calendar.innerHTML = calendarHtml;

        tasks.forEach(task => {
            const taskStartDate = new Date(`${task.startDate}T${task.startTime}`);
            const dayIndex = taskStartDate.getDay() === 0 ? 3 : taskStartDate.getDay() - 1; // Convert Sunday=0 to Sunday=6
            const hourIndex = Math.floor(taskStartDate.getHours() / 6);
            const taskItem = document.createElement('div');
            taskItem.classList.add('calendar-task', getTaskClass(task));
            taskItem.innerHTML = `
            <span class="task-title">${task.title}</span>
        `;

            const calendarHour = calendar.querySelector(`.calendar-row:nth-child(${hourIndex + 2}) .calendar-hour:nth-child(${dayIndex + 2})`);
            calendarHour.appendChild(taskItem);
        });
    }

    // Call the displayCalendar function initially
    displayCalendar();

    function displayEisenhowerMatrix() {
        const completedTasks = document.getElementById('completed-tasks').querySelector('ul');
        const normalTasks = document.getElementById('normal-tasks').querySelector('ul');
        const overdueTasks = document.getElementById('overdue-tasks').querySelector('ul');
        const urgentTasks = document.getElementById('urgent-tasks').querySelector('ul');

        completedTasks.innerHTML = '';
        normalTasks.innerHTML = '';
        overdueTasks.innerHTML = '';
        urgentTasks.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.title;

            switch (getTaskClass(task)) {
                case 'task-completed':
                    completedTasks.appendChild(taskItem);
                    break;
                case 'task-normal':
                    normalTasks.appendChild(taskItem);
                    break;
                case 'task-overdue':
                    overdueTasks.appendChild(taskItem);
                    break;
                case 'task-urgent':
                    urgentTasks.appendChild(taskItem);
                    break;
            }
        });
    }

    // Call the displayEisenhowerMatrix function initially
    displayEisenhowerMatrix();

    function displayPomoSection() {
        const normalCompletedTasks = document.getElementById('normal-completed-tasks').querySelector('ul');
        const urgentOverdueTasks = document.getElementById('urgent-overdue-tasks').querySelector('ul');
        const progressMessage = document.getElementById('pomo-progress-message');

        normalCompletedTasks.innerHTML = '';
        urgentOverdueTasks.innerHTML = '';

        let normalCompletedCount = 0;
        let urgentOverdueCount = 0;

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.title;

            switch (getTaskClass(task)) {
                case 'task-completed':
                case 'task-normal':
                    normalCompletedTasks.appendChild(taskItem);
                    normalCompletedCount++;
                    break;
                case 'task-urgent':
                case 'task-overdue':
                    urgentOverdueTasks.appendChild(taskItem);
                    urgentOverdueCount++;
                    break;
            }
        });

        const totalTasks = normalCompletedCount + urgentOverdueCount;
        const normalCompletedPercentage = (normalCompletedCount / totalTasks) * 100;
        const urgentOverduePercentage = (urgentOverdueCount / totalTasks) * 100;

        progressMessage.textContent = `Normal & Completed: ${normalCompletedPercentage.toFixed(2)}% | Urgent & Overdue: ${urgentOverduePercentage.toFixed(2)}%`;

        if (normalCompletedPercentage >= 80) {
            progressMessage.textContent += '\nCongratulations on your progress! 🎉 Keep up the great work!';
        } else {
            progressMessage.textContent += '\nYou can do better! Keep pushing to complete more tasks!';
        }
    }

    // Call the displayPomoSection function initially
    displayPomoSection();

    // Function to get task class based on status and deadlines
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

    // Function to toggle task completion
    window.toggleTaskCompletion = function (taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.status = task.status === 'completed' ? 'pending' : 'completed';
            saveTasks();
            displayTasks();
            displayCalendar();
        }
    }

    // Function to edit task (redirect to task details page)
    window.editTask = function (taskId) {
        window.location.href = `taskDetails.html?taskId=${taskId}`;
    }

    // Function to delete task
    window.deleteTask = function (taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        displayTasks();
        displayCalendar();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener to add a new task
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTask = {
            id: tasks.length + 1,
            title: taskTitleInput.value,
            status: 'pending',
            priority: getTaskClass({ endDate: taskEndDateInput.value, endTime: taskEndTimeInput.value }),
            startDate: taskStartDateInput.value,
            startTime: taskStartTimeInput.value,
            endDate: taskEndDateInput.value,
            endTime: taskEndTimeInput.value
        };
        tasks.push(newTask);
        saveTasks();
        displayTasks();
        displayCalendar();

        // Clear form inputs
        taskTitleInput.value = '';
        taskStartDateInput.value = '';
        taskStartTimeInput.value = '';
        taskEndDateInput.value = '';
        taskEndTimeInput.value = '';
    });

    // Event listener to upload profile picture
    profilePictureForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const file = profilePictureInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const profilePictureUrl = e.target.result;
                profilePicture.src = profilePictureUrl;

                // Update user data with the new profile picture
                userData.profilePicture = profilePictureUrl;
                localStorage.setItem('userData', JSON.stringify(userData));
            };
            reader.readAsDataURL(file);
        }
    });

    // Initial display of tasks and calendar
    displayTasks();
    displayCalendar();
});
document.addEventListener('DOMContentLoaded', () => {
    const greetingMessage = document.getElementById('greeting-message');
    const appreciationMessage = document.getElementById('appreciation-message');
    const taskManagementTip = document.getElementById('task-management-tip');

    // Function to get the current time and set the greeting message
    function setGreetingMessage() {
        const now = new Date();
        const hours = now.getHours();
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userName = userData ? userData.firstName : 'User';

        if (hours < 12) {
            greetingMessage.textContent = `Good Morning, ${userName}!`;
        } else if (hours < 18) {
            greetingMessage.textContent = `Good Afternoon, ${userName}!`;
        } else {
            greetingMessage.textContent = `Good Evening, ${userName}!`;
        }
    }

    // Set the appreciation message
    function setAppreciationMessage() {
        appreciationMessage.textContent = 'Thank you for using Task Manager! Your dedication and hard work are greatly appreciated.';
    }

    // Set a task management tip
    function setTaskManagementTip() {
        taskManagementTip.textContent = 'Helpful Tip: Prioritize your tasks by urgency and importance. Focus on high-priority tasks first to maximize productivity!';
    }

    // Update the "Goodbye" section content
    setGreetingMessage();
    setAppreciationMessage();
    setTaskManagementTip();
});
