// ESQUELETO PARA TDD — implemente as regras após escrever os testes.
const CHAVE_CARRINHO="cafeteria_carrinho"; 
const CHAVE_PEDIDOS="cafeteria_pedidos";
let produtos=[]; 
let carrinho=[]; 
let categoriaAtual="Todos";
const formatarMoeda=v=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
// TODO: carregarProdutos, buscarProdutos, filtrarPorCategoria, adicionarAoCarrinho,
// removerDoCarrinho, alterarQuantidade, calcularSubtotal, calcularTaxa,
// calcularTotal, gerarPedido, salvarCarrinho, carregarCarrinho e salvarPedido.

fetch('produtos.json')
  .then(res => res.json()) 
  .then(data => {
    produtos = data;        //Atribui os dados à variável
    renderizarProdutos(produtos);
  })
  .catch(error => console.log('Erro:', error));
/**
 * Carrega os produtos na página
 * @param {*} lista 
 */
function renderizarProdutos(lista){
    document.querySelector("#listaProdutos").innerHTML = lista.map((p,i)=>`<article class="produto"><img src="${p.foto}" alt="${p.nome}"><div class="produto-corpo"><span class="produto-categoria">${p.categoria}</span><h3>${p.nome}</h3><p>${p.descricao}</p><div class="produto-rodape"><span class="preco">${formatarMoeda(p.preco)}</span><button class="adicionar" data-id="${p.id??i}">Adicionar</button></div></div></article>`).join("")
}
document.querySelector("#abrirCarrinho").onclick=()=>document.querySelector("#modalCarrinho").classList.add("aberto");
document.querySelector("#fecharCarrinho").onclick=()=>document.querySelector("#modalCarrinho").classList.remove("aberto");
// Seleciona todos os botões de filtro
const botoes = document.querySelectorAll('.filtro');
botoes.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        categoriaAtual = evento.currentTarget.dataset.categoria;
        filtrarPorCategoria(produtos, categoriaAtual);
    });
});
/**
 * Categoria atual
 * @param {*} produtos 
 * @param {*} Categoria 
 */
function filtrarPorCategoria(produtos, Categoria){
    if(Categoria == "Todos") renderizarProdutos(produtos);
    else if(Categoria == "Bebidas quentes")renderizarProdutos(produtos.filter(p=>p.categoria=="Bebidas quentes"));
    else if(Categoria=="Bebidas frias")renderizarProdutos(produtos.filter(p=>p.categoria=="Bebidas frias"));
    else if(Categoria=="Pães")renderizarProdutos(produtos.filter(p=>p.categoria=="Pães"));
    else if(Categoria=="Bolos")renderizarProdutos(produtos.filter(p=>p.categoria=="Bolos"));
    else renderizarProdutos(produtos);
}
const campoBusca = document.getElementById('busca');
/**
 * busca produtos por parte do nome ou descrição
 * @param {*} produtos 
 * @param {*} valor valor da busca
 */
function buscarProdutos(produtos, valor) {
    const termoBusca = valor.toLowerCase().trim();
    const produtosFiltrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termoBusca) || p.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarProdutos(produtosFiltrados);
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && document.activeElement === campoBusca) {
        const valorAtual = campoBusca.value;
        buscarProdutos(produtos, valorAtual);
    }
});




