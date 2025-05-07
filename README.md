Aplicativo de Cadastro e Gerenciamento de Livros

=========================================
Como iniciar o projeto
=========================================

Pré-requisitos:
---------------
- Ter o Node.js e o npm instalados.
- Ter o Expo CLI instalado globalmente:
  npm install -g expo-cli

Instale as dependências do projeto:
-----------------------------------
npm install
ou, se preferir:
yarn

Dependências principais:
-----------------------
- Expo
- React Native
- @react-navigation/native, @react-navigation/native-stack
- @reduxjs/toolkit, react-redux
- expo-image-picker

Caso alguma dessas não esteja instalada, rode:
----------------------------------------------
npm install @react-navigation/native @react-navigation/native-stack
npm install @reduxjs/toolkit react-redux
npm install expo-image-picker

Inicie o projeto via Expo:
--------------------------
expo start
O Expo irá abrir o projeto no navegador. Escaneie o QR Code com o celular ou use um emulador.

=========================================
Estrutura do Código
=========================================

components/
  LivroCard.js
screens/
  CadastroLivros.js
  Configuracoes.js
context/
  TemaContext.js
redux/
  livroSlice.js
  store.js
App.js

=========================================
Tecnologias e recursos utilizados
=========================================

React Hooks (useState, useEffect)
---------------------------------
- Utilizados em CadastroLivros.js para:
  * Gerenciar o estado dos campos do formulário de livros.
  * Gerenciar a lista de livros em memória.
  * (Opcional) Pode ser utilizado para efeitos colaterais, ex: carregar/salvar dados temporários.

Redux
-----
Arquivos:
  - redux/livroSlice.js (definição do slice/contador)
  - redux/store.js (criação do store)
Usado em CadastroLivros.js (com useDispatch e useSelector):
  * Para manter o contador global do total de livros cadastrados.
  * O valor aparece sempre atualizado no topo da tela.

Context API
-----------
Arquivo:
  - context/TemaContext.js
Usado em:
  * App.js (para disponibilizar o tema para todo o app)
  * CadastroLivros.js e Configuracoes.js (usando o custom hook useTema)
  * Permite alternar o tema claro/escuro em todas as telas do app via botão de configurações.

Componentização
---------------
- components/LivroCard.js: componente para exibir cada livro na lista de forma isolada, recebendo props para edição e exclusão.

Outras bibliotecas
------------------
- expo-image-picker: para selecionar a imagem da capa do livro usando a galeria do celular.

=========================================
Como cada recurso foi aplicado
=========================================

useState:
  - Gerencia campos do formulário (titulo, autor, genero, capa), a lista de livros e o estado de edição em CadastroLivros.js

useEffect:
  - (Opcional) Pode ser usado, por exemplo, para persistir livros. No exemplo, a lógica está somente em memória (como pedido).

Context API:
  - Cria o contexto do tema (TemaContext.js).
  - Fornece ao aplicativo todo um estado global para alternar entre tema claro e escuro.

Redux:
  - Gerencia o contador global de livros (total de livros cadastrados/excluídos).
  - Integrado na tela de cadastro com os hooks do Redux Toolkit.

=========================================
Observações Importantes
=========================================
- Para o campo capa, a imagem obrigatoriamente é selecionada da galeria do celular via botão (não há campo de URL manual).
- O ID único de cada livro é gerado automaticamente usando Date.now().
- O aplicativo não utiliza persistência real; ao fechar e reabrir, a lista zera (como especificado: persistência apenas “temporária em memória”).
