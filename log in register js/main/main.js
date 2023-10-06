const h1 = document.querySelector('h1')
const logOutBtn = document.querySelector('#logoutbtn')
const loginBtn = document.querySelector('#loginbtn')

const currentUser = localStorage.getItem('currentUser')

if(currentUser){
    h1.innerHTML += currentUser
    logOutBtn.style.display = 'inline'
    loginBtn.style.display = 'none'
}

logOutBtn.addEventListener('click', () =>{
    logOutBtn.style.display = 'none'
    loginBtn.style.display = 'inline'
    h1.innerHTML = 'User: '
    localStorage.setItem('currentUser', undefined) 
})

