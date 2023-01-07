let dados = [];

function calculaIdade(dataNascimento) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        split = dataNascimento.split('/'),
        novadata = split[1] + "/" + split[0] + "/" + split[2],
        data_americana = new Date(novadata),
        vAno = data_americana.getFullYear(),
        vMes = data_americana.getMonth() + 1,
        vDia = data_americana.getDate(),
        ano_aniversario = +vAno,
        mes_aniversario = +vMes,
        dia_aniversario = +vDia,
        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }
    
    return quantos_anos < 0 ? 0 : quantos_anos;
}

function populaTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados));

        $("#tblDados tbody").html("");

        dados.forEach(function (item) {
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.NomeCompleto}</td>
                <td>${item.Sexo}</td>
                <td>${item.CPF}</td>
                <td>${item.DataNascimento}</td>
                <td>${item.Idade}</td>
                <td>${item.Funcao}</td>
            </tr>`);
        });
    }
}

$(function () {
    // Executa ao carregar a página
    dados = JSON.parse(localStorage.getItem("__dados__"));

    if (dados != null) {
        populaTabela();
    } else {
        dados = [];
    }

    $("#btnSalvar").click(function () {
        // Evento click do botão Salvar

        let _id = $("#hdID").val();
        let NomeCompleto = $("#txtNomeCompleto").val();
        let Sexo = $("#selectSexo").val();
        let CPF = $("#txtCPF").val();
        let DataNascimento = new Date($("#txtDataNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" });
        let Idade = calculaIdade(DataNascimento);
        let Funcao = $("#selectFuncao").val();

        // Se o _id (hidden input) for nulo, então é um registro novo
        if (!_id || _id == "0") {
            let registro = {};

            registro.NomeCompleto = NomeCompleto;
            registro.Sexo = Sexo;
            registro.CPF = CPF;
            registro.DataNascimento = DataNascimento;
            registro.Idade = Idade;
            registro.Funcao = Funcao;

            // Condicional para preencher ID automaticamente, evitando repetições
            if (dados.length > 0) {
                registro.ID = dados[dados.length - 1].ID + 1;
                dados.push(registro);
            } else {
                registro.ID = 1;
                dados.push(registro);
            }

        }
        // Senão é uma edição de um registro já existente
        else {
            dados.forEach(function (item) {
                if (item.ID == _id) {
                    item.NomeCompleto = NomeCompleto;
                    item.Sexo = Sexo;
                    item.CPF = CPF;
                    item.DataNascimento = DataNascimento;
                    item.Idade = Idade;
                    item.Funcao = Funcao;
                }
            });
        }

        alert("Registro salvo com sucesso!");
        $("#modalRegistro").modal("hide");

        // Limpeza dos campos
        $("#hdID").val("0");
        $("#txtNomeCompleto").val("");
        $("#selectSexo").val("0");
        $("#selectSexo").val("0");
        $("#txtCPF").val("");
        $("#txtDataNascimento").val("");
        $("#selectFuncao").val("0");

        populaTabela();
  
    });
})