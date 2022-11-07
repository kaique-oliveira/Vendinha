class Divida{
    constructor(objeto){
        this.divida = objeto;
    }

    consultarTodos = async (idCliente) => {
        var response =  await fetch(`https://localhost:7049/api/divida/pegartodos/${idCliente}`);

        return response.json();
    };

    cadastrar = async () => {

        let status = false;

        await fetch('https://localhost:7049/api/divida/cadastrar', {
                method: "POST",
                body: JSON.stringify(this.divida),
                headers: {"Content-type": "application/json; charset=UTF-8"},             
            }).then(response => {
                status = response.ok ? true : false;
            });

            return status;
    };

    deletar = async (idDivida) => {

        let status = false;

        await fetch(`https://localhost:7049/api/divida/deletar/${idDivida}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"},                 
        }).then(response => {
            status = response.ok ? true : false;
        });

        return status;
    };

    editar = async () => {

        let status = false;

        await fetch(`https://localhost:7049/api/divida/editar/${this.divida.id}`, {
            method: "PUT",
            body: JSON.stringify(this.divida),
            headers: {"Content-type": "application/json; charset=UTF-8"}           
        }).then(response => {
            status = response.ok ? true : false;
        });

        return status;
    }
}