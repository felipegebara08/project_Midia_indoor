// Botões que trocam as DIVs
const btn_tela_busca = document.getElementById("btn_tela_busca")
const btn_tela_cadastrar = document.getElementById("btn_tela_cadastrar")
const btn_tela_atualizar = document.getElementById("btn_tela_atualizar")
const btn_tela_excluir = document.getElementById("btn_tela_excluir")


// Botões de ação dentro de cada DIV
const btn_select = document.getElementById("verifica");
const btn_cadastro = document.getElementById("btn_cadastro")

const btn_atualizar_dados = document.getElementById("btn_atualizar_dados")


btn_cadastro.addEventListener("click",async()=>{
  const nome = document.getElementById("nome_midia").value
  const tipo = document.getElementById("tipo").value 
  const status = document.getElementById("status").value
  const data_inicio = document.getElementById("data_inicio").value
  const data_fim = document.getElementById("data_fim").value
  const url = document.getElementById("url").value
  const tempo = document.getElementById("tempo").value

  let dados = await fetch("http://localhost:3000/api/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome: nome, tipo: tipo, status: status, data_inicio: data_inicio, data_fim:data_fim, url: url, tempo: tempo  }),
  });

  if(dados.ok){
    btn_tela_busca.click()
    btn_select.click()
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
  } else if (opcao == "data_inicio") {
    resposta = await fetch(`http://localhost:3000/api/midia/data_inicio/${busca}`);
  } else if (opcao == "data_fim") {
    resposta = await fetch(`http://localhost:3000/api/midia/data_fim/${busca}`);
  }
    
  if (resposta.ok) {
    html = html;
    let array_resultado = await resposta.json();
    if (opcao == "todos" || opcao == "nome"  || opcao == "tipo") {
      for (const dados of array_resultado) {ddd
        html += `<tr>                
        <td>${dados.id}</td>
        <td class='text-start'>${dados.nome}</td>
        <td class='text-start'>${dados.tipos}</td>
        <td><i onclick="editar(${dados.id})" class="bi bi-pencil"></td>
        <td><i onclick="excluir(${dados.id})" class="bi bi-trash"></i></td
        </tr>`;
      }
    } else if (opcao == "id") {
      html += `<tr>                
        <td>${array_resultado.id}</td>
        <td class='text-start'>${array_resultado.nome}</td>
        <td class='text-start'>${array_resultado.email}</td>
        <td><i class="bi bi-pencil"></td>
        <td><i class="bi bi-trash"></i></td>
        </tr>`;
    }

    html += `</tbody></table>`;
  }
  document.getElementById("saida").innerHTML = html;
  
});


async function editar(id){
  resposta = await fetch(`http://localhost:3000/api/usuarios/id/${id}`);
  if(resposta.ok) { // verificar se retorna 200 - OK para a busca
    let dados = await resposta.json()
    console.clear()
    console.log(dados)
    btn_tela_atualizar.click()
    document.getElementById("nome_editado").value = dados.nome
    document.getElementById("email_editado").value = dado.email
    document.getElementById("id_editado").value = dados.id
    
  }
}

async function excluir(id){
  const resultado = window.confirm("Deseja excluir este usuario?");
  if (resultado) {
    let dados = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(dados.ok){
      btn_tela_busca.click()
      btn_select.click()
    }
  } 
}

btn_atualizar_dados.addEventListener("click",async()=> {
  const nome_atualizado = document.getElementById("nome_editado").value
  const email_atualizado = document.getElementById("email_editado").value
  const id = document.getElementById("id_editado").value

  let dados = await fetch("http://localhost:3000/api/usuarios", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, nome: nome_atualizado, email:email_atualizado }),
  });

  if(dados.ok){
    btn_tela_busca.click()
    btn_select.click()
  }

})