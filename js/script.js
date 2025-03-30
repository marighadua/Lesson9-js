'use strikt'


let divAP = document.getElementById('server-div');
let btnMore = document.getElementById('load-more');
let btnPrev = document.getElementById('load-prev');
let usersList = document.querySelector ('.userstList');
let currentPage =1;
  

function getUsers (pages) {
     
fetch('https://reqres.in/api/users?page=' + pages, {
    method: 'Get',
})
 
.then ( function(responseObj) {
    console.log(responseObj);
    if(!responseObj.ok) {
        throw responseObj.status;
    }
    return responseObj.json();
    
})
 
.then ( function(x) {
    console.log(x);
    const fragment = document.createDocumentFragment();
    x.data.forEach(element => {
        let li = document.createElement ('li');

        let title = document.createElement('h2');
        title.textContent = element.first_name + ' ' + element.last_name;
        let img = document.createElement('img');
        img.src = element.avatar;
        li.appendChild(img);
        li.appendChild(title);

        fragment.appendChild(li);
        
    });

    usersList.innerHTML = ' ';
    usersList.appendChild(fragment);
    totalPages = x.total_pages;

})
.catch(function(error) {
    if(error === 404 ) {
        let pError = document.createElement('p');
        pError.innerText =' server error' ;
        divAP.appendChild(pError);
    } else{
        let pError2 = Document.createElement ('p');
        pError2.innerText ='page not found';
        divAP.appendChild(pError2);
    }
})

} 
 btnPrev.addEventListener('click' ,  function() {
    if (currentPage === 1 ) {
        return; 
    }

    currentPage -= 1;
    getUsers(currentPage);
 })


 getUsers(currentPage);
 btnMore.addEventListener('click', function() {
    if(currentPage === totalPages) {
        return;
    }


    currentPage += 1 ;
    getUsers(currentPage);
})