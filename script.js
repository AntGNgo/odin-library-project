const bookTitleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const newBookBtn = document.getElementById('add-book');
const booksList = document.getElementById('books');

const books = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = Math.random();

	this.readBook = function () {
		this.read = !this.read;
	};
}

function addBookToLibrary() {}

newBookBtn.addEventListener('click', (e) => {
	e.preventDefault();
	console.log('running');
	if (
		bookTitleInput.value.length !== 0 &&
		authorInput.value.length !== 0 &&
		parseInt(pagesInput.value) >= 0
	) {
		const title = bookTitleInput.value;
		const author = authorInput.value;
		const pages = pagesInput.value;
		const read = readInput.checked ? 'Yes' : 'No';
		const newBook = new Book(title, author, pages, read);
		books.push(newBook);
		updateBooksList(books);
	}
});

const deleteBook = (bookID) => {
	const bookIndex = books.findIndex((book) => book.id === bookID);
	books.splice(bookIndex, 1);
	updateBooksList(books);
};

const updateBooksList = (list) => {
	booksList.textContent = '';
	list.forEach((book) => {
		const bookDiv = document.createElement('div');
		const bookMiddle = document.createElement('div');
		const titleDiv = document.createElement('div');
		const authorDiv = document.createElement('div');
		const pagesDiv = document.createElement('div');
		const readDiv = document.createElement('div');
		const deleteBtn = document.createElement('button');

		deleteBtn.textContent = 'X';
		deleteBtn.classList.add = 'delete-btn';

		deleteBtn.addEventListener('click', () => {
			deleteBook(book.id);
		});

		const childrenArray = [titleDiv, authorDiv, pagesDiv, readDiv];

		bookDiv.classList.add('book');
		bookMiddle.classList.add('book-middle');
		titleDiv.classList.add('book-title');
		authorDiv.classList.add('book-author');
		pagesDiv.classList.add('book-pages');
		readDiv.classList.add('book-read');

		childrenArray.forEach((child) => {
			bookMiddle.appendChild(child);
		});

		bookDiv.appendChild(deleteBtn);
		bookDiv.appendChild(bookMiddle);

		titleDiv.textContent = book.title;
		authorDiv.textContent = `By: ${book.author}`;
		pagesDiv.textContent = `Pages: ${book.pages}`;
		readDiv.textContent = `Read: ${book.read}`;

		bookDiv.addEventListener('click', () => {
			bookDiv.classList.toggle('read');
		});

		booksList.appendChild(bookDiv);
	});
};
