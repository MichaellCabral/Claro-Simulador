let internetNome = "";
let internetValor = 0;
let internetValorOriginal = 0;
let produtoSelecionado = null;

let chipNome = "";
let chipValor = 0;
let chipSelecionado = null;

// Preços com desconto ao combinar com chip
const desconto350Megas = 79.90;
const desconto500Megas = 99.90;
const desconto1Giga = 149.90;

function selecionarInternet(nome, valor) {
  const produtos = document.querySelectorAll(".produto");
  
  // Se clicou no mesmo produto, desseleciona
  if (produtoSelecionado && produtoSelecionado.textContent.includes(nome)) {
    produtoSelecionado.classList.remove("selecionado");
    produtoSelecionado = null;
    internetNome = "";
    internetValor = 0;
    document.getElementById("internetSelecionada").innerHTML = "Nenhuma selecionada";
    atualizarResumo();
    return;
  }
  
  // Remove seleção anterior
  if (produtoSelecionado) {
    produtoSelecionado.classList.remove("selecionado");
  }
  
  // Encontra e seleciona o novo produto
  const produtoAtual = Array.from(produtos).find(p => p.textContent.includes(nome));
  if (produtoAtual) {
    produtoAtual.classList.add("selecionado");
    produtoSelecionado = produtoAtual;
  }
  
  internetNome = nome;
  internetValor = valor;
  internetValorOriginal = valor; // Armazena o valor original

  document.getElementById("internetSelecionada").innerHTML =
    `${nome} - R$ ${valor.toFixed(2).replace('.', ',')}`;

  atualizarResumo();
}

function selecionarChip(nome, valor) {
  const chips = document.querySelectorAll(".chip");
  
  // Se clicou no mesmo chip, desseleciona
  if (chipSelecionado && chipSelecionado.textContent.includes(nome)) {
    chipSelecionado.classList.remove("selecionado");
    chipSelecionado = null;
    chipNome = "";
    chipValor = 0;
    // Remove desconto de 350 Megas, 500 Megas ou 1 Giga quando chip é deseleccionado
    if (internetNome === "350 Megas" || internetNome === "500 Megas" || internetNome === "1 Giga") {
      internetValor = internetValorOriginal;
    }
    document.getElementById("nomeChip").innerText = "-";
    document.getElementById("valorChip").innerText = "0,00";
    atualizarResumo();
    return;
  }
  
  // Remove seleção anterior
  if (chipSelecionado) {
    chipSelecionado.classList.remove("selecionado");
  }
  
  // Encontra e seleciona o novo chip
  const chipAtual = Array.from(chips).find(c => c.textContent.includes(nome));
  if (chipAtual) {
    chipAtual.classList.add("selecionado");
    chipSelecionado = chipAtual;
  }
  
  chipNome = nome;
  chipValor = valor;

  // Aplica desconto para 350 Megas quando combinado com chip
  if (internetNome === "350 Megas") {
    internetValor = desconto350Megas;
  }
  // Aplica desconto para 500 Megas quando combinado com chip
  if (internetNome === "500 Megas") {
    internetValor = desconto500Megas;
  }
  // Aplica desconto para 1 Giga quando combinado com chip
  if (internetNome === "1 Giga") {
    internetValor = desconto1Giga;
  }

  document.getElementById("nomeChip").innerText = chipNome;
  document.getElementById("valorChip").innerText =
    chipValor.toFixed(2).replace('.', ',');

  atualizarResumo();
}

function atualizarResumo() {
  let total = internetValor + chipValor;

  document.getElementById("nomeInternet").innerText = internetNome;
  document.getElementById("valorInternet").innerText =
    internetValor.toFixed(2).replace('.', ',');

  document.getElementById("nomeChip").innerText = chipNome;
  document.getElementById("valorChip").innerText =
    chipValor.toFixed(2).replace('.', ',');

  document.getElementById("valorFinal").innerText =
    total.toFixed(2).replace('.', ',');
}