const myLibrary = [
  {
    id: 0,
    title: 'My First Book',
    author: 'Joe Connor',
    year: 2023,
    pages: 150,
    read: false,
  },
  {
    id: 1,
    title: 'My Second Book',
    author: 'Joe Connor',
    year: 2023,
    pages: 200,
    read: true,
  },
];

const addBookBtn = document.querySelector('#add-book');
const booksDisplay = document.querySelector('.main-content .books');
const sidebar = document.querySelector('.sidebar');
const newBookForm = document.querySelector('#book-form');
let readToggles;

class Book {
  constructor(title, author, year, pages, read, id) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

function* generator() {
  let n = myLibrary.length;
  while (n < 10000) {
    yield n;
    n++;
  }
}

const idGen = generator();
myLibrary.forEach((book) => createCard(book));

function deleteBook(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
  cards = document.querySelectorAll('.books .card');
  for (card of cards) {
    if (+card.dataset.id === book.id) card.remove();
  }
}

function toggleRead(e) {
  let id = e.target.dataset.id;
  let isChecked = e.target.checked;
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    if (book.id === +id) {
      book.read = isChecked === true ? true : false;
    }
  }
}

function createCard(book) {
  let card = document.createElement('div');
  let titleDisplay = document.createElement('h3');
  let authorDisplay = document.createElement('p');
  let yearDisplay = document.createElement('p');
  let pagesDisplay = document.createElement('p');
  let deleteBtn = document.createElement('button');
  let readLabel = document.createElement('label');
  let readToggle = document.createElement('input');

  function wrapWithDiv() {
    let wrappingP = document.createElement('div');
    for (let i = 0; i < arguments.length; i++) {
      wrappingP.appendChild(arguments[i]);
    }
    return wrappingP;
  }

  card.classList.add('card');
  card.dataset.id = book.id;
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteBook(book));
  titleDisplay.textContent = book.title;
  authorDisplay.textContent = 'Author: ' + book.author;
  yearDisplay.textContent = 'Pub. Year: ' + book.year;
  pagesDisplay.textContent = 'Pages: ' + book.pages;
  readLabel.setAttribute('for', 'read-toggle');
  readLabel.textContent = 'Have you read this book? ';
  readToggle.setAttribute('type', 'checkbox');
  readToggle.setAttribute('id', 'read-toggle');
  readToggle.classList.add('read-toggle');
  readToggle.dataset.id = book.id;
  readToggle.checked = book.read === true ? true : false;
  readToggle.addEventListener('click', (e) => toggleRead(e));

  card.appendChild(titleDisplay);
  card.appendChild(authorDisplay);
  card.appendChild(yearDisplay);
  card.appendChild(pagesDisplay);
  card.appendChild(wrapWithDiv(readLabel, readToggle));
  card.appendChild(deleteBtn);

  booksDisplay.appendChild(card);
}

function addBookToLibrary(title, author, year, pages, read) {
  let newBook = new Book(title, author, year, pages, read, idGen.next().value);
  myLibrary.push(newBook);
  createCard(newBook);
  return newBook;
}

function submitForm(e) {
  e.preventDefault();
  let titleField = document.querySelector('form #title');
  let authorField = document.querySelector('form #author');
  let yearField = document.querySelector('form #year');
  let pagesField = document.querySelector('form #pages');
  let readField = document.querySelector('form #read');

  let newBook = addBookToLibrary(
    titleField.value,
    authorField.value,
    yearField.value,
    pagesField.value,
    readField.checked
  );
  newBookForm.reset();
  return newBook;
}
newBookForm.addEventListener('submit', (e) => submitForm(e));
