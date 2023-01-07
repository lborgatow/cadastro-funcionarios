let dados = []

function populaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function (item) {
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.NomeCompleto}</td>
                <td>${item.Sexo}</td>
                <td>${item.CPF}</td>
                <td>${item.DataNascimento}</td>
                <td>${item.Idade}</td>
                <td>${item.Funcao}</td>
            </tr>`)
        })
    }
}

$(function () {
    // Executa ao carregar a página
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados != null) {
        populaTabela()
    } else {
        dados = []
    }

})