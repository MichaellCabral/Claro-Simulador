let internetNome = "";
let internetTier = "";
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
const descontoPorPlano = {
  "350Megas": 79.90,
  "500Megas": 99.90,
  "600Megas": 99.90,
  "1Giga": 149.90,
};
const descontoTvBoxComCombo = 119.90;
const descontoTvBoxComTres = 99.90;

function atualizarPrecoInternet() {
  if (internetTier === "") {
    internetValor = 0;
    return;
  }

  const possuiCombo = chipSelecionado || tvBoxSelecionado;

  if (descontoPorPlano[internetTier] !== undefined) {
    internetValor = possuiCombo ? descontoPorPlano[internetTier] : internetValorOriginal;
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

function selecionarInternet(elemento) {
  const produto = elemento;
  const nome = produto.dataset.name;
  const valor = Number(produto.dataset.value);
  const tier = produto.dataset.tier;

  if (produtoSelecionado === produto) {
    produto.classList.remove("selecionado");
    produtoSelecionado = null;
    internetNome = "";
    internetTier = "";
    internetValorOriginal = 0;
    internetValor = 0;
    atualizarPrecoTvBox();
    atualizarResumo();
    return;
  }

  if (produtoSelecionado) {
    produtoSelecionado.classList.remove("selecionado");
  }

  produto.classList.add("selecionado");
  produtoSelecionado = produto;

  internetNome = nome;
  internetTier = tier;
  internetValorOriginal = valor;
  atualizarPrecoInternet();
  atualizarPrecoTvBox();

  atualizarResumo();
}

function selecionarChip(elemento) {
  const chip = elemento;
  const nome = chip.dataset.name;
  const valor = Number(chip.dataset.value);

  if (chipSelecionado === chip) {
    chip.classList.remove("selecionado");
    chipSelecionado = null;
    chipNome = "";
    chipValor = 0;
    atualizarPrecoInternet();
    atualizarPrecoTvBox();
    atualizarResumo();
    return;
  }

  if (chipSelecionado) {
    chipSelecionado.classList.remove("selecionado");
  }

  chip.classList.add("selecionado");
  chipSelecionado = chip;

  chipNome = nome;
  chipValor = valor;
  atualizarPrecoInternet();
  atualizarPrecoTvBox();

  atualizarResumo();
}

function selecionarTvBox(elemento) {
  const tvBox = elemento;
  const nome = tvBox.dataset.name;
  const valor = Number(tvBox.dataset.value);

  if (tvBoxSelecionado === tvBox) {
    tvBox.classList.remove("selecionado");
    tvBoxSelecionado = null;
    tvBoxNome = "";
    tvBoxValor = 0;
    tvBoxValorOriginal = 0;
    atualizarPrecoInternet();
    atualizarPrecoTvBox();
    atualizarResumo();
    return;
  }

  if (tvBoxSelecionado) {
    tvBoxSelecionado.classList.remove("selecionado");
  }

  tvBox.classList.add("selecionado");
  tvBoxSelecionado = tvBox;

  tvBoxNome = nome;
  tvBoxValorOriginal = valor;
  atualizarPrecoTvBox();

  atualizarResumo();
}

function formatarValor(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function enviarWhatsapp() {
  const total = internetValor + chipValor + tvBoxValor;
  const planoEscolhido = [
    internetNome || "Nenhuma internet",
    chipNome || "Sem chip",
    tvBoxNome || "Sem TV Box"
  ].join(" / ");

  const mensagem =
    `Bom dia! Quero contratar o plano: ${planoEscolhido}.\n\n` +
    `Internet: ${internetNome || "Nenhuma"}\n` +
    `Chip: ${chipNome || "Nenhum"}\n` +
    `TV Box: ${tvBoxNome || "Nenhuma"}\n\n` +
    `Total: R$ ${formatarValor(total)}`;

  const whatsappBase = "https://wa.me/message/ZMXY7NP6B32AD1";
  const url = `${whatsappBase}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

function atualizarResumo() {
  let total = internetValor + chipValor + tvBoxValor;

  document.getElementById("nomeInternet").innerText = internetNome || "-";
  document.getElementById("valorInternet").innerText =
    formatarValor(internetValor);

  document.getElementById("nomeChip").innerText = chipNome || "-";
  document.getElementById("valorChip").innerText =
    formatarValor(chipValor);

  document.getElementById("nomeTvBox").innerText = tvBoxNome || "-";
  document.getElementById("valorTvBox").innerText =
    formatarValor(tvBoxValor);

  document.getElementById("valorFinal").innerText =
    formatarValor(total);
}

atualizarResumo();