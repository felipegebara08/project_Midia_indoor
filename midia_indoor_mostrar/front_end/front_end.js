async function editar() {
    resposta = await fetch(`http://localhost:3000/api/midia`);
    if (resposta.ok) { // verificar se retorna 200 - OK para a busca
        let dados = await resposta.json()
        console.clear()
    
    const array_dados = []

    array_dados.push(dados)
    let html = ""

    for (let i = 0; i < array_dados.length; i++) {
        const dados_ar = array_dados[i]
        let temp = dados_ar.tempo
        tempo_rotacao = temp * 1000

        html +=
        `<div class="carousel-item" data-bs-interval="${tempo_rotacao}">
            <img src ="${dados_ar.url}" width="800" height="400"class="d-block w-100">
        </div>`
        
        
    }        
    document.getElementById("carrosel").innerHTML += html
    }
}