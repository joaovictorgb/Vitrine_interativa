import React from "react";
import BuscaPais from "./components/BuscaPais";
import ListaPokemon from "./components/ListaPokemon";
import comLogging from "./components/comLogging";
import Filtro from "./components/Filtro";
import BuscadorProdutos from "./components/BuscadorProdutos";
import "./styles.css";

/**
 * 🎨 Componente App
 * 
 * Este é o componente principal da aplicação que demonstra
 * diferentes padrões e conceitos do React.
 * 
 * 📚 Componentes Demonstrados:
 * - BuscaPais: Demonstra requisições HTTP e estados
 * - ListaPokemon: Demonstra useEffect e listas
 * - MeuComponenteComLog: Demonstra HOC
 * - Filtro: Demonstra Render Props
 * - BuscadorProdutos: Demonstra fetch e grid
 */
const App = () => {
  const tarefas = [
    { id: 1, texto: "Estudar React" },
    { id: 2, texto: "Praticar Hooks" },
    { id: 3, texto: "Criar componentes" },
    { id: 4, texto: "Implementar estilos" },
    { id: 5, texto: "Testar aplicação" }
  ];

  const MeuComponenteComLog = comLogging(() => (
    <div className="componente-log">
      <h3>Componente com Logging</h3>
      <p>Este componente foi montado e desmontado com sucesso!</p>
    </div>
  ));

  return (
    <div className="app">
      <header className="cabecalho">
        <h1>Demonstração de Componentes React</h1>
        <p>Exemplos interativos de diferentes padrões e conceitos</p>
      </header>

      <main className="conteudo">
        <section className="secao">
          <h2>Busca de Países</h2>
          <p>Demonstração de requisições assíncronas e tratamento de erros</p>
          <BuscaPais />
        </section>

        <section className="secao">
          <h2>Lista de Pokémon</h2>
          <p>Demonstração de paginação e exibição de dados em grade</p>
          <ListaPokemon />
        </section>

        <section className="secao">
          <h2>Higher Order Component</h2>
          <p>Demonstração do padrão HOC com logging</p>
          <MeuComponenteComLog />
        </section>

        <section className="secao">
          <h2>Render Props</h2>
          <p>Demonstração do padrão Render Props com filtro</p>
          <Filtro items={tarefas}>
            {({ itemsFiltrados, filtro, setFiltro, totalItems, itemsFiltradosCount, isEmpty, isFiltered, onLimparFiltro, animacao }) => (
              <div>
                <ul className="lista-tarefas">
                  {itemsFiltrados.map(item => (
                    <li key={item.id} className={`item-tarefa ${animacao}`}>
                      {item.texto}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Filtro>
        </section>

        <section className="secao">
          <h2>Lista de Produtos</h2>
          <p>Demonstração de exibição de produtos com detalhes</p>
          <BuscadorProdutos />
        </section>
      </main>
    </div>
  );
};

export default App; 