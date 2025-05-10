/**
 * ListaPokemon
 * Exibe uma lista paginada de Pokémon, com detalhes ao clicar.
 * Demonstra uso de hooks, fetch, paginação e modal.
 */
import React, { useState, useEffect } from 'react';

const ListaPokemon = () => {
  // Estados principais do componente
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [animacao, setAnimacao] = useState('');

  // Busca os pokémons da página atual
  useEffect(() => {
    async function buscarPokemons() {
      setCarregando(true);
      setErro(null);
      setAnimacao('fadeIn');
      try {
        const offset = pagina * 10;
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
        if (!resposta.ok) throw new Error('Erro ao buscar Pokémon');
        const dados = await resposta.json();
        // Busca detalhes de cada Pokémon individualmente
        const detalhes = await Promise.all(
          dados.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(detalhes);
      } catch (erro) {
        setErro(erro.message);
        setAnimacao('shake');
        setTimeout(() => setAnimacao(''), 500);
      } finally {
        setCarregando(false);
      }
    }
    buscarPokemons();
  }, [pagina]);

  // Abre o modal com detalhes do Pokémon
  function abrirModal(pokemon) {
    setPokemonSelecionado(pokemon);
    setAnimacao('fadeIn');
  }

  // Paginação
  function proximaPagina() {
    setPagina(pagina + 1);
    setAnimacao('slideUp');
  }
  function paginaAnterior() {
    if (pagina > 0) {
      setPagina(pagina - 1);
      setAnimacao('slideUp');
    }
  }

  return (
    <div className="lista-pokemon">
      {erro && (
        <div className={`mensagem-erro ${animacao}`}>{erro}</div>
      )}

      {carregando ? (
        <div className="carregando">
          <div className="spinner"></div>
          Carregando Pokémon...
        </div>
      ) : (
        <>
          <div className="grade-pokemon">
            {pokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className={`card-pokemon ${animacao}`}
                onClick={() => abrirModal(pokemon)}
                title="Clique para ver detalhes"
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ width: '120px', height: '120px' }}
                />
                <h4>{pokemon.name}</h4>
                <div className="tipos-pokemon">
                  {pokemon.types.map((tipo) => (
                    <span key={tipo.type.name} className={`tipo-${tipo.type.name}`}>
                      {tipo.type.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="controles-paginacao">
            <button
              onClick={paginaAnterior}
              disabled={pagina === 0}
              className="botao-paginacao"
            >
              Anterior
            </button>
            <span className="numero-pagina">Página {pagina + 1}</span>
            <button
              onClick={proximaPagina}
              className="botao-paginacao"
            >
              Próxima
            </button>
          </div>
        </>
      )}

      {/* Modal de detalhes do Pokémon */}
      {pokemonSelecionado && (
        <div className={`modal-pokemon ${animacao}`}>
          <div className="conteudo-modal">
            <button
              className="fechar-modal"
              onClick={() => setPokemonSelecionado(null)}
              title="Fechar"
            >
              ×
            </button>
            <h3>{pokemonSelecionado.name}</h3>
            <img
              src={pokemonSelecionado.sprites.front_default}
              alt={pokemonSelecionado.name}
              style={{ width: '200px', height: '200px' }}
            />
            <div className="detalhes-pokemon">
              <p><strong>Altura:</strong> {pokemonSelecionado.height / 10}m</p>
              <p><strong>Peso:</strong> {pokemonSelecionado.weight / 10}kg</p>
              <p><strong>Tipos:</strong> {pokemonSelecionado.types.map(t => t.type.name).join(', ')}</p>
              <p><strong>Habilidades:</strong> {pokemonSelecionado.abilities.map(a => a.ability.name).join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPokemon; 