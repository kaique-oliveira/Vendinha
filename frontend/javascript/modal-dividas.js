let btnAddDivida = document.getElementById('btn-adiciona');
let txtDescricao = document.getElementById('descricao-divida');
let txtValor = document.getElementById('valor-divida');
let avisoTxtDesc = document.getElementById('texto-aviso-txtDescricao');
let avisoTxtValor = document.getElementById('texto-aviso-txtValor');
let total = document.getElementById('valor-total');

let fotoPerfil = document.getElementById('foto-perfil');
let nomePerfil = document.getElementById('nome-perfil');

let idCliente = 0;
let idDivida = 0;

function pegarIdCliente(botao){
    let linha = $(botao).closest("tr").find("td:not(:last-child)").map(function(){
        return $(this).text().trim();
     }).get();

     idCliente = linha[0];
     carregarTabelaDividas();
}

async function carregarTabelaDividas(){

    let objDivida = new Divida();
    carregarPerfil();

    let listaDividas = await objDivida.consultarTodos(idCliente);
    let conteudoTabela = document.getElementById('conteudo-tabela-dividas');

    conteudoTabela.innerHTML = [];
    soma = parseFloat(0);

    for (const item of listaDividas) {
        let data = new Date(item.dataCompra.substring(0,10));
        
        conteudoTabela.innerHTML += [
            `<tr>
                <td class="cabecalho-dividas">${item.id}</td>
                <td class="cabecalho-dividas">${item.descricao}</td>
                <td class="cabecalho-dividas">${item.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                <td class="cabecalho-dividas">${data.getUTCDate().toString().padStart(2,"0")}/${data.getUTCMonth().toString().padStart(2,"0")}/${data.getUTCFullYear()}</td>
                <td class="btn-group cabecalho-dividas" role="group">                                    
                    <a role="button" onClick="recuperarDivida(this)" class="material-symbols-outlined icon hover-botao-editar" title="Editar divida"> edit_note </a>
                    <a role="button" onClick="deletarDivida(this)" class="material-symbols-outlined icon hover-botao-deletar" title="Deletar divida"> delete </a>
                </td>
            </tr>`
        ].join("\n");

        soma += parseFloat(item.valor);
    }

    total.value = soma.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}   

async function carregarPerfil(){
    let objCliente = new Cliente('');

    let perfil = await objCliente.consultarUm(idCliente);

    fotoPerfil.src = perfil.foto;
    nomePerfil.innerText = perfil.nome;
    idCliente = perfil.id;

}

async function cadastrarDivida(){

    if (txtDescricao.value && txtValor.value) {
        if (idDivida == 0) {
            let data = new Date();
            let divida = {
                id : 0,
                descricao : txtDescricao.value,
                valor : txtValor.value,
                dataCompra : `${data.getUTCFullYear()}-${data.getUTCMonth().toString().padStart(2,"0")}-${data.getUTCDate().toString().padStart(2,"0")}`,
                clienteId : idCliente
            };
        
            let objDivida = new Divida(divida);
            let response = await objDivida.cadastrar();
        
            if(response){
                alert("cadastro realizado com sucesso!");
                txtDescricao.value = '';
                txtValor.value = '';
            }
            else{
                alert("Ops, algo deu errado!");
            }
    
            carregarTabelaDividas();
    
        }else{
            editarDivida();
        }
    } else {
        exibirAvisoDivida();
    }

   
}


function pegarDividaAtual(botao){
    let divida = $(botao).closest("tr").find("td:not(:last-child)").map(function(){
        return $(this).text().trim();
     }).get();

     return divida;
}

async function deletarDivida(btn){

    if(confirm('Deseja realmente deletar a divida?')){
        idDivida = pegarDividaAtual(btn)[0];
        let objDivida = new Divida();

        if(await objDivida.deletar(idDivida)){
            alert('Divida deletada com sucesso!');
            carregarTabelaDividas();
        }else{
            alert('Ops, algo deu errado na tentativa de deletar!');
        }
    }else{
        return;
    }

    idDivida = 0;
}

let btnEditarDivida;

function recuperarDivida(btn){
    btnEditarDivida = btn;

    btn.style.color = 'rgb(255, 130, 46)';
    let dividaRecup =  pegarDividaAtual(btn);
    idDivida = dividaRecup[0];

    txtDescricao.value = dividaRecup[1];
    txtValor.value = dividaRecup[2] .substring(3).replace(',', '.');


}

async function editarDivida(){
    
    let dividaEditada = {
        id : idDivida,
        descricao : txtDescricao.value,
        valor : txtValor.value,
        clienteId : idCliente
    };

    let objDivida = new Divida(dividaEditada);

    let response = await objDivida.editar();

    if(response){
        alert("divida editada com sucesso!");
        btnEditarDivida.style.color = 'rgb(211, 211, 211)';
    }
    else{
        alert("Ops, algo deu errado ao tentar editar!");
    }

    txtDescricao.value = '';
    txtValor.value = '';
    idDivida = 0;
    dividaEditada = undefined;
    carregarTabelaDividas();
}

function exibirAvisoDivida(){

    switch(''){
        case txtDescricao.value:
            avisoTxtDesc.hidden = false;
            break;
        case txtValor.value:
            avisoTxtValor.hidden = false;
            break;
        }
}

function limparAvisoDivida(campo){
    switch(campo.id.toString()){
        case 'descricao-divida':
            avisoTxtDesc.hidden = true;
            break;
        case 'valor-divida':
            avisoTxtValor.hidden = true;
            break;
    }
}


