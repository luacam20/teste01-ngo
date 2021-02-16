var customers = [];

const localStorageCustomers = JSON.parse(localStorage.getItem('customersData'))

if (localStorageCustomers.length >= 1) {
    customers = localStorageCustomers;
}

function cepSearch() {
    var cep = document.getElementById("inCep").value.replace(/\D/g, '');

    var url = `https://viacep.com.br/ws/${cep}/json`;
    var request = new XMLHttpRequest();

    request.open('GET', url);

    request.onerror = function (e) {
        alert('API OFFLINE OU CEP INVÁLIDO');
    }

    request.onload = () => {
        var response = JSON.parse(request.responseText);

        if (response.erro === true) {
            alert('CEP NÃO ENCONTRADO');
        } else {
            var rua = document.getElementById('inStreet');
            var bairro = document.getElementById('inBairro');

            rua.value = response.logradouro;
            bairro.value = response.bairro;
        }
    }

    request.send();
}

function save() {
    var name = document.getElementById("inName").value;
    var phone = Number(document.getElementById("inPhone").value);
    var cep = document.getElementById("inCep").value;
    var street = document.getElementById("inStreet").value;
    var number = Number(document.getElementById("inNumber").value);
    var neighb = document.getElementById("inBairro").value;

    if (name == "" || phone == "" || street == "" || number == "" || cep == "" || neighb == "") {
        alert("Infrome corretamente os dados.");

        return;
    }

    if (customers.find(customer => customer.phone === phone)) {
        alert("Esse telefone ja foi registrado em nome de outro cliente.");

        return;
    }

    customers.push({
        name: name, phone: phone, street: street, number: number, cep: cep, neighb: neighb
    });

    localStorage.setItem('customersData', JSON.stringify(customers));

    inName.value = "";
    inPhone.value = "";
    inStreet.value = "";
    inNumber.value = "";
    inCep.value = "";
    inBairro.value = "";

    inName.focus();

    listar();
}

function listar() {
    var answer = document.getElementById("inAnswer");

    if (customers.length == 0) {
        alert("Não há informações salvas.");
        return;
    }

    var clist = "";

    answer.innerHTML = "";

    for (var i = 0; i < customers.length; i++) {
        clist = "Nome: " + customers[i].name + " | " + " Telefone: " + customers[i].phone + " | " + " Rua: " + customers[i].street + " | " + " n°: " + customers[i].number + " | " + " CEP: " + customers[i].cep + " | " + " Bairro: " + customers[i].neighb + "\n";

        answer.innerHTML += `<p id="list-item">${clist} <button onclick="remove(${i})" id="delete_button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></p>`;
    }

}

function loadLocalStorageData() {
    var answer = document.getElementById("inAnswer");

    const localStorageData = JSON.parse(localStorage.getItem('customersData'));

    var clist = "";

    answer.innerHTML = ``;

    for (var i = 0; i < localStorageData.length; i++) {
        clist = "Nome: " + customers[i].name + " | " + " Telefone: " + customers[i].phone + " | " + " Rua: " + customers[i].street + " | " + " n°: " + customers[i].number + " | " + " CEP: " + customers[i].cep + " | " + " Bairro: " + customers[i].neighb + "\n";

        answer.innerHTML += `<p id="list-item">${clist} <button onclick="remove(${i})" id="delete_button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></p>`;
    }
}

function remove(positionOnArray) {
    var answer = document.getElementById("inAnswer");

    const customerForDelete = customers[positionOnArray];
    const newCustomersList = customers.filter(customer => customer.phone !== customerForDelete.phone);

    let clist;

    answer.innerHTML = ``;

    for (var j = 0; j < newCustomersList.length; j++) {
        clist = "Nome: " + newCustomersList[j].name + " | " + " Telefone: " + newCustomersList[j].phone + " | " + " Rua: " + newCustomersList[j].street + " | " + " n°: " + newCustomersList[j].number + " | " + " CEP: " + newCustomersList[j].cep + " | " + " Bairro: " + newCustomersList[j].neighb + "\n";

        answer.innerHTML += `<p id="list-item">${clist} <button onclick="remove(${j})" id="delete_button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></p>`;
    }

    customers = newCustomersList;

    localStorage.removeItem('customersData');
    localStorage.setItem('customersData', JSON.stringify(newCustomersList));
}