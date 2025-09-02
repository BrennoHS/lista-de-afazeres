const colors = [
    '#FDF2B3', '#D1EAED', '#FFDADA', '#FFD4A9'
];
const addNoteButton = document.querySelector('.addNoteButton');
const mainContent = document.querySelector('.main-content');
const notesArea = document.querySelector('.notes-area');

function updateEditableNotes() {
    const editableNotes = document.querySelectorAll('.note-card');
    editableNotes.forEach(note => {
        note.querySelectorAll('h3, p').forEach(element => {
            element.contentEditable = true;
            element.style.outline = 'none';
        });
    });
}

addNoteButton.addEventListener('click', () => {
    // Adicionar nova nota
    const note = document.createElement('div');
    note.classList.add('note-card');
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.backgroundColor = bgColor;
    
    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-note-button');
    removeButton.innerHTML = `<img src="icons/close_icon.svg" alt="Close Icon">`;
    
    // Create note content
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    const h3 = document.createElement('h3');
    h3.textContent = 'Nova Nota';
    h3.contentEditable = true;
    h3.style.outline = 'none';
    const p = document.createElement('p');
    p.textContent = 'Clique para editar...';
    p.contentEditable = true;
    p.style.outline = 'none';
    p.style.height = '280px';
    noteContent.appendChild(h3);
    noteContent.appendChild(p);
    
    // Append remove button and content to note
    note.appendChild(removeButton);
    note.appendChild(noteContent);
    notesArea.insertBefore(note, addNoteButton);
    note.scrollIntoView({ behavior: 'smooth' });
    
    // Adicionar ao menu lateral
    const menuList = document.querySelector('.listItems');
    const menuItem = document.createElement('li');
    let iconHtml = '';

    if (bgColor === '#FDF2B3') {
        iconHtml = '<img src="icons/yellow_rectangle.svg" alt="Yellow Note">';
    } else if (bgColor === '#D1EAED') {
        iconHtml = '<img src="icons/blue_rectangle.svg" alt="Blue Note">';
    } else if (bgColor === '#FFDADA') {
        iconHtml = '<img src="icons/pink_rectangle.svg" alt="Pink Note">';
    } else {
        iconHtml = '<img src="icons/orange_rectangle.svg" alt="Orange Note">';
    }

    menuItem.innerHTML = `<a href="#">${iconHtml} ${h3.textContent}</a>`;
    menuList.appendChild(menuItem);

    // Atualizar título no menu lateral ao editar o título da nota
    h3.addEventListener('input', (e) => {
        menuItem.innerHTML = `<a href="#">${iconHtml} ${e.target.textContent}</a>`;
    });

    // Remover nota e item do menu lateral
    removeButton.addEventListener('click', () => {
        note.remove();
        menuItem.remove();
    });

    updateEditableNotes();
});

updateEditableNotes();