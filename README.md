# Todo List Site

![image](https://github.com/edmilsonmedeiross/Tarefator-App/assets/110620775/fe8a4e50-7962-4dc7-9162-b37d7de8db30)

## Visão Geral

Este é um projeto de um site de Todo List criado com Next.js. O objetivo principal deste site é permitir que os usuários criem, visualizem e gerenciem suas tarefas. As tarefas são armazenadas em um banco de dados para persistência. O projeto inclui um sistema de autenticação para garantir que apenas usuários autorizados possam acessar suas listas de tarefas. Além disso, há um sistema de doações integrado com PayPal para que os usuários possam contribuir com o desenvolvimento do site.

## Funcionalidades

- **Criação de Tarefas**: Permite aos usuários criar novas tarefas com título e descrição.
- **Visualização de Tarefas**: Os usuários podem visualizar suas tarefas em uma lista.
- **Edição de Tarefas**: Possibilidade de editar o título e a descrição das tarefas.
- **Remoção de Tarefas**: Os usuários podem remover tarefas da lista.
- **Autenticação**: Sistema de login e registro de usuários utilizando Next Auth.
- **Doações**: Integração com PayPal para doações.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Next Auth**: Biblioteca para gerenciamento de autenticação.
- **PayPal**: Sistema de pagamento para doações.

## Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Passo a Passo

1. **Clone o repositório**

    ```bash
    git clone https://github.com/usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2. **Instale as dependências**

    Usando NPM:

    ```bash
    npm install
    ```

    Ou usando Yarn:

    ```bash
    yarn install
    ```

3. **Execute o projeto**

    Usando NPM:

    ```bash
    npm run dev
    ```

    Ou usando Yarn:

    ```bash
    yarn dev
    ```

    O projeto estará disponível em `http://localhost:3000`.

## Uso

### Autenticação

- Acesse a página de login para entrar ou registrar uma nova conta.
- Após a autenticação, você será redirecionado para a página principal onde poderá gerenciar suas tarefas.

### Gerenciamento de Tarefas

- **Adicionar Tarefa**: Use o formulário para adicionar novas tarefas.
- **Editar Tarefa**: Clique na tarefa que deseja editar.
- **Remover Tarefa**: Clique no botão de remover ao lado da tarefa que deseja deletar.

### Doações

- Acesse a página de doações e siga as instruções para contribuir via PayPal.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso:

1. Fork o repositório
2. Crie uma nova branch (`git checkout -b feature/nome-da-feature`)
3. Faça suas alterações e commit (`git commit -am 'Adicionar nova feature'`)
4. Envie para o branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Espero que este projeto seja útil e que você aproveite ao máximo. Se tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue no GitHub.

Boas Tarefas!

