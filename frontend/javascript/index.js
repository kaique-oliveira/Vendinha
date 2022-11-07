var txtPesquisar = document.getElementById('pesquisar');
let indiceAtual = 0;
let tabela = {
    numRows : 0,
    paginacao : []
};


async function criarPaginacaoTabela(lista){

    let listaClientes = lista;

    tabela.numRows = listaClientes.length;
    numPag = Number.isInteger((tabela.numRows / 10)) ? (tabela.numRows / 10) : Math.round((tabela.numRows / 10) + 1);
    let indice = 0;
    let pag = [];
    tabela.paginacao = [];

    //criando a estrutura de paginacao
    for (let index = 0; index < numPag; index++) {

        for (let index = 0; index < 10; index++) {
          if(listaClientes[indice]){
            pag.push(listaClientes[indice]);   
          }else{
            break;
          }  

          indice++;
        }

        tabela.paginacao.push(pag); 

        if(pag.length == 10){
            pag = [];
        }
    }

    carregarConteudoTabela();
}

async function consultarCliente(){
    let objCliente = new Cliente();
    let todos = await objCliente.consultarTodos();
    criarPaginacaoTabela(todos)
}

function carregarConteudoTabela(){

    let conteudoTabela = document.getElementById('conteudo-tabela-clientes');
    let index = 0;

    conteudoTabela.innerHTML = [];

    for (const item of tabela.paginacao[indiceAtual]) {
        conteudoTabela.innerHTML += [
            `<tr>
                <td class="cabecalho-clientes">${item.id}</td>
                <td class="cabecalho-clientes">${item.nome}</td>
                <td class="cabecalho-clientes">${item.cpf}</td>
                <td class="cabecalho-clientes">${item.idade}</td>
                <td class="cabecalho-clientes">${item.telefone ? item.telefone : 'Não possui'}</td>
                <td class="btn-group cabecalho-clientes" role="group">                  
                    <a id="btn-dividas${index++}" role="button" class="material-symbols-outlined icon hover-botao-dividas"
                    data-bs-target="#modal-gerenciar-dividas" data-bs-toggle="modal" onClick="pegarIdCliente(this)"> receipt </a> 
                   
                    <a role="button" class="material-symbols-outlined icon hover-botao-editar" 
                        data-bs-target="#modal-cadastro-cliente" data-bs-toggle="modal" onClick="recuperarCliente(this)"> edit_note </a>
                    
                        <a role="button" class="material-symbols-outlined icon hover-botao-deletar"
                            onClick="deletarCliente(this)"> delete </a>
                </td>
            </tr>`
        ].join("\n");
    }

    document.getElementById('legenda-paginacao').innerText = `Página ${indiceAtual + 1} de ${numPag} - Exibindo ${conteudoTabela.childElementCount} de ${tabela.numRows} registros`
}

consultarCliente();

function proximaPag(){
    if(indiceAtual < (numPag - 1)){
        indiceAtual++;
        carregarConteudoTabela();
    }
}

function voltarPag(){
    if(indiceAtual != 0){
        indiceAtual--;
        carregarConteudoTabela();
    }
}

if(txtPesquisar){
    txtPesquisar.addEventListener('keyup', async() => {
        let objCliente = new Cliente();
        let listaPesquisada = [];
        let todosRegistros = await objCliente.consultarTodos();

        if(txtPesquisar.value){
            let re = new RegExp('^'+ txtPesquisar.value.toString(), 'i')
            for (const item of todosRegistros) {

                    if(re.test(item.nome.toString())){
                        listaPesquisada.push(item);
                        result = true;
                    }  
                
            }
        }

        if(listaPesquisada.length != 0){
            indiceAtual = 0;
            criarPaginacaoTabela(listaPesquisada); 
        }else{
            consultarCliente();
        }
        
    });
}

