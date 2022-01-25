let todoInput // Miejsce,gdzie użytkownik wpisuje treść zadania
let errorInfo // Info o braklu zadań / konieczności wpisania tekstu 
let addBtn // przycisk ADD - dodaje nowe elementy do listy
let ulList // Lista zadań, tagi UL
let newTodo // nowo dodane LI, nowe zadanie

let popup // popup
let popupInfo // tekst w popupie jak sie doda pusty tekst
let todoToEdit // edytowany TODO
let popupInput // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie




const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    // pobieranie wszystkich elementów
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector(".popup")
    popupInfo = document.querySelector(".popup-info")
    popupInput = document.querySelector(".popup-input")
    popupAddBtn = document.querySelector(".accept")
    popupCloseBtn = document.querySelector(".cancel")
}

const prepareDOMEvents = () => {
    // nadajemy nasłuchiwanie
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}


/*
1. Tworzy nowy element (li)
2. dodaje nowy element do ul listy
3. funkcja odpalana na click w przycisk ADD
4. przechwytuje treść z inputa i umieszcza go w nowo stworzonym li
5. funkcja nie doda do listy pustego "todosa"
*/
const addNewTodo = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createToolsArea()
        ulList.append(newTodo)

        todoInput.value = ''
        errorInfo.textContent = ''
    } else {
        errorInfo.textContent = 'Wpisz treść zadania!'
    }
}


/* 
1. stworzyć diva z klasa tools
2. dodac mu klase tools
3. stworzyc 3 przyciski
4. umiescic w nich tresc, klasy
*/
const createToolsArea = () => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const checkBtn = document.createElement('button')
    checkBtn.classList.add('complete')
    checkBtn.innerHTML = '<i class = "fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.innerHTML = '<i class = "fas fa-times"></i>'

    toolsPanel.append(checkBtn, editBtn, delBtn)
}


const checkClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editTodo(e);
    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}

const editTodo = e => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    popup.classList.toggle('popupOpen')
}

const closePopup = () => {
    popup.classList.toggle('popupOpen')
    popupInfo.textContent = ''
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.classList.remove('popupOpen')
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść!'
    }
}


const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodos = ulList.querySelectorAll('li')

    if (allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście.'
    }
}

const enterKeyCheck = e => {
    if (e.key === 'Enter') {
        addNewTodo()
    }
}

document.addEventListener('DOMContentLoaded', main)