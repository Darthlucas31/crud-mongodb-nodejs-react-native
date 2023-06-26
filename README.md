# crud-mongodb-nodejs-react-native
BACK-END:
A aplicação é um sistema de gerenciamento de doações que utiliza o Node.js como plataforma de desenvolvimento, o framework Express.js para criação do servidor web, o banco de dados MongoDB para armazenamento dos dados das doações e as bibliotecas mongoose e cors.

O código inicia criando uma instância do Express.js e configurando o uso do middleware express.json() para facilitar o parsing dos dados JSON nas requisições. Em seguida, é estabelecida a conexão com o banco de dados MongoDB utilizando a biblioteca mongoose.

A aplicação possui os seguintes endpoints:

Rota GET /:

Retorna uma resposta simples "hi" para verificar se o servidor está respondendo corretamente.
Rota POST /doacoes:

Recebe os dados da doação no corpo da requisição e cria um novo documento no banco de dados utilizando o modelo Doacao definido pelo schema.
Retorna o documento da doação recém-criada com o status HTTP 201 se a operação for bem-sucedida, ou retorna um erro 500 em caso de falha.
Rota GET /doacoes:

Recupera todas as doações cadastradas no banco de dados e retorna como resposta no formato JSON.
Retorna um array de objetos contendo os dados das doações existentes no banco de dados.
Em caso de erro, retorna um erro 500.
Rota PUT /doacoes/:id:

Atualiza os dados de uma doação específica com base no ID fornecido nos parâmetros da URL.
Recebe os novos dados da doação no corpo da requisição e utiliza o método findByIdAndUpdate() do mongoose para encontrar e atualizar a doação no banco de dados.
Retorna o documento da doação atualizada com o status HTTP 200 se a operação for bem-sucedida, ou retorna um erro 500 em caso de falha.
Rota DELETE /doacoes/:id:

Deleta uma doação específica com base no ID fornecido nos parâmetros da URL.
Utiliza o método findByIdAndDelete() do mongoose para encontrar e remover a doação no banco de dados.
Retorna o status HTTP 204 (No Content) se a operação for bem-sucedida, ou retorna um erro 500 em caso de falha.
O servidor é iniciado na porta 3000 e exibe uma mensagem no console indicando que o servidor está em execução.

FRONT:
A aplicação front-end foi desenvolvida utilizando a biblioteca React Native. Ela consiste em duas telas: a tela de criação de doação (Criar) e a tela de visualização de doações (VerDoacoes). A navegação entre as telas é gerenciada pelo pacote @react-navigation/native e @react-navigation/stack.

Tela Criar (Criar.js):

A tela de criação de doação permite ao usuário preencher os campos de nome, CPF e item.
Ao clicar no botão "Cadastrar", os dados da doação são enviados para o back-end através de uma requisição POST para a rota /doacoes.
Em caso de sucesso, exibe uma mensagem de sucesso e limpa os campos de entrada.
Em caso de erro, exibe uma mensagem de erro.
Tela VerDoacoes (VerDoacoes.js):

A tela de visualização de doações exibe todas as doações cadastradas no back-end.
Ao carregar a tela, é feita uma requisição GET para a rota /doacoes para buscar as doações do servidor.
As doações são exibidas em uma lista, onde cada item da lista mostra o ID, nome, CPF e item da doação.
Cada item da lista possui botões para atualizar ou excluir a doação.
Ao clicar no botão "Atualizar", os campos de nome, CPF e item são habilitados para edição.
Ao clicar no botão "Salvar", os dados atualizados são enviados para o back-end através de uma requisição PUT para a rota /doacoes/:id.
Ao clicar no botão "Excluir", a doação é removida do back-end através de uma requisição DELETE para a rota /doacoes/:id.
Essa é uma visão geral do front-end da aplicação. Ele consome o back-end, realiza requisições HTTP para criar, listar, atualizar e excluir doações, exibindo mensagens de sucesso ou erro conforme necessário.
