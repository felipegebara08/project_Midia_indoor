// Botões que trocam as DIVs
const btn_tela_busca = document.getElementById("btn_tela_busca")
const btn_tela_cadastrar = document.getElementById("btn_tela_cadastrar")
const btn_tela_atualizar = document.getElementById("btn_tela_atualizar")
const btn_tela_excluir = document.getElementById("btn_tela_excluir")

//mostrar e ocultar div
function mostrar_div(id_div) {
    document.getElementById(id_div).style.display = "flex"
}
function ocultar_div(id_div) {
    document.getElementById(id_div).style.display = "none"
}

// Botões de ação dentro de cada DIV
const btn_select = document.getElementById("verifica");
const btn_cadastro = document.getElementById("btn_cadastro")
const btn_atualizar_dados = document.getElementById("btn_atualizar_dados")

btn_tela_cadastrar.addEventListener("click", () => {
    mostrar_div("tela_cadastro")
    ocultar_div("Tela_busca")
    ocultar_div("Tela_atualizar")
    ocultar_div("tela_login")
})

btn_tela_busca.addEventListener("click", () => {
    mostrar_div("Tela_busca")
    ocultar_div("tela_cadastro")
    ocultar_div("Tela_atualizar")
    ocultar_div("tela_login")
})

btn_tela_atualizar.addEventListener("click", () => {
    mostrar_div("Tela_atualizar")
    ocultar_div("tela_cadastro")
    ocultar_div("Tela_busca")
    ocultar_div("tela_login")
})

btn_cadastro.addEventListener("click", async () => {
    const nome = document.getElementById("nome_da_midia").value
    const tipo = document.getElementById("tipo").value
    const status = document.getElementById("status").value
    const data_inicio = document.getElementById("data_inicio").value 
    const data_fim = document.getElementById("data_fim").value
    const url = document.getElementById("url").value
    const tempo = document.getElementById("tempo").value

    if (nome == "" || nome == null)
    {
        alert("O nome não foi inserido!")
    } else if (data_inicio == null || data_inicio == "")
    {
        alert("A data de início não foi inserida!")
    } else if (data_fim == null || data_fim == "")
    {
        alert("Algum dado não foi inserido!")
    } else if(url == "" || url == null) 
    {
        alert("Algum dado não foi inserido!")
    } else if(tempo <= 0 || tempo == null || tempo == "") 
    {
        alert("Algum dado não foi inserido!")
    } else {

    let dados = await fetch("http://localhost:3000/api/midia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome, tipo: tipo, status: status, data_inicio: data_inicio, data_fim: data_fim, url: url, tempo: tempo }),

    });

    if (dados.ok) {
        btn_tela_busca.click()
        btn_select.click()
    }
    }
})

