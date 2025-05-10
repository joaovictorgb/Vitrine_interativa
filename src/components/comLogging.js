import React, { useEffect } from "react";

/**
 * 🔍 HOC (Higher Order Component) comLogging
 * 
 * Este HOC é um exemplo prático de como criar um componente de ordem superior
 * que adiciona funcionalidade de logging ao ciclo de vida de outros componentes.
 * 
 * 📚 Conceitos Demonstrados:
 * - Higher Order Components (HOC)
 * - Composição de componentes
 * - useEffect para ciclo de vida
 * - Props spreading
 * - Naming conventions
 * 
 * 🎯 Objetivos de Aprendizado:
 * 1. Entender o conceito de HOC em React
 * 2. Aprender a criar componentes reutilizáveis
 * 3. Implementar logging para debugging
 * 4. Compreender o ciclo de vida de componentes
 * 
 * @param {React.ComponentType} Componente - O componente a ser envolvido
 * @returns {React.ComponentType} Um novo componente com funcionalidade de logging
 * 
 * @example
 * // Como usar o HOC
 * const MeuComponenteComLog = comLogging(MeuComponente);
 * 
 * // O componente agora terá logs automáticos
 * <MeuComponenteComLog />
 * 
 * // Saída no console:
 * // "Componente MeuComponente montado"
 * // "Componente MeuComponente desmontado"
 */
function comLogging(Componente) {
  // Nome para identificação nos logs
  const nomeExibicao = Componente.displayName || Componente.name || "Componente";

  /**
   * Componente que envolve o componente original
   * e adiciona funcionalidade de logging
   */
  function ComponenteComLog(props) {
    useEffect(() => {
      // Log quando o componente é montado
      console.log(`Componente ${nomeExibicao} montado`);
      
      // Função de limpeza para logar quando o componente é desmontado
      return () => {
        console.log(`Componente ${nomeExibicao} desmontado`);
      };
    }, []);

    // Renderiza o componente original com suas props
    return <Componente {...props} />;
  }

  // Define o nome de exibição para melhor debugging
  ComponenteComLog.displayName = `ComLogging(${nomeExibicao})`;

  return ComponenteComLog;
}

export default comLogging; 