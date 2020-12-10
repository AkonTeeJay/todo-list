// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// FUNCTIONS

function addTodo(event) {
    // To Prevent from submitting
    event.preventDefault();

    //TODO DIV CREATION
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div')

    //TODO LI CREATION
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todo-li');
    todoDiv.appendChild(todoLi);

    //ADDING TODO TO LOCALSTORAGE
    saveToLocalStorage(todoInput.value)

    //TODO COMPLETE OR DONE BUTTON
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '&checkmark;';
    completeBtn.classList.add('done-btn');
    todoDiv.appendChild(completeBtn);

    //TODO DELETE BUTTON
    const dustbinBtn = document.createElement('button');
    dustbinBtn.classList.add('trash-btn');
    dustbinBtn.innerHTML = '&times;'
    todoDiv.appendChild(dustbinBtn);

    todoList.appendChild(todoDiv);
    // Clears input todo value
    todoInput.value = null
}

function deleteCheck(e) {
    const item = e.target;
    //check if its delete button
    if(item.classList.contains('trash-btn')) {
        const todo = item.parentElement //Get Parent Element
    
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove()
        });
    }
     //check if its checkmark
    if (item.classList.contains('done-btn')) {
        const todo = item.parentElement;  //Get parent Element div
        todo.classList.toggle('completed')
        
    }
}

function filterTodo(event) {
    const todos = [...todoList.children]
    todos.forEach(todo => {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none'
                break;
            case 'uncompleted':
                !todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none'
            break;
        }
    })
}


// SAVE TO LOCALSTORAGE

function saveToLocalStorage(todo) {
    // check if i have things in there
    let todos;
    
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    //check if i have things in there already
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    localStorage.setItem("todos", JSON.stringify(todos))

    todos.forEach(todo => {
        //TODO DIV CREATION
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div')
            //TODO LI CREATION
        const todoLi = document.createElement('li');
        todoLi.innerText = todo;
        todoLi.classList.add('todo-li');
        todoDiv.appendChild(todoLi);
    
        //TODO CHECK MARK BUTTON
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '&checkmark;';
        completeBtn.classList.add('done-btn');
        todoDiv.appendChild(completeBtn);
        //TODO DELETE BUTTON
        const dustbinBtn = document.createElement('button');
        dustbinBtn.classList.add('trash-btn');
        dustbinBtn.innerHTML = '&times;'
        todoDiv.appendChild(dustbinBtn);
    
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    // CHECK
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    }else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    const todoIndex = todo.children[0].innerText

    todos.splice(todos.indexOf(todoIndex), 1)

    localStorage.setItem('todos', JSON.stringify(todos))
}