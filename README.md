# project_store


### Introdução:

O objetivo deste projeto é criar uma loja online que permita aos utilizadores pesquisar produtos, visualizar detalhes, adicionar itens ao carrinho e gerir o seu histórico de pesquisas.

### Descrição do Problema/Domínio de Aplicação:

O domínio de aplicação deste projeto é o e-commerce, que envolve a compra e venda de produtos pela internet. O problema abordado é fornecer uma interface amigável e funcional para os utilizadores realizarem compras online, facilitando a navegação entre produtos, a adição ao carrinho e a gestão do histórico de pesquisas.

### Descrição da Solução:

Navegar e pesquisar produtos.
Visualizar detalhes dos produtos.
Adicionar produtos ao carrinho de compras.
Gerir o carrinho, incluindo a remoção de itens.
Visualizar o histórico de pesquisas.
A aplicação utiliza Vue.js como framework front-end e Firebase para autenticação. Os produtos são obtidos da API Fake Store API. O carrinho de compras e o histórico de pesquisas são armazenados no localStorage.

### Modelo da Base de Dados:

A aplicação não utiliza uma base de dados tradicional. Em vez disso, os dados são geridos da seguinte forma:

Produtos: Obtidos da Fake Store API.
Carrinho de Compras: Armazenado no localStorage do navegador.
Histórico de Pesquisas: Armazenado no localStorage do navegador.
Autenticação: Gerida pelo Firebase Authentication.
Arquitetura de Desenvolvimento
A arquitetura de desenvolvimento da aplicação segue o padrão de componentes do Vue.js:

Componentes Vue: Utilizados para criar a interface de utilizador, dividindo a aplicação em componentes reutilizáveis.
Roteamento: Gerido pelo vue-router para navegar entre as diferentes páginas da aplicação.
Estado Global: Utilizado parcialmente com Vuex para gerir o estado da aplicação.
Estilos: Utilizados estilos scoped para manter o CSS modularizado.

## Estrutura do Projeto;
src/

├── assets/         # Arquivos estáticos como imagens e estilos globais

├── components/     # Componentes Vue reutilizáveis

├── views/          # Componentes Vue para cada página

├── router/         # Configuração das rotas

├── store/          # Configuração do Vuex (se necessário)

├── App.vue         # Componente raiz da aplicação

├── main.js         # Arquivo principal para inicializar a aplicação

└── firebase.js     # Configuração do Firebase

### Metodologia Utilizada:
A metodologia utilizada no desenvolvimento da aplicação inclui:

Desenvolvimento Iterativo: A aplicação foi desenvolvida de forma iterativa, adicionando funcionalidades incrementais e testando a cada etapa.
Controlo de Versão: Utilização do Git para controlo de versão e colaboração.
Boas Práticas de Desenvolvimento: Seguindo as boas práticas de desenvolvimento, como modularização do código, uso de componentes reutilizáveis, e estilização consistente.

## Conclusão
project_store é uma aplicação de e-commerce completa que oferece uma experiência de compra online intuitiva e funcional. Com a utilização de Vue.js, Firebase e a Fake Store API, a aplicação demonstra como criar uma interface de utilizador moderna e eficiente para comércio eletrónico.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
