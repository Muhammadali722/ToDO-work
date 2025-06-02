
let todos = JSON.parse(localStorage.getItem('todos')) || []

const input = document.getElementById('todoInput')
const imageInput = document.getElementById('imageInput')
const preview = document.getElementById('imagePreview')
const todoList = document.getElementById('todoList')

let selectedImage = null

imageInput.addEventListener('change', e => {
	const file = e.target.files[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = event => {
			selectedImage = event.target.result
			preview.src = selectedImage
			preview.classList.remove('hidden')
		}
		reader.readAsDataURL(file)
	}
})

function saveToLocalStorage() {
	localStorage.setItem('todos', JSON.stringify(todos))
}

function addTodo() {
	const text = input.value.trim()
	if (text === '') return

	const todo = {
		id: Date.now(),
		text: text,
		image: selectedImage,
		done: false,
	}

	todos.push(todo)
	saveToLocalStorage()
	renderTodos()

	input.value = ''
	imageInput.value = ''
	preview.classList.add('hidden')
	selectedImage = null
}

function deleteTodo(id) {
	todos = todos.filter(todo => todo.id !== id)
	saveToLocalStorage()
	renderTodos()
}

function toggleDone(id) {
	const todo = todos.find(t => t.id === id)
	if (todo) {
		todo.done = !todo.done
		saveToLocalStorage()
		renderTodos()
	}
}
function renderTodos() {
	todoList.innerHTML = ''
	todos.forEach((todo, i) => {
		const item = document.createElement('div')
		item.className = 'bg-gray-100 p-3 rounded-md space-y-2'

		const top = document.createElement('div')
		top.className = 'flex items-center justify-between'

		const left = document.createElement('div')
		left.className = 'flex items-center gap-2'

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.checked = todo.done
		checkbox.onclick = () => toggleDone(todo.id)
		checkbox.className = 'w-5 h-5'

		const label = document.createElement('span')
		label.innerHTML = `<strong>${i + 1}.</strong> ${todo.text}`
		if (todo.done) {
			label.classList.add('line-through', 'text-gray-400')
		}

		left.appendChild(checkbox)
		left.appendChild(label)

		const buttons = document.createElement('div')
		buttons.className = 'flex gap-2'

		const editBtn = document.createElement('button')
		editBtn.textContent = 'Edit'
		editBtn.className = todo.done
			? 'bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed'
			: 'bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
		editBtn.onclick = () => {
			if (!todo.done) {
				const newText = prompt('Enter new todo text:', todo.text)
				if (newText !== null && newText.trim() !== '') {
					todo.text = newText.trim()
					saveToLocalStorage()
					renderTodos()
				}
			}
		}

		const deleteBtn = document.createElement('button')
		deleteBtn.textContent = 'Delete'
		deleteBtn.className =
			'bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
		deleteBtn.onclick = () => deleteTodo(todo.id)

		buttons.appendChild(editBtn)
		buttons.appendChild(deleteBtn)

		top.appendChild(left)
		top.appendChild(buttons)
		item.appendChild(top)

		if (todo.image) {
			const img = document.createElement('img')
			img.src = todo.image
			img.className = 'w-full h-[300px] object-cover rounded'
			item.appendChild(img)
		}

		todoList.appendChild(item)
	})
}

renderTodos()