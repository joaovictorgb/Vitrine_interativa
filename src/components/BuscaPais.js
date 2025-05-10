/**
 * BuscaPais
 * Permite buscar informações de um país pelo nome, mostrando dados relevantes.
 * Demonstra uso de hooks, fetch, tratamento de erro e feedback visual.
 */
import React, { useState } from 'react';

const BuscaPais = () => {
  // Estados principais
  const [pais, setPais] = useState('');
  const [dadosPais, setDadosPais] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [animacao, setAnimacao] = useState('');

  // Faz a busca do país na API
  async function buscarPais() {
    if (!pais.trim()) {
      setErro('Por favor, digite o nome de um país');
      setAnimacao('shake');
      setTimeout(() => setAnimacao(''), 500);
      return;
    }
    setCarregando(true);
    setErro(null);
    setAnimacao('fadeIn');
    try {
      const resposta = await fetch(`https://restcountries.com/v3.1/name/${pais}`);
      if (!resposta.ok) throw new Error('País não encontrado');
      const dados = await resposta.json();
      setDadosPais(dados[0]);
    } catch (erro) {
      setErro(erro.message);
      setAnimacao('shake');
      setTimeout(() => setAnimacao(''), 500);
    } finally {
      setCarregando(false);
    }
  }

  // Permite buscar ao pressionar Enter
  function aoPressionarEnter(e) {
    if (e.key === 'Enter') buscarPais();
  }

  return (
    <div className="busca-pais">
      <div className="container-busca">
        <input
          type="text"
          value={pais}
          onChange={e => setPais(e.target.value)}
          onKeyPress={aoPressionarEnter}
          placeholder="Digite o nome de um país..."
          disabled={carregando}
        />
        <button 
          onClick={buscarPais} 
          disabled={carregando}
          className={carregando ? 'carregando' : ''}
        >
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {erro && (
        <div className={`mensagem-erro ${animacao}`}>{erro}</div>
      )}

      {carregando && (
        <div className="carregando">
          <div className="spinner"></div>
          Buscando informações do país...
        </div>
      )}

      {/* Exibe os dados do país, se houver */}
      {dadosPais && !carregando && (
        <div className={`card-pais ${animacao}`}>
          <h3>{dadosPais.name.common}</h3>
          <div className="info-pais">
            <p><strong>Capital:</strong> {dadosPais.capital?.[0] || 'Não informada'}</p>
            <p><strong>População:</strong> {dadosPais.population.toLocaleString()} habitantes</p>
            <p><strong>Região:</strong> {dadosPais.region}</p>
            <p><strong>Idiomas:</strong> {Object.values(dadosPais.languages || {}).join(', ')}</p>
            {dadosPais.flags?.png && (
              <img 
                src={dadosPais.flags.png} 
                alt={`Bandeira de ${dadosPais.name.common}`}
                style={{ maxWidth: '200px', marginTop: '1rem' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscaPais; 