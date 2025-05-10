/**
 * BuscadorProdutos
 * Exibe uma lista paginada de produtos, com detalhes ao clicar.
 * Demonstra uso de hooks, fetch, paginação e modal.
 */
import React, { useState, useEffect } from 'react';

const BuscadorProdutos = () => {
  // Estados principais
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [animacao, setAnimacao] = useState('');

  // Busca os produtos da página atual
  useEffect(() => {
    async function buscarProdutos() {
      setCarregando(true);
      setErro(null);
      setAnimacao('fadeIn');
      try {
        const resposta = await fetch(`https://fakestoreapi.com/products?limit=8&page=${pagina}`);
        if (!resposta.ok) throw new Error('Erro ao buscar produtos');
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        setErro(erro.message);
        setAnimacao('shake');
        setTimeout(() => setAnimacao(''), 500);
      } finally {
        setCarregando(false);
      }
    }
    buscarProdutos();
  }, [pagina]);

  // Abre o modal com detalhes do produto
  function abrirModal(produto) {
    setProdutoSelecionado(produto);
    setAnimacao('fadeIn');
  }

  // Paginação
  function proximaPagina() {
    setPagina(pagina + 1);
    setAnimacao('slideUp');
  }
  function paginaAnterior() {
    if (pagina > 1) {
      setPagina(pagina - 1);
      setAnimacao('slideUp');
    }
  }

  return (
    <div className="lista-produtos">
      {erro && (
        <div className={`mensagem-erro ${animacao}`}>{erro}</div>
      )}

      {carregando ? (
        <div className="carregando">
          <div className="spinner"></div>
          Carregando produtos...
        </div>
      ) : (
        <>
          <div className="grade-produtos">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className={`card-produto ${animacao}`}
                onClick={() => abrirModal(produto)}
                title="Clique para ver detalhes"
              >
                <img
                  src={produto.image}
                  alt={produto.title}
                  className="imagem-produto"
                />
                <h4>{produto.title}</h4>
                <p className="preco">R$ {produto.price.toFixed(2)}</p>
                <div className="categoria-produto">{produto.category}</div>
                <div className="avaliacao">
                  {'★'.repeat(Math.round(produto.rating.rate))}
                  {'☆'.repeat(5 - Math.round(produto.rating.rate))}
                  <span className="contagem-avaliacoes">
                    ({produto.rating.count})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="controles-paginacao">
            <button
              onClick={paginaAnterior}
              disabled={pagina === 1}
              className="botao-paginacao"
            >
              Anterior
            </button>
            <span className="numero-pagina">Página {pagina}</span>
            <button
              onClick={proximaPagina}
              className="botao-paginacao"
            >
              Próxima
            </button>
          </div>
        </>
      )}

      {/* Modal de detalhes do produto */}
      {produtoSelecionado && (
        <div className={`modal-produto ${animacao}`}>
          <div className="conteudo-modal">
            <button
              className="fechar-modal"
              onClick={() => setProdutoSelecionado(null)}
              title="Fechar"
            >
              ×
            </button>
            <div className="detalhes-produto">
              <img
                src={produtoSelecionado.image}
                alt={produtoSelecionado.title}
                className="imagem-produto-modal"
              />
              <div className="info-produto">
                <h3>{produtoSelecionado.title}</h3>
                <p className="preco">R$ {produtoSelecionado.price.toFixed(2)}</p>
                <p className="descricao">{produtoSelecionado.description}</p>
                <div className="categoria-produto">{produtoSelecionado.category}</div>
                <div className="avaliacao">
                  {'★'.repeat(Math.round(produtoSelecionado.rating.rate))}
                  {'☆'.repeat(5 - Math.round(produtoSelecionado.rating.rate))}
                  <span className="contagem-avaliacoes">
                    ({produtoSelecionado.rating.count} avaliações)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscadorProdutos; 