const users = JSON.parse(localStorage.getItem('users'));
const nav = document.querySelector('.nav');
const tabContent = document.querySelector('.tab-content');

let marks = [];
let computers = [];

for (let user of users) {
	for (let comp of user.computers) {
		computers.push(comp);

		if (!marks.includes(comp.mark)) {
			marks.push(comp.mark);
		}
	}
}

for (let mark of marks) {
	nav.innerHTML += `<button class="nav-link" id="v-pills-${mark}-tab" data-bs-toggle="pill" data-bs-target="#v-pills-${mark}" type="button" role="tab" aria-controls="v-pills-${mark}" aria-selected="true">${mark}</button>`;
	tabContent.innerHTML += `<div class="tab-pane fade" id="v-pills-${mark}" role="tabpanel" aria-labelledby="v-pills-${mark}-tab" tabindex="0"></div>`;
}

const tabPanes = document.querySelectorAll('.tab-pane');

for (let tabPane of tabPanes) {
	for (let comp of computers) {
		if (tabPane.id === `v-pills-${comp.mark}`)
			tabPane.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${comp.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${comp.mark}</h5>
          <p class="card-text">Ram: ${comp.ram}</p>
          <p class="card-text">Rom: ${comp.rom}</p>
          <p class="card-text">CPU: ${comp.cpu}</p>
          <p class="card-text">GPU: ${comp.gpu}</p>
          <button id='${comp.id}' data-bs-toggle="modal" 
          data-bs-target="#exampleModal" class="btn btn-primary
          ">Details</button>
        </div>
      </div>`;
	}
}

const details = document.querySelector('.d-flex');
const modalBody = document.querySelector('.modal-body');

function clickHandler(e) {
	console.log(e.target.id);
	if (e.target.innerHTML === 'Details') {
		for (let comp of computers) {
			if (comp.id === e.target.id) {
				modalBody.innerHTML = `
                <div class='modal-cont'>
                   <img class='w-50' src="${comp.img}" alt=""/>
                   <div>
                        <p>Ram: ${comp.ram}</p>
                        <p>Rom: ${comp.rom}</p>
                        <p>CPU: ${comp.cpu}</p>
                        <p>GPU: ${comp.gpu}</p>
                   </div>
                </div>`;
			}
		}
	}
}

details.addEventListener('click', clickHandler);
