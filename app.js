//Library Object
let library = [];

function Book(title,author,pages,genre,read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.genre = genre,
    this.read = false;
}

Book.prototype.sayAuthor = function() {
  console.log(`Hello, I'm ${this.author}!`);
};
  
Book.prototype.AddBookToLibrary = function(newBook){
  library.push(newBook);
}

Book.prototype.displayBooks = function(){
  library.forEach((e) => {
    console.log(e);
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//DOM
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById("modal-container");
const form = document.getElementById('form');

const bookContainer = document.getElementById('book-container');
const bookCont = document.getElementById('bookCont');

const bookTitleForm = document.getElementById('Title');
const bookAuthorForm = document.getElementById('Author');
const bookPagesForm = document.getElementById('Pages');
const bookGenreForm = document.getElementById('Genre');

open.addEventListener('click', () =>{
  modal.style.display = 'inline';
});

close.addEventListener('click', () =>{
  modal.style.display = 'none';
});

//Create and add a book to the array
form.addEventListener('submit', (e) =>{
  e.preventDefault();
  
  let book = new Book(bookTitleForm.value, bookAuthorForm.value, bookPagesForm.value, bookGenreForm.value);
  book.AddBookToLibrary(book);
  bookCounter();
  displayLibrary();
})

//Creates the book cards
const displayBook = (book,index) => {
  const bookBody = document.createElement('div');
  bookBody.classList.add('bookBody')

  bookBody.innerHTML = `
    <div class='book-body'>
        <h3 id='readText' class='readInfo'>Not finished</h3>
        <div class='book-info'>
            <p id='book-title'>Title: "${book.title}"</p>
            <p id='book-author'>Author: "${book.author}"</p>
            <p id='book-pages'>Number of Pages: "${book.pages}"</p>
            <p id='book-genre'>Genre: "${book.genre}"</p>
        </div>
    </div>
    <div class='btn-container'>
        <button id='read' class='modal-btn read'>Read</button>
        <button id='delete' class='modal-btn delete'>Delete</button>
    </div>
  `
  bookContainer.appendChild(bookBody);
  const deleteBook = bookBody.querySelector('.delete');
  const readBtn = bookBody.querySelector('.read');
  const bookInfo = bookBody.querySelector('.readInfo');

  deleteBook.addEventListener('click', ()=> deleteItem(index));
  readBtn.addEventListener('click',()=>isRead(bookInfo,index));
}

const deleteItem = (index) => {
  library.splice(index, 1);
  displayLibrary();
  bookCounter();
}

const displayLibrary = () =>{
  bookContainer.innerHTML = '';
  library.forEach((book,index) => {
    displayBook(book,index);
  })
}

const bookCounter = () =>{
  let cont = library.length;
  bookCont.innerHTML = cont;
}

const isRead = (bookInfo,index) =>{
  library[index].read = !library[index].read;

  if(library[index].read){
    bookInfo.innerHTML = 'Finished!'
  }
  else{
    bookInfo.innerHTML = 'Not finished'
  }
}


let book = new Book("TLOR", 'Tolkien', 266, 'Fiction');
book.AddBookToLibrary(book);
book = new Book('Meditaciones','Marco Aurelio',120,'Self Help');
book.AddBookToLibrary(book);
displayLibrary();
bookCounter();