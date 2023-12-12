async function editar() {
    resposta = await fetch(`http://localhost:3000/api/midia/mostrar`);
    if (resposta.ok) { // verificar se retorna 200 - OK para a busca
        let dados = await resposta.json()
        console.log(dados)

        let html = ""

        for (let i = 0; i < dados.length; i++) {
            const dado = dados[i]

            let temp = dado.tempo
            let tempo_rotacao = temp * 1000

            if (dado.status == "a" || dado.status == "1") {
                if (dado.tipo == "f" || dado.tipo == "1") {
                    if (i <= 0) {
                        html +=
                            `<div class="carousel-item active" data-bs-interval="${tempo_rotacao}">
                                <img src="${dado.url}" alt="Imagem" class="d-block w-100">
                            </div>`
                    } else {
                        html +=
                            `<div class="carousel-item" data-bs-interval="${tempo_rotacao}">
                                <img src="${dado.url}" alt="Imagem" class="d-block w-100">
                            </div>`
                    }
                } else {
                    let link = dado.url
                    let link_final = link.substr(0, 23) + "/embed/" + link.substr(32)
                    console.log(link_final)

                    if (i <= 0) {
                        html += `
                        <div class="carousel-item active" data-bs-interval="${tempo_rotacao}">
                           <iframe width="100%" height="100%" src="${link_final}?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>`
                    } else {
                        html += `
                            <div class="carousel-item" data-bs-interval="${tempo_rotacao}">
                               <iframe width="100%" height="100%" src="${link_final}?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>`
                    }
                }
            } else {
                console.log("Inativo")
            }
        }

        document.getElementById("carrosel").innerHTML += html
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    editar()
})