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
	if (
		bookTitleInput.value.length !== 0 &&
		authorInput.value.length !== 0 &&
		parseInt(pagesInput.value) >= 0
	) {
		const title = bookTitleInput.value;
		const author = authorInput.value;
		const pages = pagesInput.value;
		const read = readInput.checked;
		const newBook = new Book(title, author, pages, read);
		books.push(newBook);
		updateBooksList(books);
	}
});

const deleteBook = (bookID) => {
	const bookIndex = books.findIndex((book) => book.id === bookID);
	console.log(`Index : ${bookIndex}`);
	books.splice(bookIndex, 1);
	updateBooksList(books);
};

const readBook = (bookID) => {
	const bookIndex = books.findIndex((book) => book.id === bookID);
	console.log(`Before firing:`);
	console.log(books[bookIndex]);
	books[bookIndex].read = !books[bookIndex].read;
	console.log(`After firing:`);
	console.log(books[bookIndex]);
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
		const buttons = document.createElement('div');
		const deleteBtn = document.createElement('button');
		const readBtn = document.createElement('button');

		const childrenArray = [titleDiv, authorDiv, pagesDiv, readDiv];

		bookDiv.classList.add('book');
		bookMiddle.classList.add('book-middle');
		titleDiv.classList.add('book-title');
		authorDiv.classList.add('book-author');
		pagesDiv.classList.add('book-pages');
		readDiv.classList.add('book-read');
		buttons.classList.add('buttons');
		deleteBtn.classList.add = 'delete-btn';
		readBtn.classList.add = 'read-btn';
		book.read ? bookDiv.classList.add('read') : null;

		titleDiv.textContent = book.title;
		authorDiv.textContent = `By: ${book.author}`;
		pagesDiv.textContent = `Pages: ${book.pages}`;
		readDiv.textContent = `Read: ${book.read ? `Yes` : `No`}`;
		deleteBtn.textContent = 'X';
		readBtn.textContent = 'Read';

		childrenArray.forEach((child) => {
			bookMiddle.appendChild(child);
		});
		buttons.appendChild(deleteBtn);
		buttons.appendChild(readBtn);
		bookDiv.appendChild(bookMiddle);
		bookDiv.appendChild(buttons);

		deleteBtn.addEventListener('click', () => {
			deleteBook(book.id);
		});

		readBtn.addEventListener('click', () => {
			bookDiv.classList.toggle('read');
			readBook(book.id);
			readDiv.textContent = `Read: ${book.read ? `Yes` : `No`}`;
		});

		booksList.appendChild(bookDiv);
	});
};
