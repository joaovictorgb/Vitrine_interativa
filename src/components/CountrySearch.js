import React, { useState } from "react";

/**
 * 🗺️ Componente BuscaPais
 * 
 * Este componente é um exemplo prático de como criar uma interface de busca de países
 * usando a API Rest Countries. É perfeito para aprender:
 * 
 * 📚 Conceitos Demonstrados:
 * - Gerenciamento de estado com useState
 * - Requisições HTTP assíncronas com fetch
 * - Tratamento de erros e loading states
 * - Manipulação de eventos (onChange, onKeyPress)
 * - Renderização condicional
 * - Feedback visual para o usuário
 * 
 * 🎯 Objetivos de Aprendizado:
 * 1. Entender como fazer requisições HTTP em React
 * 2. Aprender a gerenciar múltiplos estados
 * 3. Implementar tratamento de erros
 * 4. Criar interfaces responsivas e amigáveis
 * 
 * @example
 * // Como usar o componente
 * <BuscaPais />
 * 
 * // Exemplo de resultado
 * {
 *   name: { common: "Brasil" },
 *   capital: ["Brasília"],
 *   population: 212559417,
 *   region: "Americas",
 *   languages: { por: "Português" }
 * }
 */
function BuscaPais() {
  // Estados para gerenciar o formulário e dados
  const [pais, setPais] = useState(""); // Nome do país digitado pelo usuário
  const [dadosPais, setDadosPais] = useState(null); // Dados retornados da API
  const [carregando, setCarregando] = useState(false); // Controla o estado de loading
  const [erro, setErro] = useState(null); // Armazena mensagens de erro

  /**
   * 🔍 Função para buscar dados do país na API
   * 
   * Esta função demonstra:
   * - Uso de async/await para requisições HTTP
   * - Tratamento de erros com try/catch
   * - Validação de dados
   * - Gerenciamento de estados de loading
   * 
   * @async
   * @function buscarPais
   * @returns {Promise<void>}
   */
  const buscarPais = async () => {
    // Validação básica do input
    if (!pais.trim()) {
      setErro("Por favor, digite o nome de um país");
      return;
    }

    // Reset dos estados antes da nova busca
    setCarregando(true);
    setErro(null);
    setDadosPais(null);

    try {
      // Faz a requisição para a API
      const resposta = await fetch(`https://restcountries.com/v3.1/name/${pais}`);
      
      // Verifica se a resposta foi bem sucedida
      if (!resposta.ok) {
        throw new Error("País não encontrado");
      }

      // Processa os dados da resposta
      const dados = await resposta.json();
      console.log("Dados do país:", dados);
      setDadosPais(dados[0]);
    } catch (erro) {
      console.error("Erro ao buscar país:", erro);
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  /**
   * ⌨️ Função para lidar com a tecla Enter no input
   * 
   * Permite buscar o país pressionando Enter
   * 
   * @param {KeyboardEvent} evento - Evento do teclado
   */
  const lidarComTecla = (evento) => {
    if (evento.key === 'Enter') {
      buscarPais();
    }
  };

  return (
    <div className="busca-pais">
      {/* Formulário de busca */}
      <div className="container-busca">
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          onKeyPress={lidarComTecla}
          placeholder="Digite o nome do país"
          aria-label="Nome do país"
        />
        <button 
          onClick={buscarPais} 
          disabled={carregando}
          aria-label="Buscar país"
        >
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Mensagens de feedback */}
      {erro && (
        <div className="mensagem-erro" role="alert">
          {erro}
        </div>
      )}
      
      {carregando && (
        <div className="carregando" role="status">
          Carregando informações do país...
        </div>
      )}
      
      {/* Exibição dos dados do país */}
      {dadosPais && (
        <div className="card-pais">
          <h3>{dadosPais.name.common}</h3>
          <div className="info-pais">
            <p><strong>Capital:</strong> {dadosPais.capital}</p>
            <p><strong>População:</strong> {dadosPais.population.toLocaleString()}</p>
            <p><strong>Região:</strong> {dadosPais.region}</p>
            <p><strong>Sub-região:</strong> {dadosPais.subregion}</p>
            <p><strong>Idiomas:</strong> {Object.values(dadosPais.languages).join(", ")}</p>
          </div>
          {dadosPais.flags && (
            <div className="bandeira-pais">
              <img 
                src={dadosPais.flags.png} 
                alt={`Bandeira de ${dadosPais.name.common}`}
                style={{ maxWidth: '200px', marginTop: '1rem' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BuscaPais; 