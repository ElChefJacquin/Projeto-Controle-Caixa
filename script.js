var salvar = document.getElementById("salvar");
let quantidadea, nomea, precoa, novo;

// verificar se há dados salvos no localStorage
if (localStorage.getItem("quantidade") && localStorage.getItem("nome") && localStorage.getItem("preco")) {
  quantidadea = localStorage.getItem("quantidade").split(",");
  nomea = localStorage.getItem("nome").split(",");
  precoa = localStorage.getItem("preco").split(",");
  novo = false
} else {
  //Se não detectar dados salvos, o programa inicia as variáveis
  quantidadea = [];
  nomea = [];
  precoa = [];
  novo = true
}

let nome, preco, quantidade;
let precot, nomet, quantidadet;

if (novo == false) {
  precot = localStorage.getItem("preco");
  precot = precot.split(",");
  quantidadet = localStorage.getItem("quantidade");
  quantidadet = quantidadet.split(",");
  nomet = localStorage.getItem("nome");
  nomet = nomet.split(",");
}

salvar.addEventListener("click", function(){
    nome = document.getElementById("nome");
    preco = document.getElementById("preco");
    quantidade = document.getElementById("quant");
    quantidadea.push(quantidade.value);
    nomea.push(nome.value);
    precoa.push(preco.value);
    ArmazenarDadosXYZ(nomea, precoa, quantidadea);
});

//Transformar string em array
//Tabela abaixo

let table = document.getElementById("tabela")
console.log(precot);
console.log(nomet);
console.log(quantidadet);
console.log(quantidadet[0]);

let linha, celulapreco, celulanome, celulaquantidade, celulaedit, celulaexcluir;

  for (let i = 0; i<precot.length; i++) {
    linha = table.insertRow();
    celulapreco = linha.insertCell();
    celulanome = linha.insertCell();
    celulaquantidade = linha.insertCell();
    celulanome.innerHTML = nomet[i];
    celulapreco.innerHTML = precot[i];
    celulaquantidade.innerHTML = quantidadet[i];
    celulaedit = linha.insertCell();
    celulaexcluir = linha.insertCell();
    celulaedit.innerHTML = `<a onclick="editar(${i});"><i class="fa-regular fa-pen-to-square" style="color: #100c58;"></a>`
    celulaexcluir.innerHTML = '<a onclick="excluir(' + i + ');"><i class="fa-solid fa-trash" style="color: #100c58";></a>'
  }

function editar(pos) {
  let nomen, precon, quantn;
  nomen = prompt("Qual nome deseja? (Em branco caso queira manter)");
  if (nomen == "") {
    nomen = nomet[pos]
  } else {
    nomet.splice(pos, 1, nomen)
  }
  quantn = prompt("Qual quantidade deseja? (Em branco caso queira manter)")
  if (quantn == "") {
    quantn = quantidadet[pos]
  } else {
    quantidadet.splice(pos, 1, quantn)
  }
  precon = prompt("Qual preço deseja? (Em branco caso queira manter)")
  if (precon == "") {
    precon = precot[pos]
  } else {
    precot.splice(pos, 1, precon)
  }
  
  celulanome.innerHTML = nomet[pos];
  celulapreco.innerHTML = precot[pos];
  celulaquantidade.innerHTML = quantidadet[pos];

  localStorage.setItem("nome", String(nomet));
  localStorage.setItem("preco", String(precot));
  localStorage.setItem("quantidade", String(quantidadet));
}

function excluir(pos) {
  confirmacao = confirm("Deseja realmente apagar este registro?");
  if (confirmacao == true) {
    nomet.splice(pos, 1);
    quantidadet.splice(pos, 1)
    precot.splice(pos, 1);
    celulanome.innerHTML = ""
    celulapreco.innerHTML = ""
    celulaquantidade.innerHTML = ""
    celulaedit.innerHTML = ""
    celulaexcluir.innerHTML = ""
    console.log(quantidadet)
    ArmazenarDados();
  } else {
    return;
  }
}

function ArmazenarDados () {
    localStorage.setItem("nome", String(nomea));
    localStorage.setItem("preco", String(precoa));
    localStorage.setItem("quantidade", String(quantidadea));
}
function ArmazenarDadosXYZ (X, Y, Z) {
  localStorage.setItem("nome", String(X));
  localStorage.setItem("preco", String(Y));
  localStorage.setItem("quantidade", String(Z));
}