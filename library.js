const myLibrary = [];
const addBookBtn = document.querySelector('#add-book');
const booksDisplay = document.querySelector('.main-content .books');
// const showSidebarBtn = document.querySelector('.show-sidebar');
const sidebar = document.querySelector('.sidebar');
const newBookForm = document.querySelector('#book-form');

function Book(title, author, year, pages, read, id) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function* generator() {
  let n = 0;
  while (n < 10000) {
    yield n;
    n++;
  }
}

const idGen = generator();

function deleteBook(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
  cards = document.querySelectorAll('.books .card');
  for (card of cards) {
    if (+card.dataset.id === book.id) card.remove();
  }
}

function createCard(book) {
  let card = document.createElement('div');
  let titleDisplay = document.createElement('h3');
  let authorDisplay = document.createElement('p');
  let yearDisplay = document.createElement('p');
  let pagesDisplay = document.createElement('p');
  let deleteBtn = document.createElement('button');

  card.classList.add('card');
  card.dataset.id = book.id;
  titleDisplay.textContent = book.title;
  authorDisplay.textContent = book.author;
  yearDisplay.textContent = book.year;
  pagesDisplay.textContent = book.pages;
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteBook(book));

  card.appendChild(titleDisplay);
  card.appendChild(authorDisplay);
  card.appendChild(yearDisplay);
  card.appendChild(pagesDisplay);
  card.appendChild(deleteBtn);
  booksDisplay.prepend(card);
}

function addBookToLibrary(title, author, year, pages, read) {
  let newBook = new Book(title, author, year, pages, read, idGen.next().value);
  myLibrary.push(newBook);
  createCard(newBook);
  console.log(`${newBook} added to library!`);
}

function submitForm(e) {
  e.preventDefault();
  console.log(e);
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
  console.log(newBook);
  return newBook;
}

// addBookBtn.addEventListener('click', function () {
//   sidebar.classList.toggle('isCollapsed');
// });

newBookForm.addEventListener('submit', (e) => submitForm(e));
