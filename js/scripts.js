//Declaring all variables that will be used throughout the project 
const url = "https://randomuser.me/api/?results=12&inc=name,email,cell,location,dob,picture,nat=us&noinfo"
const gallery = document.getElementById('gallery');
let employee = []; 

fetch(url)
    .then(response => response.json())
    .then(response => {
        employee = (response.results);// giving variable employee a value through fetch 
        displayEmployee(response.results);
    })
    .catch(error => console.log("Looks like there was a problem", error));

//function to display employee information using the empty array of employee and its value through fetch.
function displayEmployee(employee) {
  

    let html = "";
    employee.forEach((employee, index) => {
        let picture = employee.picture;
        let name = employee.name;
        let email = employee.email;
        let location = employee.location;
        let cell= employee.cell;
        let dob = employee.dob;


        html +=//allows to add to the string, instead of just displaying one employee at a time.

            ` <div class="card" data-index="${index}">
                <div class="card-img-container">
                        <img class="card-img" src=${employee.picture.large} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee.name.first}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city} , ${employee.location.state}</p>
                    </div>
                  </div>
                  `;
    });
    gallery.insertAdjacentHTML('beforeend', html);
}


//Creation of modal(box) that will display employee info with proper formatting. 
function createModal(index) {
   console.log(employee);//ensuring its synced and fetching employee information 
    const {
        picture,
        name,
        email,
        location: { city, street, state, postcode },
        dob,
        cell,
    } = employee[index];

    let month = new Date(dob.date).getMonth();
    let day = new Date(dob.date).getDay();
    let year = new Date(dob.date).getFullYear();

    let modalHtml =
        `<div class="modal-container">
       <div class="modal">
           <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
           <div class="modal-info-container">
               <img class="modal-img" src=${picture.large} alt="profile picture">
               <h3 id="name" class="modal-name cap">${name.first}</h3>
               <p class="modal-text">${email}</p>
               <p class="modal-text cap">${city}</p>
               <hr>
               <p class="modal-text">${cell}</p>
               <p class="modal-text">${street.number}, ${street.name}, ${state}, ${postcode}</p>
               <p class="modal-text"> ${month}/${day}/${year}</p>
           </div>
       </div>`
    ;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const closeBtn = document.getElementById("modal-close-btn"); 
    const modalContainer = document.querySelector(".modal-container");
    closeBtn.addEventListener("click", () => {
        modalContainer.remove();
    });
}

//Displays employee's information, controlled by user
gallery.addEventListener('click', (e) => {
    console.log(e.target);
    const card = e.target.closest(".card"); 
    console.log(card);
    const index = card.getAttribute("data-index"); 
    console.log(index);
    createModal(index); 
}); 