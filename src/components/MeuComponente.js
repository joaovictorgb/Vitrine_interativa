import React from "react";
import withLogging from "./withLogging";

/**
 * Componente MeuComponente
 * Componente de exemplo que demonstra o uso do HOC withLogging
 */
function MeuComponente() {
  return (
    <div className="logging-component">
      <h3>Meu Componente com Logging</h3>
      <p>Este componente tem um log quando é montado e desmontado!</p>
      <div className="component-info">
        <p>Você pode verificar os logs no console do navegador:</p>
        <ul>
          <li>Quando o componente é montado</li>
          <li>Quando o componente é desmontado</li>
        </ul>
      </div>
    </div>
  );
}

// Exporta o componente envolvido pelo HOC withLogging
export default withLogging(MeuComponente); 