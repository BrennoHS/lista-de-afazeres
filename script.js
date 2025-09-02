const colors = [
      '#FDF2B3', '#D1EAED', '#FFDADA', '#FFD4A9'
    ];
const addNoteButton = document.querySelector('.addNoteButton');
const mainContent = document.querySelector('.main-content');
const notesArea = document.querySelector('.notes-area');

editableNotes = document.querySelectorAll('.note-card');
editableNotes.forEach(note => {
    note.contentEditable = true;
});

addNoteButton.addEventListener('click', () => {
    const note = document.createElement('div');
    note.classList.add('note-card');
    note.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    note.contentEditable = true;
    note.innerHTML = '<h3>Nova Nota</h3><p>Clique para editar...</p>';
    document.querySelector('.notes-area').insertBefore(note, document.querySelector('.addNoteButton'));
}
);

