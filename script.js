let internetNome = "";
let internetValor = 0;
let internetValorOriginal = 0;
let produtoSelecionado = null;

let chipNome = "";
let chipValor = 0;
let chipSelecionado = null;

let tvBoxNome = "";
let tvBoxValor = 0;
let tvBoxValorOriginal = 0;
let tvBoxSelecionado = null;

// Preços com desconto ao combinar com chip
const desconto350Megas = 79.90;
const desconto500Megas = 99.90;
const desconto600Megas = 99.90;
const desconto1Giga = 149.90;
const descontoTvBoxComCombo = 119.90;
const descontoTvBoxComTres = 99.90;

function atualizarPrecoInternet() {
  if (internetNome === "") {
    internetValor = 0;
    return;
  }

  const possuiCombo = chipSelecionado || tvBoxSelecionado;

  if (internetNome === "350 Megas") {
    internetValor = possuiCombo ? desconto350Megas : internetValorOriginal;
    return;
  }

  if (internetNome === "500 Megas") {
    internetValor = possuiCombo ? desconto500Megas : internetValorOriginal;
    return;
  }

  if (internetNome === "600 Megas") {
    internetValor = possuiCombo ? desconto600Megas : internetValorOriginal;
    return;
  }

  if (internetNome === "1 Giga") {
    internetValor = possuiCombo ? desconto1Giga : internetValorOriginal;
    return;
  }

  internetValor = internetValorOriginal;
}

function atualizarPrecoTvBox() {
  atualizarPrecoInternet();

  if (!tvBoxSelecionado) {
    tvBoxValor = 0;
    return;
  }

  const possuiInternet = internetNome !== "";
  const possuiChip = chipNome !== "";

  if (possuiInternet && possuiChip) {
    tvBoxValor = descontoTvBoxComTres;
    return;
  }

  if (possuiInternet || possuiChip) {
    tvBoxValor = descontoTvBoxComCombo;
    return;
  }

  tvBoxValor = tvBoxValorOriginal;
}

function selecionarInternet(nome, valor) {
  const produtos = document.querySelectorAll(".produto");
  
  // Se clicou no mesmo produto, desseleciona
  if (produtoSelecionado && produtoSelecionado.textContent.includes(nome)) {
    produtoSelecionado.classList.remove("selecionado");
    produtoSelecionado = null;
    internetNome = "";
    internetValorOriginal = 0;
    internetValor = 0;
    atualizarPrecoTvBox();
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
  internetValorOriginal = valor; // Armazena o valor original
  atualizarPrecoInternet();
  atualizarPrecoTvBox();

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
    atualizarPrecoInternet();
    atualizarPrecoTvBox();
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
  atualizarPrecoInternet();
  atualizarPrecoTvBox();

  document.getElementById("nomeChip").innerText = chipNome;
  document.getElementById("valorChip").innerText =
    chipValor.toFixed(2).replace('.', ',');

  atualizarResumo();
}

function selecionarTvBox(nome, valor) {
  const tvBoxes = document.querySelectorAll(".tvbox");

  if (tvBoxSelecionado && tvBoxSelecionado.textContent.includes(nome)) {
    tvBoxSelecionado.classList.remove("selecionado");
    tvBoxSelecionado = null;
    tvBoxNome = "";
    tvBoxValor = 0;
    document.getElementById("valorTvBox").innerText = "0,00";
    atualizarPrecoInternet();
    atualizarPrecoTvBox();
    atualizarResumo();
    return;
  }

  if (tvBoxSelecionado) {
    tvBoxSelecionado.classList.remove("selecionado");
  }

  const tvBoxAtual = Array.from(tvBoxes).find(t => t.textContent.includes(nome));
  if (tvBoxAtual) {
    tvBoxAtual.classList.add("selecionado");
    tvBoxSelecionado = tvBoxAtual;
  }

  tvBoxNome = nome;
  tvBoxValorOriginal = valor;
  atualizarPrecoTvBox();

  document.getElementById("valorTvBox").innerText =
    tvBoxValor.toFixed(2).replace('.', ',');

  atualizarResumo();
}

function atualizarResumo() {
  let total = internetValor + chipValor + tvBoxValor;

  document.getElementById("nomeInternet").innerText = internetNome;
  document.getElementById("valorInternet").innerText =
    internetValor.toFixed(2).replace('.', ',');

  document.getElementById("nomeChip").innerText = chipNome;
  document.getElementById("valorChip").innerText =
    chipValor.toFixed(2).replace('.', ',');

  document.getElementById("valorTvBox").innerText =
    tvBoxValor.toFixed(2).replace('.', ',');

  document.getElementById("valorFinal").innerText =
    total.toFixed(2).replace('.', ',');
}

atualizarResumo();