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
    listItem.textContent = noteText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        notesList.removeChild(listItem);
        removeNoteFromStorage(noteText);
    });

    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
}

function removeNoteFromStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteIndex = notes.indexOf(noteText);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}
