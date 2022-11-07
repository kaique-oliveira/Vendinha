 class Cliente {
    constructor(objeto){
        this.cliente = objeto;
    }

    consultarTodos = async () => {

        var response =  await fetch(`https://localhost:7049/api/cliente/pegartodos`);

        return response.json();
    };

    cadastrar = async () => {

        let status = false;

        await fetch('https://localhost:7049/api/cliente/cadastrar', {
            method: "POST",
            body: JSON.stringify(this.cliente),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(response => {

            status = response.ok ? true : false;
        });

        return status;
    };

    consultarUm = async(idCliente) =>{
        let cliente = await fetch(`https://localhost:7049/api/cliente/pegarum/${idCliente}`);

        return cliente.json();
    }

    editar = async() => {
        let status = false;
        
        await fetch(`https://localhost:7049/api/cliente/editar/${this.cliente.id}`, {
            method: "PUT",
            body: JSON.stringify(this.cliente),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(response => {

            status = response.ok ? true : false;
        });

        return status;
    }

    deletar = async (idCliente) => {

        let status = false;

        await fetch(`https://localhost:7049/api/cliente/deletar/${idCliente}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"},                 
        }).then(response => {
            status = response.ok ? true : false;
        });

        return status;
    };
};

