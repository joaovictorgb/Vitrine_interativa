import React, { useEffect, useState } from "react";

/**
 * 🎮 Componente ListaPokemon
 * 
 * Este componente é um exemplo prático de como consumir a PokéAPI para exibir
 * uma lista de Pokémon. É perfeito para aprender:
 * 
 * 📚 Conceitos Demonstrados:
 * - useEffect para requisições HTTP
 * - Estados para gerenciar dados e loading
 * - Tratamento de erros
 * - Renderização condicional
 * - Mapeamento de arrays para renderizar listas
 * 
 * 🎯 Objetivos de Aprendizado:
 * 1. Entender o ciclo de vida de componentes com useEffect
 * 2. Aprender a fazer requisições HTTP em React
 * 3. Implementar tratamento de erros e loading states
 * 4. Criar interfaces responsivas com grid
 * 
 * @example
 * // Como usar o componente
 * <ListaPokemon />
 * 
 * // Exemplo de resultado
 * {
 *   results: [
 *     { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
 *     { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" }
 *   ]
 * }
 */
function ListaPokemon() {
  // Estados para gerenciar dados e UI
  const [pokemons, setPokemons] = useState([]); // Lista de Pokémon da API
  const [carregando, setCarregando] = useState(true); // Controla o estado de loading
  const [erro, setErro] = useState(null); // Armazena mensagens de erro

  /**
   * 🎣 Função para buscar dados da PokéAPI
   * 
   * Esta função demonstra:
   * - Uso de async/await para requisições HTTP
   * - Tratamento de erros com try/catch
   * - Gerenciamento de estados de loading
   * - Manipulação de respostas da API
   * 
   * @async
   * @function buscarPokemons
   * @returns {Promise<void>}
   */
  const buscarPokemons = async () => {
    try {
      // Faz a requisição para a PokéAPI
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
      
      // Verifica se a resposta foi bem sucedida
      if (!resposta.ok) {
        throw new Error("Erro ao carregar Pokémon");
      }

      // Processa os dados da resposta
      const dados = await resposta.json();
      setPokemons(dados.results);
    } catch (erro) {
      console.error("Erro ao buscar Pokémon:", erro);
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  // Efeito para carregar os Pokémon quando o componente montar
  useEffect(() => {
    buscarPokemons();
  }, []);

  // Renderização condicional baseada no estado
  if (carregando) {
    return (
      <div className="carregando" role="status">
        Carregando lista de Pokémon...
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
    <div className="lista-pokemon">
      <h3>Lista de Pokémon</h3>
      <div className="grade-pokemon">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="card-pokemon">
            <h4>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h4>
            <p>URL: {pokemon.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPokemon; 