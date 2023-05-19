//Declarar o 2 botões principais

var salvar = document.getElementById("salvar");
var clear = document.getElementById("Clear")
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

//Se novo for falso, ou seja, se há algo no array, ele irá puxar do localstorage e transformar a string em array

if (novo == false) {
  precot = localStorage.getItem("preco");
  precot = precot.split(",");
  quantidadet = localStorage.getItem("quantidade");
  quantidadet = quantidadet.split(",");
  nomet = localStorage.getItem("nome");
  nomet = nomet.split(",");
}

//Função para limpar os dados
function limpar () {
  if (novo == true) {
    alert("Não há nada para limpar!")
  } else {
    pergunta = confirm("Realmente deseja deletar tudo?")
    if (pergunta == true) {
      localStorage.clear();
      window.location.reload();
    }
  }
}

//Função para salvar os arquivos, como essa é mais complicada, utilizei EventListener para manipular melhor pelo JS

salvar.addEventListener("click", function(){
    nome = document.getElementById("nome");
    preco = document.getElementById("preco");
    quantidade = document.getElementById("quant");
    quantidadea.push(quantidade.value);
    nomea.push(nome.value);
    precoa.push(preco.value);
    localStorage.setItem("quantidade", String(quantidadea));
    localStorage.setItem("preco", String(precoa));
    localStorage.setItem("nome", String(nomea));
    window.location.reload()
});

//Tabela abaixo, usei os elementos InsertRow e InsertCell para inserir os botões de excluir e etc

let table = document.getElementById("tabela")
let linha, celulapreco, celulanome, celulaquantidade, celulaedit, celulaexcluir;

for (let i = 0; i < precot.length; i++) {
  linha = table.insertRow();
  celulanome = linha.insertCell();
  celulapreco = linha.insertCell();
  celulaquantidade = linha.insertCell();
  celulanome.innerHTML = nomet[i];
  celulapreco.innerHTML = precot[i];
  celulaquantidade.innerHTML = quantidadet[i];
  celulaedit = linha.insertCell();
  celulaexcluir = linha.insertCell();
  celulaedit.innerHTML = `<a onclick="editar(${i});"><i class="fa-regular fa-pen-to-square" class="butoes"></a>`;
  celulaexcluir.innerHTML = `<a onclick="excluir(${i});"><i class="fa-solid fa-trash" class="butoes"></a>`;
}

//Função para fazer a edição de um elemento da tabela de pedidos

function editar(pos) {
  let nomen, precon, quantn;
  nomen = prompt("Qual nome deseja? (Em branco caso queira manter)");
  if (nomen != "") {
    nomet.splice(pos, 1, nomen)
  }
  quantn = prompt("Qual quantidade deseja? (Em branco caso queira manter)")
  if (quantn != "") {
    quantidadet.splice(pos, 1, quantn)
  }
  precon = prompt("Qual preço deseja? (Em branco caso queira manter)")
  if (precon != "") {
    precot.splice(pos, 1, precon)
  }
  ArmazenarDados();
  window.location.reload()
}

//Função para excluir
function excluir(pos) {
  confirmacao = confirm("Deseja realmente apagar este registro?");
  if (confirmacao == true) {
    nomet.splice(pos, 1);
    quantidadet.splice(pos, 1)
    precot.splice(pos, 1);
    ArmazenarDados();
    window.location.reload()
  }
}

//Função para evitar gasto excessivo de linhas na hora de salvar
function ArmazenarDados () {
    localStorage.setItem("nome", String(nomet));
    localStorage.setItem("preco", String(precot));
    localStorage.setItem("quantidade", String(quantidadet));
}