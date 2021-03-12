'use strict';

const table = document.getElementById("formTable").getElementsByTagName('tbody')[0];
const tbody = document.getElementById("tbody");
const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
let updateID = 0;

function openModal(id) {
    updateID = id;
    modal.style.display = "block";
    console.log(updateID);
}

function closeModal() {
    modal.style.display = "none";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function getPatient() {
    axios.get("http://localhost:8080/showAll")
        .then(res => {
            table.innerHTML = "";
            const patient = res.data;

            patient.forEach(patient => {
                const newPatient = renderPatient(patient);
            });
        }).catch(err => console.error(err))
}


function renderPatient(patient) {
    const row = table.insertRow();

    const cellid = row.insertCell();
    cellid.innerHTML = patient.id;

    const cellName = row.insertCell();
    cellName.innerHTML = patient.name;

    const cellAge = row.insertCell();
    cellAge.innerHTML = patient.age;

    const cellEmail = row.insertCell();
    cellEmail.innerHTML = patient.email;

    const cellPostcode = row.insertCell();
    cellPostcode.innerHTML = patient.postCode;

    const cellVaccine = row.insertCell();
    cellVaccine.innerHTML = patient.vaccine;

    const cellVacDate = row.insertCell();
    cellVacDate.innerHTML = patient.vaccineDate;

    const cellFutVacDate = row.insertCell();
    cellFutVacDate.innerHTML = patient.futureVacDate;

    const UpdateButton = document.createElement("button");
    UpdateButton.className = "btn btn-light";
    UpdateButton.innerText = "Update";
    UpdateButton.addEventListener('click', function () {
        openModal(patient.id);
    })

    row.appendChild(UpdateButton);

    const DeleteButton = document.createElement("button");
    DeleteButton.className = "btn btn-light";
    DeleteButton.innerHTML = "Delete"

    row.appendChild(DeleteButton);

    return row;
}

document.getElementById("patientForm").addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        name: this.name.value,
        age: this.age.value,
        email: this.email.value,
        postCode: this.postcode.value,
        vaccine: this.vaccine.value,
    };

    axios.post("http://localhost:8080/createPatient", data)
        .then(() => {
            this.reset();
            this.name.focus();
            getPatient();
        })
        .catch(err => console.error(err));


})

document.getElementById("modalForm").addEventListener('submit', function (event) {
    event.preventDefault();
    const data = {
        name: this.updatedName.value,
        age: this.updatedAge.value,
        job_title: this.updatedJobTitle.value
    }
    updatePerson(updateID, data);
    this.updatedName.value = "";
    this.updatedAge.value = null;
    this.updatedJobTitle.value = "";
    closeModal();
})

getPatient();