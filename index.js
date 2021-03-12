'use strict';

const table = document.getElementById("formTable").getElementsByTagName('tbody')[0];
const tbody = document.getElementById("tbody");
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

getPatient();