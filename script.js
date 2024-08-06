document.addEventListener('DOMContentLoaded', loadNotes);
document.getElementById('addNoteButton').addEventListener('click', addNote);

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToDOM(note);
    });
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));

        addNoteToDOM(noteText);
        noteInput.value = '';
    }
}

function addNoteToDOM(noteText) {
    const notesList = document.getElementById('notesList');
    const listItem = document.createElement('li');

    const noteSpan = document.createElement('span');
    noteSpan.textContent = noteText;

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
    const noteIndex = notes.indexOf(oldNoteText);
    if (noteIndex > -1) {
        notes[noteIndex] = newNoteText;
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function removeNoteFromStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteIndex = notes.indexOf(noteText);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
