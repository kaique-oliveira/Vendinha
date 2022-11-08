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


let listaDividas = [];
let clienteRecuperado;

function validarCamposObrigatorios(){
    if(!nome.value || !cpf.value || !nascimento.value){
        exibirAviso();
    }
    else if(validarCpf() == false){
        avisoCpf.innerText = 'CPF Inválido!'
        avisoCpf.hidden = false;
    }else{
        if(clienteRecuperado == undefined){
            if(!listaDividas.length){
                let avisoTabela = document.getElementById('texto-aviso-tabela');
                avisoTabela.hidden = false;
            }else{
                cadastrar();   
            }
        }else{
            editarCliente();
        }
    }   
}

async function cadastrar(){
    let objCliente = {
        id : 0,
        nome : nome.value,
        cpf : cpf.value,
        dataNascimento : nascimento.value,
        telefone : telefone.value,
        foto : urlFoto.value,
        dividas : listaDividas
    };

    let cliente = new Cliente(objCliente);
    
    let response = await cliente.cadastrar();

   if(response){
    alert("Cliente cadastrado com sucesso!");
   }else{
    alert("Ops, algo deu errado!");
   }
    
    location.reload();   
}

function exibirAviso(){
    switch(''){
        case nome.value:
            avisoNome.hidden = false;
            break;
        case cpf.value:
            avisoCpf.innerText = 'CPF é obrigatório!'
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

function limparAvisoCliente(campo){
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
                        class="material-symbols-outlined icon hover-botao-deletar"> delete </a>     
                </td>
            </tr>`
        ].join("\n");
    }

}





function fecharModal(){
    location.reload();
}

function validarCpf(){

    let reg = new RegExp(/[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}/)

    if(cpf.value.length == 14 && !reg.test(cpf.value)){

        var Cpf = cpf.value.replace(/[^\d]/g, '');

        let multiplicado = 0;
        let multiplicador = 10;
        var primeiroNum = '';
        var segundoNum = '';


        for (var index = 0; index < 9; index++)
        {
            multiplicado += (multiplicador * parseInt(Cpf.substring(index,(index + 1))));
            multiplicador--;
        }

        primeiroNum = (((multiplicado * 10) % 11) == 10 ? 0 : ((multiplicado * 10) % 11));


        multiplicado = 0;
        multiplicador = 11;

        for (var index = 0; index < 10; index++)
        {
            multiplicado += (multiplicador * parseInt(Cpf.substring(index, (index + 1))));
            multiplicador--;
        }

        segundoNum = (((multiplicado * 10) % 11) == 10 ? 0 : ((multiplicado * 10) % 11));


        var finalCpf = Cpf.substring(9);
        let finalValidado = primeiroNum.toString() + segundoNum.toString();

        if (finalCpf == finalValidado)
        {
            return true;
        }
        else
        {
            return false;
        }
    }else{
        return false;
    }
}


function pegarId(botao){
    let linha = $(botao).closest("tr").find("td:not(:last-child)").map(function(){
        return $(this).text().trim();
     }).get();

     return linha[0];
}

async function recuperarCliente(btn){
    let containerDivida = document.getElementById('container-divida');
    containerDivida.hidden = true;

    let objCliente = new Cliente();
    clienteRecuperado = await objCliente.consultarUm(pegarId(btn));

    nome.value = clienteRecuperado.nome;
    cpf.value = clienteRecuperado.cpf;
    nascimento.value = `${clienteRecuperado.dataNascimento.substring(0,4)}-${clienteRecuperado.dataNascimento.substring(5,7)}-${clienteRecuperado.dataNascimento.substring(8,10)}`;
    telefone.value = clienteRecuperado.telefone;
    urlFoto.value = clienteRecuperado.foto;
}

async function editarCliente(){

    clienteRecuperado.nome = nome.value;
    clienteRecuperado.cpf = cpf.value;
    clienteRecuperado.telefone = telefone.value;
    clienteRecuperado.dataNascimento = nascimento.value;
    clienteRecuperado.foto = urlFoto.value;

    let objCliente = new Cliente(clienteRecuperado);

    let response = await objCliente.editar();

    if(response){
        alert("Cliente editado com sucesso!");
       }else{
        alert("Ops, algo deu errado!");
       }
        
    location.reload();   
}

async function deletarCliente(btn){

    if(confirm('Deseja realmente deletar o cliente?')){
        let objCliente = new Cliente();
        let response = objCliente.deletar(pegarId(btn));

        if(response){
            alert("Cliente deletado com sucesso!");
           }else{
            alert("Ops, algo deu errado!");
           }
            
        location.reload(); 
    }else{
        return;
    }
}
