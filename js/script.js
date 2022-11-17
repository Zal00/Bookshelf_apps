

const textTitle = document.getElementById('inputBookTitle');
const textAuthor = document.getElementById('inputBookAuthor');
const textYear = document.getElementById('inputBookYear');
const isCompleate = document.getElementById('inputBookIsComplete');
const submitAction = document.getElementById('inputBook');


const isStorageExist = () => {
	if (typeof Storage === undefined) {
		alert('Browser tidak mendukung web storage');
		return false;
	}

	return true;
};

function findTodo(todoId) {
    for (bookData of booksList) {
        if (bookData.id === todoId) {
            return bookData;
        }
    }
    return null;
}

function findTodoIndex(todoId) {
    for (index in booksList) {
        if (booksList[index].id === todoId) {
            return  index;
        }
    }
    return -1;
}


submitAction.addEventListener('submit', function(event){
    let booksData = JSON.parse(localStorage.getItem('booksData'));

    if(booksData === null){
        booksList = [];
    }else{
        booksList = booksData;
    }
    
    const todoObject = {
        id: +new Date(),
        title: textTitle.value,
        author: textAuthor.value,
        year: textYear.value,
        isCompleted: isCompleate.checked
    }

    booksList.push(todoObject); 
    alert(`Buku ${todoObject.title} berhasil ditambahkan!`)
    localStorage.setItem('booksData', JSON.stringify(booksList))
    
})


function showData() {
    let inCompleate = document.getElementById('incompleteBookshelfList')
    let compleate = document.getElementById('completeBookshelfList')

    let output_compleate = ''
    let output_inCompleate = ''

    if(getData() === null){
        booksList = [];
    }else{
        booksList = getData();
    }

    booksList.forEach((bookData) => {
        if (bookData.isCompleted == false) {
            output_inCompleate += `
            <article class="book_item">
                <h3>${bookData.title}</h3>
                <p>Penulis: ${bookData.author}</p>
                <p>Tahun: ${bookData.year}</p>
                <div class="action">
                    <button class="green" onclick="readedBook(${bookData.id})">Selesai dibaca</button>
                    <button class="yellow" id="edit" onclick="editBook(${bookData.id})">Edit Buku</button>
                    <button class="red" onclick="deleteBook(${bookData.id})">Hapus buku</button>
                </div>
            </article>
            `
        } else {
            output_compleate += `
            <article class="book_item">
            <h3>${bookData.title}</h3>
            <p>Penulis: ${bookData.author}</p>
            <p>Tahun: ${bookData.year}</p>
            <div class="action">
                <button class="green" onclick="unreadedBook(${bookData.id})">Belum Selesai dibaca</button>
                <button class="yellow" onclick="editBook(${bookData.id})">Edit Buku</button>
                <button class="red" onclick="deleteBook(${bookData.id})">Hapus buku</button>
            </div>
            </article>
            `
        }
    });
    compleate.innerHTML = output_compleate;
    inCompleate.innerHTML = output_inCompleate;
}

showData();

function getData() {
    return JSON.parse(localStorage.getItem('booksData'));
} 

function deleteBook(todoId){
    getData();
    const todoTarget = findTodoIndex(todoId);
    const todoTarget1 = findTodo(todoId);
    const confirmation = confirm(`Apakah anda yakin mau menghapus buku ${todoTarget1.title} ?`);
    if (confirmation == true) {
        booksList.splice(todoTarget, 1)
        localStorage.setItem('booksData', JSON.stringify(booksList))
        showData();
    }else {
        return 0;
    }
}

function readedBook (todoId) {
    
    const todoTarget = findTodo(todoId);
    const confirmation = confirm(`Apakah buku ${todoTarget.title} sudah selesai dibaca?`);
    if (confirmation == true) {
        if (todoTarget == null){
            return;
        }  
        todoTarget.isCompleted = true
        localStorage.setItem('booksData', JSON.stringify(booksList))
        showData();
    } else {
        return 0;
    }
    
}

function unreadedBook (todoId) {
   
    const todoTarget = findTodo(todoId);
    const confirmation = confirm(`Apakah buku ${todoTarget.title} belum selesai dibaca?`);
    if (confirmation == true) {
        if (todoTarget == null){
            return;
        } else {
            todoTarget.isCompleted = false
            localStorage.setItem('booksData', JSON.stringify(booksList))
            showData();
        }
        
    } else {
        return 0;
    }
    
}


    
