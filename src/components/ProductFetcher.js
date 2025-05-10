import React, { useState, useEffect } from "react";

/**
 * 🛍️ Componente BuscadorProdutos
 * 
 * Este componente é um exemplo prático de como criar uma interface de produtos
 * consumindo a Fake Store API. É perfeito para aprender:
 * 
 * 📚 Conceitos Demonstrados:
 * - Requisições HTTP com fetch
 * - Estados para gerenciar dados e UI
 * - Tratamento de erros
 * - Loading states
 * - Renderização condicional
 * - Grid layout responsivo
 * 
 * 🎯 Objetivos de Aprendizado:
 * 1. Entender como fazer requisições HTTP em React
 * 2. Aprender a gerenciar estados de loading e erro
 * 3. Implementar interfaces responsivas
 * 4. Criar cards de produtos com grid
 * 
 * @example
 * // Como usar o componente
 * <BuscadorProdutos />
 * 
 * // Exemplo de resultado
 * {
 *   id: 1,
 *   title: "Produto Exemplo",
 *   price: 99.99,
 *   description: "Descrição do produto",
 *   image: "https://exemplo.com/imagem.jpg"
 * }
 */
function BuscadorProdutos() {
  // Estados para gerenciar dados e UI
  const [produtos, setProdutos] = useState([]); // Lista de produtos da API
  const [carregando, setCarregando] = useState(true); // Controla o estado de loading
  const [erro, setErro] = useState(null); // Armazena mensagens de erro

  /**
   * 🎣 Função para buscar dados da API
   * 
   * Esta função demonstra:
   * - Uso de async/await para requisições HTTP
   * - Tratamento de erros com try/catch
   * - Gerenciamento de estados de loading
   * - Manipulação de respostas da API
   * 
   * @async
   * @function buscarDados
   * @returns {Promise<void>}
   */
  const buscarDados = async () => {
    try {
      // Faz a requisição para a Fake Store API
      const resposta = await fetch("https://fakestoreapi.com/products");
      
      // Verifica se a resposta foi bem sucedida
      if (!resposta.ok) {
        throw new Error("Erro ao carregar produtos");
      }

      // Processa os dados da resposta
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  // Efeito para carregar os produtos quando o componente montar
  useEffect(() => {
    buscarDados();
  }, []);

  // Renderização condicional baseada no estado
  if (carregando) {
    return (
      <div className="carregando" role="status">
        Carregando produtos...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="mensagem-erro" role="alert">
        {erro}
      </div>
    );
  }

  return (
    <div className="lista-produtos">
      <h3>Lista de Produtos</h3>
      <div className="grade-produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="card-produto">
            <img src={produto.image} alt={produto.title} />
            <h4>{produto.title}</h4>
            <p>R$ {produto.price}</p>
            <p>{produto.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscadorProdutos; 