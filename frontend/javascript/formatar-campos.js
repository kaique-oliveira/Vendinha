

cpf.addEventListener('keyup', ()=>{
    let texto = cpf.value.toString();

    if(isNaN(texto[texto.length-1])){
        cpf.value = texto.substring(0, texto.length-1);
        return;
     }
     

    if(texto.length == 3 || texto.length == 7){
        cpf.value += '.';
    }

    if(texto.length == 11){
        cpf.value += '-';
    }
});

telefone.addEventListener('keyup', ()=>{
    let texto = telefone.value.toString();

    if(isNaN(texto[texto.length-1])){
        telefone.value = texto.substring(0, texto.length-1);
        return;
     }
     
     switch(telefone.value.length){
        case 2:
            texto = `(${telefone.value}) `;
            telefone.value = texto;
            break;
        case 10: 
            telefone.value += '-';  
            break;         
     }
});

valor.addEventListener('keyup', ()=>{

    $('#valor-add-divida').mask('###0.00', {reverse: true});

});

txtValor.addEventListener('keyup', ()=>{

    $('#valor-divida').mask('###0.00', {reverse: true});

});