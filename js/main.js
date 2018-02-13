let notes = window.localStorage.getItem('notes') || '{"data" : []}';
notes = JSON.parse(notes);

// Atualizacao notes //

let updateList = function() {
	console.log('[App] Start watch');

	Array.observe(notes.data, function(changes) {
		let index = null;
		let value = '';
		let status = null;

		if (changes[0].type === 'splice') {
			index = changes[0].index;
			value = changes[0].object[index];
			status = (changes[0].addedCount > 0) ? 'created' : 'removed';
		}

		if (changes[0].type === 'update') {
			index = changes[0].name;
			value = changes[0].object[index];
			status = 'updated';
		}

		if (!value && status === 'created' && status === 'updated') {
			return;
		}

		let notesTag = document.getElementById('notes');

		if (status === 'updated') {
			console.log('implementar');
		}

		if (status === 'removed') {
			let listNotes = document.querySelectorAll('#notes li');
			notesTag.removeChild(listNotes[index]);
		}

		if (status === 'created') {
			let newNote = document.createElement('li');
			newNote.innerHTML = value;
			notesTag.appendChild(newNote);
		}

		window.localStorage.setItem('notes', JSON.stringify(notes));
	});
}

let createNote = function() {
	let input = document.querySelector('#form-add-note input');
	let value = input.value;

	notes.data.push(value);

	input.value = '';
}

// Start app //

updateList();

document.addEventListener('DOMContentLoaded', function() {
	let listNotes = document.getElementById('notes');
	let listHtml = '';

	for (let i=0; i < notes.data.length; i++) {
		listHtml += '<li>' + notes.data[i] + '</li>';
	}

	listNotes.innerHTML = listHtml;

	let formAddNotes = document.getElementById('form-add-note');
	formAddNotes.addEventListener('submit', function(e) {
		e.preventDefault();
		createNote();
	});
});

// Remover nota //

document.addEventListener('click', function(e) {
	let notesTag = document.getElementById('notes');

	if (e.target.parentElement === notesTag) {
		if (confirm('Remover esta nota?')) {
			let listNotes = document.querySelectorAll('#notes li');
			listNotes.forEach(function(item, index) {
				if (e.target === item) {
					notes.data.splice(index, 1);
				}
			});
		}
	}
});