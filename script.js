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
	console.log(`Index : ${bookIndex}`);
	books.splice(bookIndex, 1);
	updateBooksList(books);
};

const readBook = (bookID) => {
	const bookIndex = books.findIndex((book) => book.id === bookID);
	console.log(`Index : ${bookIndex}`);
	books[bookIndex].read = !books[bookIndex].read;
	books[bookIndex].classList.toggle('read');
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
		const buttons = document.createElement('div');
		const deleteBtn = document.createElement('button');
		const readBtn = document.createElement('button');

		buttons.classList.add('buttons');

		deleteBtn.textContent = 'X';
		deleteBtn.classList.add = 'delete-btn';

		readBtn.textContent = 'Read';
		readBtn.classList.add = 'read-btn';

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

		buttons.appendChild(deleteBtn);
		buttons.appendChild(readBtn);
		bookDiv.appendChild(bookMiddle);
		bookDiv.appendChild(buttons);

		titleDiv.textContent = book.title;
		authorDiv.textContent = `By: ${book.author}`;
		pagesDiv.textContent = `Pages: ${book.pages}`;
		readDiv.textContent = `Read: ${book.read}`;

		readBtn.addEventListener('click', () => {
			readBook(book.id);
		});

		booksList.appendChild(bookDiv);
	});
};
