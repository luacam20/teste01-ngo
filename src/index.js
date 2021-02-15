var information = [];

const localStorageCustomers = JSON.parse(localStorage.getItem('customersData'))

if (localStorageCustomers.length >= 1) {
    information = localStorageCustomers;
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
    }

    information.push({
        name: name, phone: phone, street: street, number: number, cep: cep, neighb: neighb
    });

    localStorage.setItem('customersData', JSON.stringify(information));

    inName.value = "";
    inPhone.value = "";
    inStreet.value = "";
    inNumber.value = "";
    inCep.value = "";
    inBairro.value = "";

    inName.focus();
}

function listar() {
    var answer = document.getElementById("inAnswer");

    if (information.length == 0) {
        alert("Não há informações salvas.");
        return;
    }

    var clist = "";

    for (var i = 0; i < information.length; i++) {
        clist += "Nome: " + information[i].name + " | " + " Telefone: " + information[i].phone + " | " + " Rua: " + information[i].street + " | " + " n°: " + information[i].number + " | " + " CEP: " + information[i].cep + " | " + " Bairro: " + information[i].neighb + "\n";
    }

    answer.innerHTML = `${clist}`;
}

function loadLocalStorageData() {
    var answer = document.getElementById("inAnswer");

    const localStorageData = JSON.parse(localStorage.getItem('customersData'));

    var clist = "";

    for (var i = 0; i < localStorageData.length; i++) {
        clist += "Nome: " + localStorageData[i].name + " | " + " Telefone: " + localStorageData[i].phone + " | " + " Rua: " + localStorageData[i].street + " | " + " n°: " + localStorageData[i].number + " | " + " CEP: " + localStorageData[i].cep + " | " + " Bairro: " + localStorageData[i].neighb + "\n";
    }

    answer.innerHTML = `${clist}`;
}