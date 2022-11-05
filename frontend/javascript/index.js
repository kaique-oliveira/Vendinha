
let indiceAtual = 0;

async function criarPaginacaoTabela(callback){

    let tabela = {
        numRows : 0,
        paginacao : []
    };

    let cliente = new Cliente('');
    let listaClientes = await cliente.consultarTodos();

    tabela.numRows = listaClientes.length;
    numPag = Number.isInteger((tabela.numRows / 10)) ? (tabela.numRows / 10) : Math.round((tabela.numRows / 10) + 1);
    let indice = 0;
    let pag = [];

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

    callback(tabela);
}

function carregarConteudoTabela(tabela){

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
                <td class="cabecalho-clientes">${item.telefone}</td>
                <td class="btn-group cabecalho-clientes" role="group">                  
                    <a id="btn-dividas${index++}" role="button" class=" material-symbols-outlined icon"> receipt </a> 
                    <a role="button" class=" material-symbols-outlined icon"> edit_note </a>
                </td>
            </tr>`
        ].join("\n");
    }


}

criarPaginacaoTabela(carregarConteudoTabela)