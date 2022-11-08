# **Vendinha**

## **Informações**
*Api desenvolvida com C# .Net 6 utilizando o entity framwork para mapear as entidades e gerar as migrações*
*FrontEnd foi desenvolvido com HTML 5, CSS, Bootstrap e JavaScript*
*Foi utilizado o Xampp como servidor e o MySql para o banco (MariaDB)*
*Sendo necessario ter o .Net 6 instalado na maquina, Xampp com o servidor e MySql em modo start para rodar o projeto*

### **Rodando projeto backend**

Para executar o projeto, abra o terminal e execute os comandos a seguir:

* *Abra a pasta do projeto backend*

    cd .\Vendinha\Backend
    

* *Abra o terminal no diretório mencionado e execulte o comando*

    dotnet run
    

    
* *A aplicação devera estar rodando no endereço:*

    https://localhost:7049
 


### **Rodando projeto frontend**

* *Abra a pasta do projeto frontend*

    cd .\Vendinha\Frontend


* *Abra o terminal no diretório mencionado e execulte o comando*

    python -m http.server

* *A aplicação devera estar rodando no endereço:*

    http://localhost:8000/index.html

## **Cenário**

Uma vendinha precisa informatizar o controle de contas de seus clientes (dívidas penduradas) para facilitar a busca e o cadastro desses dados que antes eram feitas por papel. O cliente chega na loja, faz a compra e pede para o atendente pendurar para que seja acertado no final do mês.
Pensando nisso, é necessário criar um sistema simples de cadastro para que o dono da venda consiga controlar as dívidas de seus clientes.

### **Requisitos**

• O sistema deve permitir o cadastro, recuperação, atualização e exclusão de clientes '
• Os dados necessários para se criar a conta são: o Nome completo *
o CPF *: deve ser um número válido de CPF
o Data de Nascimento *
• Idade: deve ser sempre calculada com base na data de nascimento
o roto: uma URL contendo um endereço para uma toto de identificação do cliente
• Dívidas: lista de compras pendentes de pagamento
    • Descrição da compra*
    Valor da compra*
    • Data da compra
    o Valor total da dívida: deve ser sempre calculado com base na soma das dívidas 
• Telefone: número de telefone para contato

*: campos obrigatórios

• Deve haver uma tela que liste os clientes:
Os clientes devem ser ordenados pelo que mais deve para o que menos deve
• A lista de clientes deve ser carregada de 10 em 10 (a forma que isso deverá ser apresentado na tela fica a sua escolha)
• Deve haver um campo de busca por nome, onde o atendente digita um texto e ha um filtro com todos os clientes cujo nome contém aquele texto.
• Na apresentação deve mostrar a idade do cliente sempre atualizada
: a persistência pode ser feita em arquivo ou em memória, não é mandatório o uso de qualquer banco
de dados.


## **O projeto**
Você fará uma API que possibilidade o CRUD de clientes com dados no formato JSON, além de desenvolver uma interface para que o atendente possa fazer essas operações.

### **Requisitos**
• A API deve ser desenvolvida utilizando Asp.NET Core com a linguagem C#, qualquer biblioteca ou
framework estão permitidos.
• A API deve aceitar e devolver dados no formato ISON
• A interface deve ser desenvolvida com HTML, CSS e Javascript, qualquer biblioteca ou framework estão permitidos.
• A interface deve possuir uma listagem que possibilite o cadastro, alteração e exclusão do cliente
• O cadastro deve ser validado e caso haja algum erro de validação (um campo obrigatório não foi preenchido, por exemplo), você deve mostrar o erro na tela para que o atendente possa consertar.
O projeto deve estar salvo num repositório git público da sua escolha (BitBucket, GitHub, GitLab etc)
• README. md explicando o motivo do uso das bibliotecas escolhidas (caso se aplique)
• README. md deve conter instruções de como executar a aplicação


### **Avaliação**

Serão avaliados nesse projeto o seu domínio nas tecnologias .NET e Javascript, além da forma que você levou para resolver o problema.

#### **Pontos Essenciais**
• Linguagem C#
• Linguagem Javascript
• Programação orientada a objetos
• Construção de API
• Apresentação de informação
• Dominio de Git


#### **Pontos Adicionais**
• Uso de bibliotecas e frameworks Javascript como React ou Angular
• Uso de banco de dados relacional
• Uso de ORM
• REST
• Documentação da API com postman ou swagger


**OBS**: Caso não consiga finalizar, envie até onde você conseguiu, é importante sabermos como você resolveu, ainda que parcialmente, a proposta do projeto.


## Resultado final

<a href="https://www.loom.com/share/8506af3a4f414b0a8d9b7b7950583a98">
    <img src="https://www.loom.com/share/8506af3a4f414b0a8d9b7b7950583a98" 
alt="IMAGE ALT TEXT HERE" width="480" height="360" border="10" /></a>


