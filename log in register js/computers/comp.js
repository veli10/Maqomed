const tbody = document.querySelector('tbody');
const currentUser = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users'));
const addBtn = document.querySelector('#addBtn')
const table = document.querySelector('table')

let MyComp = users.find((user) => user.name === currentUser).computers;
let change = false
let id 

function uptadeTable(){
    tbody.innerHTML = ''

    for(let computer of MyComp) {
        tbody.innerHTML += `<tr>
                               <td>${computer.id}</td>
                               <td>${computer.mark}</td>
                               <td>
                                   <img src=${computer.img} alt="">
                               </td>
                               <td>
                                   <button id='${computer.id}d' class="btn btn-danger">Delete</button>
                                   <button id='${computer.id}c' data-bs-target="#exampleModal" data-bs-toggle="modal" class="btn btn-primary">Change</button>
                               </td>
                            </tr>`
    }
}

uptadeTable()

const allInputs = document.querySelectorAll('input') 

function addComputer(){
    if(!change){
        const newComputer = {
            id : MyComp.length === 0 ? 1 + currentUser : parseInt(MyComp.at(-1).id) + 1 + currentUser,
            mark: allInputs[0].value,
            ram: allInputs[1].value,
            gpu: allInputs[2].value,
            img: allInputs[3].value,
            cpu: allInputs[4].value,
            rom: allInputs[5].value,
            os: allInputs[6].value,
            new: allInputs[7].value
        }

        MyComp.push(newComputer)
        for(let input of allInputs){
            input.value = ''
        }
        for(let user of users){
            if(user.name == currentUser){
                user.computers = MyComp
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        uptadeTable()
    } else {
        const index = MyComp.findIndex(comp => comp.id + 'c' === id)
    
        const updatedComp = {
            id :MyComp[index].id,
            mark: allInputs[0].value,
            ram: allInputs[1].value,
            gpu: allInputs[2].value,
            img: allInputs[3].value,
            cpu: allInputs[4].value,
            rom: allInputs[5].value,
            os: allInputs[6].value,
            new: allInputs[7].value
        }
    
        MyComp[index] = updatedComp
    
        for(let input of allInputs){
            input.value = ''
        }
    
        for(let user of users){
            if(user.name == currentUser){
                user.computers = MyComp
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        uptadeTable()
        change = false
    }
}

function deleteComputer(id){
    MyComp = MyComp.filter((comp) => comp.id + 'd' !== id )

    for(let user of users){
        if(user.name == currentUser){
            user.computers = MyComp
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    uptadeTable();
}

function changeComputer(id){
    const currentComp = MyComp.find(comp => comp.id + 'c' === id)
    allInputs[0].value = currentComp.mark
    allInputs[1].value = currentComp.ram
    allInputs[2].value = currentComp.gpu
    allInputs[3].value = currentComp.img
    allInputs[4].value = currentComp.cpu
    allInputs[5].value = currentComp.rom
    allInputs[6].value = currentComp.os
    allInputs[7].value = currentComp.new

    change = true
}



table.addEventListener('click', (e) => {
    if(e.target.innerHTML === 'Delete'){
        id = e.target.id
        deleteComputer(id)
    } else if (e.target.innerHTML === 'Change'){
        id = e.target.id
        changeComputer(id)
    }
})

addBtn.addEventListener('click', addComputer)

