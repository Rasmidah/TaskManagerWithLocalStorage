# Task Manager Code Explanation
This document provides a detail explanation of the Task Manager Web Application code. The application is a simple yet complete task management system built with HTML, CSS, and JavaScript. 

### Table of Contents
1. [HTML Structure](#html-structure)
2. [CSS Structure](#css-styling)
3. [JavaScript Functionality](#javascript-functionality)
4. [Data Management](#data-management)
5. [Event Handling](#event-handling)

### HTML Structure
The HTML structure define the user interface of the Task Manager Apllication

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager using local storage</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- outside container with class "container" -->
    <div class="container">
        <h1>Task Manager</h1>

        <!-- input section -->
        <div class="input-section">
            <input type="text" id="task-input" placeholder="Add a new task...">
            <button id="add-button">Add Task</button>
        </div>

        <!-- task list -->
        <ul id="task-list" class="task-list"> 
            <!-- the task will be added here dynamically -->
        </ul>

        <!-- No tasks -->
        <div id="no-tasks" class="no-tasks">
            No tasks yet. Add a task to get started
        </div>

        <!-- status bar -->
        <div class="status-bar">
            <span id="tasks-count">Total 0 tasks</span>
            <span id="completed-count">Completed: 0</span>
        </div>

        <!-- button to clear all task -->
        <button id="clear-all" class="clear-all">Clear all tasks</button>

        <script src="script.js"></script>

    </div>
</body>
</html>
```
Key HTML Components:
- A container `div` that wraps the entire application
- A heading that display the title
- An input section with text field and an "Add" button
- An empty unordered list (`ul`) where tasks will be displayed
- A message that shows when there are no task
- A status bar showing task counts
- A "Clear All Tasks" button

### CSS Styling
The CSS defines the visual appearance of the Task Manager
```CSS
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif
}

body{
    background-color: #f4f4f4;
    padding: 20px;
}
.container{
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
}
h1{
    text-align: center;
    margin-bottom: 20px;
}
.input-section{
    display: flex;
    margin-bottom: 20px;
}
#task-input{
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border-color: white;
    font-size: 16px;
}
#add-button{
    padding: 10px 20px;
    border-radius: 10px;
    border-color: white;
    cursor: pointer;
}
#add-button:hover{
    background-color: royalblue;
    color: white;
}
.task-list{
    list-style-type: none;
}
.task-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
}
.task-text{
    flex: 1;
    margin-left: 10px;
}
.clear-all{
    display: block;
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    border-color: white;
    cursor: pointer;
    background-color: #ff9800;
    color: white;
}
.clear-all:hover{
    background-color: royalblue;
    color: white;
}
.no-tasks{
    text-align: center;
    color: #888;
    font-style: italic;
    padding: 20px;
}
.status-bar{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 15px;
    font-size: 14px;
    color: #666;
}
.delete-btn{
    padding: 5px 20px;
    border-radius: 10px;
    border-color: white;
    cursor: pointer;
    background-color: #f44338;
    color: white;
}
.delete-btn:hover{
    background-color: royalblue;
}
.completed{
    text-decoration: line-through;
    color: #888;
}
```
Key CSS features
1. **Reset Styles** : Sets default margin, padding, and box-sizing for all elements.
2. **Container Styling** : Create a centered, white card with rounded corner and subtle shadow.
3. **Input Section** : uses flexbox to position the input field and **Add** button side by side
4. **Task Items** : Styles each task with background color, spacing, and felxbox layout.
5. **Button Styles** : Defines appearance for Add, Delete and Clear All buttons with hover effects.
6. **Status Indicators** : Styles for completed tasks (strikethrough) and status bar for tasks count.
7. **Responsive Design** : Uses relative units and max-width to ensure responsive behaviour. 

### JavaScript Functionality
The JavaScript code handles all the dynamic behavious of the Task Manager
#### DOM Elements
```javascript
//DOM elements
const taskInput = document.getElementById('task-input')
const addButton = document.getElementById('add-button')
const taskList = document.getElementById('task-list')
const noTasksMessage = document.getElementById('no-tasks')
const clearAllButton = document.getElementById('clear-all')
const tasksCountElement = document.getElementById('tasks-count')
const completedCountElement = document.getElementById('completed-count')

let tasks = [] //initial blank array with name tasks
```
This section selects all the necessary DOM elements that will be manipulated and initializes an empty tasks array.

#### Data Management
```javascript
//Load tasks items from localStorage when page loads
function loadTasks(){
    //getting the tasks from the localStorage
    const savedTasks = localStorage.getItem('tasks')

    //if tasks exist exist in local storage, parse them into tasks array
    if(savedTasks){
        tasks = JSON.parse(savedTasks)
        renderTasks();
    }
}

