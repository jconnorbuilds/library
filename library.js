function* generator() {
  let n = Library.get().length;
  while (n < 10000) {
    yield n;
    n++;
  }
}

const idGen = generator();

class Card {
  constructor() {}
}

class Book {
  constructor(title, author, year, pages, read, id) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  static create(title, author, year, pages, read) {
    return new Book(title, author, year, pages, read, idGen.next().value);
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const Library = (() => {
  const library = [
    new Book(
      (title = 'My First Book'),
      (author = 'Joe Connor'),
      (year = 2023),
      (pages = 150),
      (read = false),
      (id = 0)
    ),
    new Book(
      (title = 'My Second Book'),
      (author = 'Joe Connor'),
      (year = 2023),
      (pages = 200),
      (read = true),
      (id = 1)
    ),
  ];
  const get = () => library;
  const addBook = (book, createCard) => {
    library.push(book);
    createCard(book);
  };

  const deleteBook = (book) => {
    library.splice(library.indexOf(book), 1);
    for (let card of document.querySelectorAll('.books .card')) {
      if (+card.dataset.id === book.id) card.remove();
    }
  };
  return {
    get,
    addBook,
    deleteBook,
  };
})();

const UI = (() => {
  const addBookBtn = document.querySelector('#add-book');
  const booksDisplay = document.querySelector('.main-content .books');
  const sidebar = document.querySelector('.sidebar');
  const newBookForm = document.querySelector('#book-form');

  const wrapWithDiv = (...elements) => {
    let wrappingDiv = document.createElement('div');
    for (let i = 0; i < [...elements].length; i++) {
      wrappingDiv.appendChild([...elements][i]);
    }
    return wrappingDiv;
  };

  const createCard = (book) => {
    const { id, title, author, year, pages, read } = book;

    const card = document.createElement('div');
    const titleDisplay = document.createElement('h3');
    const authorDisplay = document.createElement('p');
    const yearDisplay = document.createElement('p');
    const pagesDisplay = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const readLabel = document.createElement('label');
    const readToggle = document.createElement('input');

    card.classList.add('card');
    card.dataset.id = id;
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => Library.deleteBook(book));
    titleDisplay.textContent = title;
    authorDisplay.textContent = 'Author: ' + author;
    yearDisplay.textContent = 'Pub. Year: ' + year;
    pagesDisplay.textContent = 'Pages: ' + pages;
    readLabel.setAttribute('for', 'read-toggle');
    readLabel.textContent = 'Have you read this book? ';
    readToggle.setAttribute('type', 'checkbox');
    readToggle.setAttribute('id', 'read-toggle');
    readToggle.classList.add('read-toggle');
    readToggle.dataset.id = id;
    readToggle.checked = read === true ? true : false;
    readToggle.addEventListener('click', () => book.toggleRead());

    card.appendChild(titleDisplay);
    card.appendChild(authorDisplay);
    card.appendChild(yearDisplay);
    card.appendChild(pagesDisplay);
    card.appendChild(wrapWithDiv(readLabel, readToggle));
    card.appendChild(deleteBtn);

    booksDisplay.appendChild(card);
  };

  const submitForm = (addToLibrary, form) => (e) => {
    e.preventDefault();
    const titleField = document.querySelector('form #title');
    const authorField = document.querySelector('form #author');
    const yearField = document.querySelector('form #year');
    const pagesField = document.querySelector('form #pages');
    const readField = document.querySelector('form #read');

    const newBook = Book.create(
      titleField.value,
      authorField.value,
      yearField.value,
      pagesField.value,
      readField.checked
    );
    addToLibrary(newBook, createCard);
    form.reset();

    return newBook;
  };
  newBookForm.addEventListener(
    'submit',
    submitForm(Library.addBook, newBookForm)
  );

  return {
    addBookBtn,
    booksDisplay,
    sidebar,
    newBookForm,
    createCard,
  };
})();

const Main = ((Library) => {
  const library = Library.get();
  const init = () => {
    library.forEach((book) => UI.createCard(book));
  };

  return {
    init,
  };
})(Library);

Main.init();
