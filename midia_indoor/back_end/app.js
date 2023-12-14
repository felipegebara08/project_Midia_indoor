const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.json())

//criar uma pool de conexão
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'midia_indoor',
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 5
})

//Rota para SELECT
app.get('/api/midia', async (req,res) => {
    try {
    const conection = await pool.getConnection()
    const sql = "SELECT * FROM midia"
    const [linhas] = await conection.execute(sql)
    console.log(linhas)
    conection.release()
    res.json(linhas)

    } catch(error) {
        console.log(`O Erro que ocorreu foi: ${error}`)
        res.send(500).json({error: "Deu algum erro na conexão"})
    }
})

//Rota para SELECT com ID
app.get('/api/midia/id/:id', async (req,res) => {
    try {
        let id = req.params.id
        const conection = await pool.getConnection()
        const sql = "SELECT * FROM midia WHERE id = "+id
        const [linhas] = await conection.execute(sql)
        console.log(linhas)
        conection.release()
        res.json(linhas[0])

        } catch(error) {
            console.log(`O Erro que ocorreu foi: ${error}`)
            res.send(500).json({error: "Deu algum erro na conexão"})
        }
})
//Rota para SELECT com Nome
app.get('/api/midia/nome/:nome', async (req,res) => {
    try {
        let nome = req.params.nome
        const conection = await pool.getConnection()
        const sql = `SELECT * FROM midia WHERE nome LIKE %${nome}%`
        const [linhas] = await conection.execute(sql)
        console.log(linhas)
        conection.release()
        res.json(linhas)

        } catch(error) {
            console.log(`O Erro que ocorreu foi: ${error}`)
            res.send(500).json({error: "Deu algum erro na conexão"})
        }
})

//Rota para o INSERT
app.post("/api/midia/", async(req, res) => {
    try {
        const {nome, tipo, status, data_inicio, data_fim,url , tempo} = req.body
        const conection = await pool.getConnection()
        const sql = `INSERT INTO midia (nome, tipo, status, data_inicio, data_fim, url, tempo) 
                    VALUES ("${nome}", "${tipo}", "${status}", "${data_inicio}",
                     "${data_fim}","${url}" , "${tempo}")`
        console.log(sql)
        const [linhas] = await conection.execute(sql)
        conection.release()
        res.json({msg: "Registro gravado!"})
        
    } catch (error) {
        console.log(`O Erro que ocorreu foi: ${error}`)
        res.send(500).json({error: "Deu algum erro na conexão"})
    }
})

//Rota para o UPDATE
app.put("/api/midia/", async(req,res) =>{
    try {
        const {id ,nome, tipo, status, data_inicio, data_fim, url , tempo} = req.body
        const conection = await pool.getConnection()
        const sql = `UPDATE midia SET nome = "${nome}", tipo = "${tipo}", status = "${status}",
                    data_inicio = "${data_inicio}", data_fim = "${data_fim}", url = "${url}" , tempo = "${tempo}"
                    WHERE id = ${id}`
        console.log(sql)
        const [linhas] = await conection.execute(sql)
        conection.release()
        res.json({msg: "Registro gravado!"})
        
    } catch (error) {
        console.log(`O Erro que ocorreu foi: ${error}`)
        res.send(500).json({error: "Deu algum erro na conexão"})
    }
})

// rota para DELETE
app.delete("/api/midia/:id", async(req, res) => {
    try {
        const id_DELETE = req.params.id
        const conection = await pool.getConnection()
        const sql = `DELETE FROM midia WHERE id = ${id_DELETE}`
        console.log(sql)
        const [linhas] = await conection.execute(sql)
        conection.release()
        res.json({msg: "Registro excluido!"})
        
    } catch (error) {
        console.log(`O Erro que ocorreu foi: ${error}`)
        res.send(500).json({error: "Deu algum erro na conexão"})
    }
})


//rota para a midia
app.get("/api/midia/mostrar", async (req,res) => {
    try {
        var today = new Date();
        var ano = today.getFullYear();
        var mes = today.getMonth()+1;
        var dia = today.getDate();
        var d = ano+"-"+mes+"-"+dia;
        console.log(d);
        
        const conection = await pool.getConnection()
        /*const sql = "SELECT status,data_inicio,data_fim,url,tempo FROM midia"*/
        const sql = `SELECT * FROM midia WHERE '${d}' > data_inicio  AND '${d}' < data_fim `;
        console.log(sql)
        const [linhas] = await conection.execute(sql)
        console.log(linhas)
        conection.release()
        res.json(linhas)
    
        } catch(error) {
            console.log(`O Erro que ocorreu foi: ${error}`)
            res.send(500).json({error: "Deu algum erro na conexão"})
        }
})

//Porta
const porta = 3000
app.listen(porta, () => {
    console.log(`Servidor estará rodando em http://localhost:${porta}`)
})
