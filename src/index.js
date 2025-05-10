// Importando as dependências necessárias
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Importando os estilos globais
import './styles.css';

// Criando a raiz da aplicação React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizando a aplicação dentro do StrictMode para desenvolvimento
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 