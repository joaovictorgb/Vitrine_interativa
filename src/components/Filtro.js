/**
 * Filtro
 * Permite filtrar uma lista de itens de forma flexível usando Render Props.
 * Demonstra uso de hooks, useMemo e renderização condicional.
 */
import React, { useState, useMemo } from 'react';

/**
 * Componente de filtro que demonstra:
 * - Padrão Render Props
 * - Uso de hooks (useState, useMemo)
 * - Filtragem de dados
 * - Feedback visual
 * - Animações
 * 
 * @example
 * <Filtro items={tarefas}>
 *   {({ itemsFiltrados, filtro, setFiltro }) => (
 *     <div>
 *       <input value={filtro} onChange={e => setFiltro(e.target.value)} />
 *       <ul>{itemsFiltrados.map(item => <li key={item.id}>{item.texto}</li>)}</ul>
 *     </div>
 *   )}
 * </Filtro>
 */
const Filtro = ({ items = [], children }) => {
  // Estado do filtro e animação
  const [filtro, setFiltro] = useState('');
  const [animacao, setAnimacao] = useState('');

  // Filtra os itens conforme o texto digitado
  const itemsFiltrados = useMemo(() => {
    setAnimacao('fadeIn');
    return items.filter(item =>
      item.texto.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [items, filtro]);

  // Estatísticas úteis para o usuário
  const totalItems = items.length;
  const itemsFiltradosCount = itemsFiltrados.length;
  const isEmpty = itemsFiltrados.length === 0;
  const isFiltered = filtro !== '';

  // Atualiza o filtro
  function handleFiltroChange(e) {
    setFiltro(e.target.value);
    setAnimacao('fadeIn');
  }

  // Limpa o filtro
  function handleLimparFiltro() {
    setFiltro('');
    setAnimacao('fadeIn');
  }

  // Props passadas para o render prop
  const filterProps = {
    itemsFiltrados,
    filtro,
    setFiltro: handleFiltroChange,
    totalItems,
    itemsFiltradosCount,
    isEmpty,
    isFiltered,
    onLimparFiltro: handleLimparFiltro,
    animacao
  };

  return (
    <div className="filtro-container">
      <div className="controles-filtro">
        <input
          type="text"
          value={filtro}
          onChange={handleFiltroChange}
          placeholder="Filtrar itens..."
          className={`input-filtro ${animacao}`}
        />
        {isFiltered && (
          <button
            onClick={handleLimparFiltro}
            className="botao-limpar"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="estatisticas-filtro">
        <span className="total-items">
          Total: {totalItems} {totalItems === 1 ? 'item' : 'itens'}
        </span>
        {isFiltered && (
          <span className="items-filtrados">
            Mostrando: {itemsFiltradosCount} {itemsFiltradosCount === 1 ? 'item' : 'itens'}
          </span>
        )}
      </div>

      {/* Mensagem caso nenhum item seja encontrado */}
      {isEmpty && isFiltered && (
        <div className={`mensagem-sem-resultados ${animacao}`}>
          Nenhum item encontrado para "{filtro}"
        </div>
      )}

      {children(filterProps)}
    </div>
  );
};

export default Filtro; 