//save tasks to localStorage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
```
This functions handle persistent storage:
- `loadTasks()` : Retrieves tasks from localStorage when the page loads
- `saveTasks()` : Saves the current tasks to localStorage whenever changes are made

#### Task Operations
```javascript
//Add a new task
function addTask(){
    const taskText = taskInput.value.trim()

    //check if task is not empty
    if(taskText){
        //create a new task object
        const newTask = {
            id: Date.now(), //generates a unique is using timestamp
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString
        }
        //add task to Array
        tasks.push(newTask)
        console.log(tasks)
    }

    //Save to local storage
    saveTasks();

    //clearing the input to enter a new value
    taskInput.value = '';

    //updating the UI
    renderTasks();
}

//delete a task
function deleteTask(taskId){
    //filter out the task for given id
    tasks = tasks.filter(function(task){
        return task.id !== taskId
    })

    //save the updated tasks to localStorage
    saveTasks();

    //update UI
    renderTasks();
}

// toggle task completion
function toggleTaskCompletion(taskId){
    //find the task in an array
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id === taskId){
            //toggle the completed status
            tasks[i].completed = !tasks[i].completed
            break
        }
    }
    //save and updated tasks to local storage
    saveTasks()

    //update the UI
    renderTasks();
}

//clear all task
function clearAllTasks(){
    //confirmation
    if (tasks.length > 0){
        const confirmed = confirm("Are you sure you want to delete all tasks?")
        if(confirmed){
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }
}
```
These functions implement the core task operation:
- `addTask()` : create a new task object, then adds it to the array, and update the UI
- `deleteTask(taskId)` : removes a specific task by ID using array filtering
- `toggleTaskCompletion(taskID)` : toggles the completed status of a task
- `clearAllTasks()` : removes all tasks after confirmation 

#### UI Rendering
```javascript
//render tasks to the UI
function renderTasks(){
    //clear current list
    taskList.innerHTML = '';

    //show/hide the no tasks messages
    if(tasks.length === 0){
        noTasksMessage.style.display = 'block'
    } else{
        noTasksMessage.style.display = 'none'
    }

    //create task elements
    tasks.forEach(function(task){
        //create list items
        const li = document.createElement('li')
        li.className = 'task-item'
        

        //create checkbox
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.completed
        checkbox.addEventListener('change', function() {
            toggleTaskCompletion(task.id);
        })

        //create task text span
        const span = document.createElement('span')
        span.className = task.completed ? 'task-text completed' : 'task-text'
        span.textContent = task.text

        //create delete button
        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-btn'
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id)
        })

        //append child
        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(deleteButton)
        taskList.appendChild(li)
        
    })

    updateTaskCounts()
}

//update task counts
function updateTaskCounts(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(task){
        return task.completed
    }).length

    tasksCountElement.textContent = `Total ${totalTasks} tasks`
    completedCountElement.textContent = `Completed: ${completedTasks}`
}
```
These functions handles UI updates:
- `renderTasks()` : recreate the entire tasks list in the DOM based on the current data
- `updateTaskCounts()` : calculates and display the total and completed task counts

#### Event Handling
```javascript
//EventListeners
addButton.addEventListener('click', addTask)
taskInput.addEventListener('keypress', function(e){
    //add task when enter key is press
    if(e.key == 'Enter'){
        addTask()
    }
})
clearAllButton.addEventListener('click', clearAllTasks)

//initialize the app
loadTasks();
```
The final section sets up event listeners:
- Click handlers for the Add button
- Keypress handlers for Enter key in the input field
- Click handlers for the Clear All button
- intial call to `loadTask()` to load saved tasks when the page loads.

### Data Management
The application uses a simple but effective data structure
1. **Task Object Structure** :
    ```javascript
    //create a new task object
        const newTask = {
            id: Date.now(), //generates a unique is using timestamp
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString
        }
    ```
2. **Storage Method** :
    - the application uses localStorage for persistence storage.
    - the tasks are store as a JSON string and parse back into an array when needed.
    - This allows tasks to persist even when the browser is close and reopened.

### Event Flow
The typical flow of the operation is :
1. User adds a task -> `addTask()` -> `saveTasks()` -> `renderTasks()`
2. User toggle completed task -> `toggleTaskCompletion()` -> `saveTasks()` -> `renderTasks()`
3. User deletes a task -> `deleteTask()` -> `saveTasks()` -> `renderTasks()`
4. User clears all tasks -> `clearAllTasks()` -> `saveTasks()` -> `renderTasks()`

This patterns ensures:
1. The data model(tasks array) is updated first
2. Changes are persisted in localStorage
3. The UI is updated to reflect the current state
