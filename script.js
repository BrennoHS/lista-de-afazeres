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
    // Adicionar nova nota
    const note = document.createElement('div');
    note.classList.add('note-card');
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.backgroundColor = bgColor;
    const h3 = document.createElement('h3');
    h3.textContent = 'Nova Nota';
    h3.contentEditable = true;
    h3.style.outline = 'none';
    const p = document.createElement('p');
    p.textContent = 'Clique para editar...';
    p.contentEditable = true;
    p.style.outline = 'none';
    p.style.height = '280px';
    note.appendChild(h3);
    note.appendChild(p);
    document.querySelector('.notes-area').insertBefore(note, document.querySelector('.addNoteButton'));
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
});

