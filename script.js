document.getElementById('addNoteButton').addEventListener('click', addNote);

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        const notesList = document.getElementById('notesList');
        const listItem = document.createElement('li');
        listItem.textContent = noteText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            notesList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        notesList.appendChild(listItem);

        noteInput.value = '';
    }
}
