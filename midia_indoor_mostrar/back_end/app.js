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

//Porta
const porta = 3001
app.listen(porta, () => {
    console.log(`Servidor estará rodando em http://localhost:${porta}`)
})