import * as UI from './UI.js';

function* generator() {
  let n = 0;
  while (n < 10000) {
    yield n;
    n++;
  }
}

const idGen = generator();

class Book {
  constructor({
    title,
    author,
    year,
    pages,
    read = false,
    id = idGen.next().value,
  } = {}) {
    (this.title = title),
      (this.author = author),
      (this.year = year),
      (this.pages = pages),
      (this.read = read),
      (this.id = id);
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.library = [];
  }
  getBooks() {
    return this.library;
  }

  addBook(book) {
    this.library.push(book);
    UI.createCard(book, this);
  }

  deleteBook(book) {
    this.library.splice(this.library.indexOf(book), 1);
    for (let card of document.querySelectorAll('.books-container .card')) {
      if (+card.dataset.id === book.id) card.remove();
    }
  }
}

const main = () => {
  const library = new Library();
  const book1 = new Book({
    title: 'My First Book',
    author: 'Joe Connor',
    year: 2023,
    pages: 150,
  });

  const book2 = new Book({
    title: 'My Second Book',
    author: 'Joe Connor',
    year: 2023,
    pages: 200,
    read: true,
  });

  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const { title, author, year, pages, read } = form.elements;

    library.addBook(
      new Book({
        title: title.value,
        author: author.value,
        year: year.value,
        pages: pages.value,
        read: read.checked,
      }),
    );

    form.reset();
  };

  const newBookForm = document.querySelector('#book-form');
  newBookForm.addEventListener('submit', submitForm);

  [book1, book2].forEach((book) => library.addBook(book));
};

main();
