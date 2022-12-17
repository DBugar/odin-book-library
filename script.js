const addBookModal = document.querySelector('.addbook');
const addBookButton = document.querySelector('.add-book_button');
const addBookButtonContainer = document.querySelector('.add-book')
const bookForm = document.querySelector('.addbook_form')
const bookList = document.querySelector('.grid')
let deleteCard = document.querySelectorAll('.card_delete');
let readButton
let myLibrary = [];

addBookButton.addEventListener('click', function(){
    addBookModal.classList.add('open');
})

window.addEventListener('click', function(event){
    if(addBookModal.classList.contains('open')){
        if(event.target.classList.contains('overlay')){
            addBookModal.classList.remove('open');
        }
    }
})

bookForm.addEventListener('submit', function(event){
    event.preventDefault();
    let title = event.target.elements.title.value
    let author = event.target.elements.author.value
    let pages = event.target.elements.pages.value
    let read = event.target.elements.read.checked

    let newBook = new Book(author, title, pages, read)

    addBookToLibrary(newBook)

    addBookModal.classList.remove('open')
    event.target.elements.title.value = ''
    event.target.elements.author.value = ''
    event.target.elements.pages.value = ''
    event.target.elements.read.checked = false
})

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    let listedBooks = document.querySelectorAll('.card')
    listedBooks.forEach(function(book){
        book.parentElement.removeChild(book)
    })

    myLibrary.push(book)

    myLibrary.forEach(function(book){

        let bookCard = document.createElement('div')
        bookCard.classList.add('card')

        let deleteButton = document.createElement('button')
        deleteButton.classList.add('card_delete')
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
        class="bi bi-trash3" viewBox="0 0 16 16">
        <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
        </svg>`

        bookCard.appendChild(deleteButton)

        let cardContent = document.createElement('div')
        cardContent.classList.add('card_book-content')
        
        let bookTitle = document.createElement('p')
        bookTitle.classList.add('book_title')
        bookTitle.textContent = book.title
        
        let bookAuthor = document.createElement('p')
        bookAuthor.classList.add('book_author')
        bookAuthor.textContent = book.author
        
        let bookPages = document.createElement('p')
        bookPages.classList.add('book_pages')
        bookPages.textContent = `${book.pages} pages`
        
        let bookIsRead = document.createElement('span')
        bookIsRead.classList.add('book_read')
        if(book.read === false){
            bookIsRead.textContent = 'Not Read'
            bookIsRead.classList.add('false')
        } else {
            bookIsRead.textContent = 'Read'
            bookIsRead.classList.add('true')
        }

        cardContent.appendChild(bookTitle)
        cardContent.appendChild(bookAuthor)
        cardContent.appendChild(bookPages)
        
        bookCard.appendChild(cardContent)
        bookCard.appendChild(bookIsRead)
        

        bookList.insertBefore(bookCard, addBookButtonContainer)


        deleteButton.addEventListener('click', function(){
            bookList.removeChild(deleteButton.parentElement, deleteButton)
            let index = myLibrary.indexOf(book)
            myLibrary.splice(index, 1)
        })

        bookIsRead.addEventListener('click', function(){
            if(bookIsRead.classList.contains('true')){
                bookIsRead.classList.remove('true')
                bookIsRead.classList.add('false')
                bookIsRead.textContent = 'Not read'
            } else if(bookIsRead.classList.contains('false')){
                bookIsRead.classList.remove('false')
                bookIsRead.classList.add('true')
                bookIsRead.textContent = 'Read'
        }})
    })
}

function removeCards(){

    deleteCard.forEach(function(removeButton, i){
        removeButton.removeEventListener('click', function(){
            deleteCard = document.querySelectorAll('.card_delete')
            console.log(removeButton.parentElement)
            bookList.removeChild(removeButton.parentElement)
            myLibrary.splice(i, 1)})
        removeButton.addEventListener('click', function(){
            deleteCard = document.querySelectorAll('.card_delete')
            console.log(deleteCard)
            console.log(removeButton.parentElement)
            bookList.removeChild(removeButton.parentElement)
            myLibrary.splice(i, 1)

        })
    })
}



