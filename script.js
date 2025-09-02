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

function createNote(title = 'Nova Nota', content = 'Clique para editar...', isExample = false) {
    // Adicionar nova nota
    const note = document.createElement('div');
    note.classList.add('note-card');
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.backgroundColor = bgColor;
    
    // Criar botão de remover nota
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-note-button');
    removeButton.innerHTML = `<img src="icons/close_icon.svg" alt="Close Icon">`;
    
    // Criar conteúdo da nota
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.contentEditable = true;
    h3.style.outline = 'none';
    const p = document.createElement('p');
    p.textContent = content;
    p.contentEditable = true;
    p.style.outline = 'none';
    p.style.height = '280px';
    noteContent.appendChild(h3);
    noteContent.appendChild(p);
    
    // Append para remover nota e conteúdo da nota
    note.appendChild(removeButton);
    note.appendChild(noteContent);
    notesArea.insertBefore(note, addNoteButton);
    
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

    // Atualizar título no menu lateral ao editar o título da nota e limitar a 29 caracteres
    h3.addEventListener('input', (e) => {
        let text = e.target.textContent;
    if (text.length > 29) {
        text = text.substring(0, 29);
        e.target.textContent = text;
        showLimitWarning(); // Chamada para mostrar o pop-up

        // Opcional: para reposicionar o cursor no final do texto truncado
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(e.target);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    menuItem.innerHTML = `<a href="#">${iconHtml} ${text}</a>`;
});

    // Remover nota e item do menu lateral
    removeButton.addEventListener('click', () => {
        note.remove();
        menuItem.remove();
    });

    updateEditableNotes();
    
    // Scroll suave apenas para notas criadas pelo botão, não para a nota de exemplo
    if (!isExample) {
        note.scrollIntoView({ behavior: 'smooth' });
    }
}

// Criar nota de exemplo na inicialização
createNote('Nota de Exemplo', 'Este é um exemplo de nota. Clique para editar...', true);

// Adicionar nova nota pelo botão
addNoteButton.addEventListener('click', () => {
    createNote();
});

function showLimitWarning() {
    const warningPopup = document.createElement('div');
    warningPopup.classList.add('limit-warning-popup');
    warningPopup.textContent = 'O título é limitado a 30 caracteres.';
    document.body.appendChild(warningPopup);

    // Remover o pop-up após 2 segundos
    setTimeout(() => {
        warningPopup.remove();
    }, 2000);
}

updateEditableNotes();