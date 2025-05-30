let todos = JSON.parse(localStorage.getItem('todos')) || []

let todoList = document.getElementById('todoList')
let input = document.getElementById('todoInput')

function saveToLocalStorage() {
	localStorage.setItem('todos', JSON.stringify(todos))
}

function addTodo() {
	let text = input.value.trim()
	if (text === '') return

	let todo = {
		id: Date.now(),
		text: text,
		done: false,
	}

	todos.push(todo)
	input.value = ''
	saveToLocalStorage()
	renderTodos()
}

function toggleDone(id) {
	let todo = todos.find(t => t.id === id)
	if (todo) {
		todo.done = !todo.done
		saveToLocalStorage()
		renderTodos()
	}
}

function editTodo(id) {
	let todo = todos.find(t => t.id === id)
	if (todo && !todo.done) {
		let newText = prompt('Edit todo:', todo.text)
		if (newText !== null) {
			todo.text = newText.trim()
			saveToLocalStorage()
			renderTodos()
		}
	}
}

function deleteTodo(id) {
	todos = todos.filter(t => t.id !== id)
	saveToLocalStorage()
	renderTodos()
}

function renderTodos() {
	todoList.innerHTML = ''
	todos.forEach((todo, index) => {
		let todoItem = document.createElement('div')
		todoItem.className ='flex items-center justify-between bg-gray-100 p-3 rounded-md'

		let left = document.createElement('div')
		left.className = ' gap-5 flex items-center'
		let checkbox = document.createElement('input')
		checkbox.type = 'Radio'
		checkbox.checked = todo.done
		checkbox.onclick = () => toggleDone(todo.id)
		checkbox.className = 'w-5 h-5'

		let label = document.createElement('span')
		label.innerHTML = `<strong>${index + 1}.</strong> ${todo.text}`
		if (todo.done) label.classList.add('line-through', 'text-gray-400')

		left.appendChild(checkbox)
		left.appendChild(label)

		let right = document.createElement('div')
		right.className = 'flex gap-2'

		let editBtn = document.createElement('button')
		editBtn.textContent = 'Edit'
		editBtn.className = `px-4 py-1 rounded-md text-white ${
			todo.done
				? 'bg-gray-400 cursor-not-allowed'
				: 'bg-green-600 hover:bg-green-700'
		}`
		editBtn.onclick = () => {
			if (!todo.done) editTodo(todo.id)
		}

		let deleteBtn = document.createElement('button')
		deleteBtn.textContent = 'Delete'
		deleteBtn.className ='px-4 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white'
		deleteBtn.onclick = () => deleteTodo(todo.id)

		right.appendChild(editBtn)
		right.appendChild(deleteBtn)

		todoItem.appendChild(left)
		todoItem.appendChild(right)
		todoList.appendChild(todoItem)
	})
}
renderTodos()