btn_select.addEventListener("click", async () => {
    let busca = document.getElementById("input_busca").value;
    let opcao = document.getElementById("opcoes").value;
    let html = `<table class="table">
                <thead>
                  <tr>    
                    <th scope="col">id</th>
                    <th scope="col" class='text-start'>Nome</th>
                    <th scope="col" class='text-start'>tipo</th>
                    <th scope="col" class='text-start'>status</th>
                    <th scope="col" class='text-start'>tempo</th>
                    <th scope="col" class='text-start'>data_inicial</th>
                    <th scope="col" class='text-start'>data_final</th>
                    <th scope="col">Editar</i></th>
                    <th scope="col">Excluir</th>
                  </tr>
                </thead>
                <tbody>`;

    document.getElementById("saida").innerHTML = "";
    document.getElementById("input_busca").value = ""

    let resposta = "";
    if (opcao == "todos") {
        resposta = await fetch("http://localhost:3000/api/midia");
    } else if (opcao == "id") {
        resposta = await fetch(`http://localhost:3000/api/midia/id/${busca}`);
    } else if (opcao == "nome") {
        resposta = await fetch(`http://localhost:3000/api/midia/nome/${busca}`);
    } else if (opcao == "tipo") {
        resposta = await fetch(`http://localhost:3000/api/midia/tipo/${busca}`);
    } else if (opcao == "status") {
        resposta = await fetch(`http://localhost:3000/api/midia/status/${busca}`);
    }

    if (resposta.ok) {
        html = html;
        let array_resultado = await resposta.json();
        if (opcao == "todos" || opcao == "id" || opcao == "nome" || opcao == "tipo" || opcao == "status") {
            for (const dados of array_resultado) {
                let dt_inicio = dados.data_inicio.substr(8,2)+"/"+dados.data_inicio.substr(5,2)+"/"+dados.data_inicio.substr(0,4)
                let dt_fim = dados.data_fim.substr(8,2)+"/"+dados.data_fim.substr(5,2)+"/"+dados.data_fim.substr(0,4)

                let tipo = ""
                let status = ""

                if(dados.tipo == "f") tipo = "Foto" 
                else tipo = "video"

                if(dados.status == "a") status = "ativo"
                else status = "inativo"

                html += `<tr>                
        <td>${dados.id}</td>
        <td class='text-start'>${dados.nome}</td>
        <td class='text-start'>${tipo}</td>
        <td class='text-start'>${status}</td>
        <td class='text-start'>${dados.tempo}</td>
        <td class='text-start'>${dt_inicio}</td>
        <td class='text-start'>${dt_fim}</td>
        <td><i class="bi bi-pencil-square" onclick="editar(${dados.id})"></i></td>        
        <td><i class="bi bi-trash" onclick ="excluir(${dados.id})"></i></td>        
        </tr>`;
            }
        } else {
            html += `<tr>                
            <td class='text-start'>${dados.nome}</td>
            <td class='text-start'>${tipo}</td>
            <td class='text-start'>${status}</td>
            <td class='text-start'>${dados.tempo}</td>
            <td class='text-start'>${dt_inicio}</td>
            <td class='text-start'>${dt_fim}</td>
            <td><i class="bi bi-pencil-square" onclick="editar(${dados.id})"></i></td>        
            <td><i class="bi bi-trash" onclick ="excluir(${dados.id})"></i></td>  
        </tr>`;
        }

        html += `</tbody></table>`;
    }
    document.getElementById("saida").innerHTML = html;

});


async function editar(id) {
    resposta = await fetch(`http://localhost:3000/api/midia/id/${id}`);
    if (resposta.ok) { // verificar se retorna 200 - OK para a busca
        let dados = await resposta.json()
        console.clear()
        btn_tela_atualizar.click()

        if (dados.tipo == "f") {
            document.getElementById("tipo_editado").value = "1"
        } else {
            document.getElementById("tipo_editado").value = "2"
        }

        if (dados.status == "a") {
            document.getElementById("status_editado").value = "1"
        } else {
            document.getElementById("status_editado").value = "2"
        }

        console.log(dados)
        
        document.getElementById("nome_editado").value = dados.nome
        
        
        document.getElementById("tempo_editado").value = dados.tempo
        document.getElementById("dataI_editado").value = dados.data_inicio.substr(0,10)
        document.getElementById("dataF_editado").value = dados.data_fim.substr(0,10)
        document.getElementById("id_editado").value = dados.id
        document.getElementById("url_editado").value = dados.url

    }
}

async function excluir(id) {
    const resultado = window.confirm("Deseja excluir este usuario?");
    if (resultado) {
        let dados = await fetch(`http://localhost:3000/api/midia/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (dados.ok) {
            btn_tela_busca.click()
            btn_select.click()
        }
    }
}

btn_atualizar_dados.addEventListener("click", async () => {
    const id_atualizado = document.getElementById("id_editado").value
    const nome_atualizado = document.getElementById("nome_editado").value
    const tipo_atualizado = document.getElementById("tipo_editado").value
    const status_atualizado = document.getElementById("status_editado").value
    const data_inicial_atualizado = document.getElementById("dataI_editado").value
    const data_final_atualizado = document.getElementById("dataF_editado").value
    const url_atualizado = document.getElementById("url_editado").value
    const tempo_atualizado = document.getElementById("tempo_editado").value

    let dados = await fetch("http://localhost:3000/api/midia/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id_atualizado, nome: nome_atualizado, tipo: tipo_atualizado, status: status_atualizado, data_inicio: data_inicial_atualizado, data_fim: data_final_atualizado, url: url_atualizado, tempo: tempo_atualizado, }),
    });

    if (dados.ok) {
        btn_tela_busca.click()
        btn_select.click()
    }

})