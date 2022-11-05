let nome = document.getElementById('nome-cliente');
let cpf = document.getElementById('cpf-cliente');
let nascimento = document.getElementById('nascimento-cliente');
let telefone = document.getElementById('telefone-cliente');
let urlFoto = document.getElementById('foto-cliente');
let descricao = document.getElementById('descricao-add-divida');
let valor = document.getElementById('valor-add-divida');

let avisoNome = document.getElementById('texto-aviso-nome');
let avisoCpf = document.getElementById('texto-aviso-cpf');
let avisoNasc = document.getElementById('texto-aviso-nascimento');
let avisoDesc = document.getElementById('texto-aviso-descricao');
let avisoValor = document.getElementById('texto-aviso-valor');


let salva = document.getElementById('btn-salva');
let add = document.getElementById('btn-adiciona');
let form = document.getElementById('form-cad-cliente');


let listaDividas = []

function validarCamposObrigatorios(){
    if(!nome.value || !cpf.value || !nascimento.value){
        exibirAviso();
    }
    else{
        if(!listaDividas.length){
            let avisoTabela = document.getElementById('texto-aviso-tabela');
            avisoTabela.hidden = false;
        }else{
            alert('todos certos')
        }
    }
}


function addDividas(){
    if(descricao.value && valor.value){
        let data = new Date();

        let objDivida = {
            id : 0,
            descricao : descricao.value,
            valor : valor.value,
            dataCompra : `${data.getUTCFullYear()}-${data.getUTCMonth().toString().padStart(2,"0")}-${data.getUTCDate().toString().padStart(2,"0")}`,
            clienteId : 0
        }

        listaDividas.push(objDivida);
        atualizarTabelaDividas();

        
        descricao.value = '';
        valor.value = '';
        let avisoTabela = document.getElementById('texto-aviso-tabela');
        avisoTabela.hidden = true;
        
    }else{
    
        exibirAviso();
    }
}

function removerDividaLista(botao){

    let index = botao.id.replace(/[^\d]/g,'');

    listaDividas.splice(index, 1);

    atualizarTabelaDividas();
}

function atualizarTabelaDividas(){

    let conteudoTabela = document.getElementById('conteudo-tabela-add-divida');
    conteudoTabela.innerHTML = [];
    let index = 0;

    for (const item of listaDividas) {
        conteudoTabela.innerHTML += [
            `<tr>
                <td class="cabecalho-add-dividas">${item.descricao}</td>
                <td class="cabecalho-add-dividas">${item.valor}</td>
                <td class="btn-group cabecalho-add-dividas" role="group">                  
                    <a id="btn-deletar-divida${index++}" role="button" onClick=" removerDividaLista(this)"
                        class="material-symbols-outlined icon"> delete </a>     
                </td>
            </tr>`
        ].join("\n");
    }

}



function exibirAviso(){
    switch(''){
        case nome.value:
            avisoNome.hidden = false;
            break;
        case cpf.value:
            avisoCpf.hidden = false;
            break;
        case nascimento.value:
            avisoNasc.hidden = false;
            break;
        case descricao.value:
            avisoDesc.hidden = false;
            break;
        case valor.value:
            avisoValor.hidden = false;
            break;
    }

}

function limparAviso(campo){
    switch(campo.id.toString()){
        case 'nome-cliente':
            avisoNome.hidden = true;
            break;
        case 'cpf-cliente':
            avisoCpf.hidden = true;
            break;
        case 'nascimento-cliente':
            avisoNasc.hidden = true;
            break;
        case 'descricao-add-divida':
            avisoDesc.hidden = true;
            break;
        case 'valor-add-divida':
            avisoValor.hidden = true;
            break;
        default:
           return;
    }
}