# 🚀 Demonstração de Componentes React

Este projeto é uma vitrine interativa de padrões modernos do React, com exemplos práticos, código limpo e design responsivo. Ideal para quem quer aprender, ensinar ou se inspirar em boas práticas!

## ✨ O que você encontra aqui?
- **Busca de Países:** Consome a API Rest Countries e exibe informações detalhadas.
- **Lista de Pokémon:** Paginação, modal de detalhes e tags de tipo estilizadas usando a PokéAPI.
- **Filtro com Render Props:** Demonstra filtragem flexível e renderização dinâmica.
- **Lista de Produtos:** Consome a Fake Store API, mostra produtos em grid e detalhes em modal.
- **Higher Order Component (HOC):** Exemplo de HOC que faz logging no console ao montar/desmontar componentes.

## 🧩 Principais conceitos React abordados
- Hooks (`useState`, `useEffect`, `useMemo`)
- Padrão Render Props
- Higher Order Components (HOC)
- Consumo de APIs com `fetch`
- Tratamento de erros e loading
- Componentização e reutilização
- CSS moderno e responsivo

## 📸 Visual
- Interface moderna, responsiva e agradável
- Animações suaves e feedback visual
- Tags de tipo de Pokémon coloridas e interativas
- Modais para detalhes de Pokémon e produtos

## 🚦 Como rodar o projeto
1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd <nome-da-pasta>
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
4. Acesse em [http://localhost:3000](http://localhost:3000)

## 🗂️ Estrutura dos principais componentes

- `src/components/BuscaPais.js` — Busca e exibe dados de países.
- `src/components/ListaPokemon.js` — Lista paginada de Pokémon, com modal de detalhes.
- `src/components/Filtro.js` — Componente de filtro usando Render Props.
- `src/components/BuscadorProdutos.js` — Lista produtos em grid, com modal de detalhes.
- `src/components/comLogging.js` — HOC para logging no console.
- `src/App.js` — Integra todos os exemplos.
- `src/styles.css` — Estilos modernos e responsivos.

## 📝 Exemplos de uso

### Busca de Países
```jsx
<BuscaPais />
```

### Lista de Pokémon
```jsx
<ListaPokemon />
```

### Filtro com Render Props
```jsx
<Filtro items={tarefas}>
  {({ itemsFiltrados }) => (
    <ul>
      {itemsFiltrados.map(item => <li key={item.id}>{item.texto}</li>)}
    </ul>
  )}
</Filtro>
```

### HOC de Logging
```jsx
const MeuComponenteComLog = comLogging(() => <div>Olá!</div>);
```

## 💡 Dicas para desenvolvedores
- O código está todo comentado nos pontos-chave, facilitando o entendimento.
- Os nomes das variáveis e funções são autoexplicativos e em português.
- Os componentes são independentes e podem ser reutilizados em outros projetos.
- Para ver o efeito do HOC, abra o console do navegador.

## 🤝 Contribuição
Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar PRs!

---

Feito com 💙 por joaovictorgb. 