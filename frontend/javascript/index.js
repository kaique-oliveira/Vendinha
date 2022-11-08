var txtPesquisar = document.getElementById('pesquisar');
let indiceAtual = 0;
let tabela = {
    numRows : 0,
    paginacao : []
};


async function criarPaginacaoTabela(lista){

    let listaRecebida = lista;

    tabela.numRows = listaRecebida.length;
    numPag = Number.isInteger((tabela.numRows / 10)) ? (tabela.numRows / 10) : Math.round((tabela.numRows / 10) + 1);

    let indice = 0;
   
    tabela.paginacao = [];


    let pag = [];
    let objDivida = new Divida();
    let total = 0;

    //criando a estrutura de paginacao
    for (let index = 0; index < numPag; index++) {

        for (let index = 0; index < 10; index++) {

            let cliente = {
                id : 0,
                nome : '',
                cpf : '',
                idade : '',
                telefone : '',
                foto : '',
                dividas : [],
                total : 0
            };

          if(listaRecebida[indice]){

            listaRecebida[indice].dividas = await objDivida.consultarTodos(listaRecebida[indice].id);

            for (const d of listaRecebida[indice].dividas) {
                total += d.valor;
            }

            cliente.id = listaRecebida[indice].id;
            cliente.nome = listaRecebida[indice].nome;
            cliente.cpf = listaRecebida[indice].cpf;
            cliente.idade = listaRecebida[indice].idade;
            cliente.telefone = listaRecebida[indice].telefone;
            cliente.foto = listaRecebida[indice].foto;
            cliente.dividas = listaRecebida[indice].dividas;
            cliente.total = total;

            pag.push(cliente);   

            total = 0;
          }
          else{
            break;
          }  

          indice++;
        }

        tabela.paginacao.push(pag.sort((a,b) => b.total - a.total)); 

        if(pag.length == 10){
            pag = [];
        }
    }

    carregarConteudoTabela();
}

async function consultarCliente(){
    let objCliente = new Cliente();
    let todos = await objCliente.consultarTodos();
    criarPaginacaoTabela(todos);
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
                <td class="cabecalho-clientes">${item.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                <td class="btn-group cabecalho-clientes" role="group">                  
                    <a id="btn-dividas${index++}" role="button" class="material-symbols-outlined icon hover-botao-dividas" title="Detalhes das dividas"
                    data-bs-target="#modal-gerenciar-dividas" data-bs-toggle="modal" onClick="pegarIdCliente(this)"> receipt </a> 
                   
                    <a role="button" class="material-symbols-outlined icon hover-botao-editar" title="Editar cliente"
                        data-bs-target="#modal-cadastro-cliente" data-bs-toggle="modal" onClick="recuperarCliente(this)"> edit_note </a>
                    
                        <a role="button" class="material-symbols-outlined icon hover-botao-deletar" title="Deletar cliente"
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

