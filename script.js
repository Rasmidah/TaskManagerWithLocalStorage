//step 1: DOM elements
const taskInput = document.getElementById('task-input')
const addButton = document.getElementById('add-button')
const taskList = document.getElementById('task-list')
const noTasksMessage = document.getElementById('no-tasks')
const clearAllButton = document.getElementById('clear-all')
const tasksCountElement = document.getElementById('tasks-count')
const completedCountElement = document.getElementById('completed-count')

//step 2: task database using array
let tasks = []

//step 3: add a new task   
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


//step 5: Saving it into a local storage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//step 6: load data from the local storage
function loadTasks(){
    //getting the tasks from the localStorage
    const savedTasks = localStorage.getItem('tasks')

    //if tasks exist exist in local storage, parse them into tasks array
    if(savedTasks){
        tasks = JSON.parse(savedTasks)
        renderTasks();
    }
}

//step 10: finding the task in the array to mark for completion and apply completed class
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

//step 11
function updateTaskCounts(){
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(task){
        return task.completed
    }).length

    tasksCountElement.textContent = `Total ${totalTasks} tasks`
    completedCountElement.textContent = `Completed: ${completedTasks}`
}

//step 7: render tasks in user interfaces
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

//step 8: delete task
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

//step 9: clearing all tasks
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


// step 4: EventListeners
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