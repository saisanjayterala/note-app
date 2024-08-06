document.addEventListener('DOMContentLoaded', loadNotes);
document.getElementById('addNoteButton').addEventListener('click', addNote);
document.getElementById('searchInput').addEventListener('input', searchNotes);

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToDOM(note.text, note.category, note.priority);
    });
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
    const noteCategory = document.getElementById('noteCategory').value;
    const notePriority = document.getElementById('notePriority').value;

    if (noteText !== "") {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const note = { text: noteText, category: noteCategory, priority: notePriority };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        addNoteToDOM(noteText, noteCategory, notePriority);
        noteInput.value = '';
    }
}

function addNoteToDOM(noteText, noteCategory, notePriority) {
    const notesList = document.getElementById('notesList');
    const listItem = document.createElement('li');

    const noteSpan = document.createElement('span');
    noteSpan.textContent = noteText;

    const categorySpan = document.createElement('span');
    categorySpan.textContent = `[${noteCategory}]`;
    categorySpan.className = 'note-category';

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = `[${notePriority}]`;
    prioritySpan.className = 'note-priority';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    editButton.addEventListener('click', function() {
        editNoteInDOM(noteSpan, noteText);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        notesList.removeChild(listItem);
        removeNoteFromStorage(noteText);
    });

    listItem.appendChild(categorySpan);
    listItem.appendChild(prioritySpan);
    listItem.appendChild(noteSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
}

function editNoteInDOM(noteSpan, oldNoteText) {
    const newNoteText = prompt('Edit your note:', oldNoteText);
    if (newNoteText !== null && newNoteText.trim() !== "") {
        noteSpan.textContent = newNoteText;
        updateNoteInStorage(oldNoteText, newNoteText);
    }
}

function updateNoteInStorage(oldNoteText, newNoteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteIndex = notes.findIndex(note => note.text === oldNoteText);
    if (noteIndex > -1) {
        notes[noteIndex].text = newNoteText;
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function removeNoteFromStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteIndex = notes.findIndex(note => note.text === noteText);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function searchNotes() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchText));

    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    filteredNotes.forEach(note => {
        addNoteToDOM(note.text, note.category, note.priority);
    });
}
