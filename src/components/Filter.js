import React, { useState, useMemo } from "react";

/**
 * 🔍 Componente Filtro
 * 
 * Este componente é um exemplo prático do padrão Render Props em React.
 * Ele implementa um filtro reutilizável que pode ser usado com qualquer
 * tipo de lista de itens.
 * 
 * 📚 Conceitos Demonstrados:
 * - Padrão Render Props
 * - useMemo para otimização de performance
 * - Composição de componentes
 * - Props drilling
 * - Gerenciamento de estado
 * 
 * 🎯 Objetivos de Aprendizado:
 * 1. Entender o padrão Render Props
 * 2. Aprender a criar componentes reutilizáveis
 * 3. Implementar filtros eficientes
 * 4. Otimizar performance com useMemo
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.items - Lista de itens a serem filtrados
 * @param {Function} props.children - Função de renderização que recebe os dados filtrados
 * 
 * @example
 * // Como usar o componente
 * const tarefas = [
 *   { id: 1, texto: "Estudar React" },
 *   { id: 2, texto: "Fazer exercícios" }
 * ];
 * 
 * <Filtro items={tarefas}>
 *   {({ itensFiltrados, filtro, setFiltro }) => (
 *     <div>
 *       <input 
 *         value={filtro} 
 *         onChange={e => setFiltro(e.target.value)}
 *         placeholder="Filtrar tarefas..."
 *       />
 *       <ul>
 *         {itensFiltrados.map(item => (
 *           <li key={item.id}>{item.texto}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   )}
 * </Filtro>
 */
function Filtro({ items = [], children }) {
  // Estado para o texto do filtro
  const [filtro, setFiltro] = useState("");

  /**
   * Memoiza a lista filtrada para evitar recálculos desnecessários
   * quando o componente re-renderizar
   */
  const itensFiltrados = useMemo(() => {
    // Verifica se items é um array válido
    if (!Array.isArray(items)) {
      console.warn("A prop 'items' deve ser um array");
      return [];
    }

    return items.filter((item) =>
      item.texto.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [items, filtro]);

  // Propriedades passadas para a função de renderização
  const propsFiltro = {
    itensFiltrados, // Lista filtrada
    filtro, // Texto atual do filtro
    setFiltro, // Função para atualizar o filtro
    totalTarefas: items.length, // Total de itens
    quantidadeFiltrada: itensFiltrados.length, // Quantidade de itens filtrados
    estaVazio: itensFiltrados.length === 0, // Se a lista filtrada está vazia
    estaFiltrado: filtro !== "", // Se há algum filtro aplicado
  };

  // Renderiza o conteúdo usando a função children (Render Props)
  return children(propsFiltro);
}

export default Filtro; 