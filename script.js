let array_galeria = []
let dados_anuncios = []

function ocultar_divs() {
    document.getElementById("tela_cadastro").style.display = "none"
    document.getElementById("tela_listarmidiaindoor").style.display = "none"
    document.getElementById("tela_remover").style.display = "none"
}
function ocultar_div(id_div) {
    document.getElementById(id_div).style.display = "none"

}
function mostrar_div(id_div) {
    document.getElementById(id_div).style.display = "flex"
}
function btn_onclick_mostrar_cadastro() {
    ocultar_divs()
    mostrar_div("tela_cadastro")
}
function btn_onclick_mostrar_listar() {
    ocultar_divs()
    mostrar_div("tela_listar")

    let tela = document.getElementById("galeria")
    tela.innerHTML = ""
    let conteudo_html = ""

    dados_anuncios = []

    for (let i = 0; i < array_galeria.length; i++) {
        

        let titulo = array_galeria[i][0]
        let end_imagem = array_galeria[i][1]
        let descricao = array_galeria[i][2]
        
        conteudo_html += `<div class = "container-filme">
                                <img src = "${end_imagem}"/>
                                <h2>${titulo}</h2>
                                <p>${descricao}</p>
                            </div>`

    }
    galeria.innerHTML += conteudo_html
}
function btn_onclick_mostrar_remover() {
    ocultar_divs()
    mostrar_div("tela_remover")

    let tela1 = document.getElementById("tela_remover")
    tela1.innerHTML = ""

    let conteudo1_html = ""

    for (let i = 0; i < array_galeria.length; i++) {
        
        let titulo = array_galeria[i][0]
        conteudo1_html += `<div class = "vermelho">
                            <button onclick="removerFilmeArray(${i})">${titulo}</button>
                        </div>`
        
    }
    tela_remover.innerHTML += conteudo1_html
}
function removerFilmeArray(indice_a_remover) {
    array_galeria.splice(indice_a_remover,1)
    btn_onclick_mostrar_remover()
}
function btn_onclick_adicionar_filme() {

    let titulo = document.getElementById("titulo").value
    let end_imagem = document.getElementById("end_imagem").value
    let descricao = document.getElementById("descricao").value

    dados_filme.push(titulo, end_imagem , descricao)
    array_galeria.push(dados_filme)

}
function btn_onclick_mostrar_editar() {
    ocultar_divs()
    //mostrar a div que agrupa as divs de edição
    mostrar_div("tela_edicao")
    mostrar_div("tela_editar_listagem")
    ocultar_div("tela_editar_formulario")

    
    //montar a lista de botões referente aos filmes do array galeria
    for (let index = 0; index < array_galeria.length; index++) {
         conteudo_html += 
         `<button onclick = "funcao(${index})">${array_galeria[1][0]}
    </button>`
        
    }
    document.getElementById("tela_editar_listagem") .innerHTML = conteudo_html
       
    
        

}
document.getElementById(fuawiy)
    .addEventListener