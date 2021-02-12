var information = [];
function save() {
    var name = document.getElementById("inName").value;
    var phone = Number(document.getElementById("inPhone").value);
    var street = document.getElementById("inStreet").value;
    var number = Number(document.getElementById("inNumber").value);
    var cep = Number(document.getElementById("inCep").value);
    var neighb = document.getElementById("inNboard").value;


    if (name == "" || phone == "" || street == "" || number == "" || cep == "" || neighb == "") {
        alert("Infrome corretamente os dados.");
    }

    information.push({
        name: name, phone: phone, street: street, number: number, cep: cep, neighb: neighb
    })
    inName.value = "";
    inPhone.value = "";
    inStreet.value = "";
    inNumber.value = "";
    inCep.value = "";
    inNboard.value = "";
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
    console.log(list)
}