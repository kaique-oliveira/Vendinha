 class Cliente {
    constructor(objeto){
        this.objeto = objeto;
    }

    consultarTodos = async () => {

        var response =  await fetch(`https://localhost:7049/api/cliente/pegartodos`);

        return response.json();
    }
}

