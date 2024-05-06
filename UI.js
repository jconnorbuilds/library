'use strict';

const wrapWithDiv = (...elements) => {
  let wrappingDiv = document.createElement('div');
  elements.forEach((element) => wrappingDiv.appendChild(element));
  return wrappingDiv;
};

const createCard = (book, library) => {
  const booksDisplay = document.querySelector('.main-content .books-container');
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
  deleteBtn.classList.add('delete-book');
  titleDisplay.textContent = title;
  authorDisplay.textContent = `Author: ${author}`;
  yearDisplay.textContent = `Pub. Year: ${year}`;
  pagesDisplay.textContent = `Pages: ${pages}`;
  readLabel.setAttribute('for', 'read-toggle');
  readLabel.textContent = 'Have you read this book? ';
  readToggle.setAttribute('type', 'checkbox');
  readToggle.setAttribute('id', 'read-toggle');
  readToggle.classList.add('read-toggle');
  readToggle.dataset.id = id;
  readToggle.checked = read === true ? true : false;

  deleteBtn.addEventListener('click', () => library.deleteBook(book));
  readToggle.addEventListener('click', () => book.toggleRead());

  card.appendChild(titleDisplay);
  card.appendChild(authorDisplay);
  card.appendChild(yearDisplay);
  card.appendChild(pagesDisplay);
  card.appendChild(wrapWithDiv(readLabel, readToggle));
  card.appendChild(deleteBtn);

  booksDisplay.appendChild(card);
};

export { createCard };
