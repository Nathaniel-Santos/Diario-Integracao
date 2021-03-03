const mysql = require('mysql2');
const express = require('express');
const app = express()
const Sequelize = require('sequelize');
const cors = require('cors');
const { useEffect } = require('react');

app.use(cors());
app.use(express.json());

//CONNECTION ON LOCALHOST SETTINGS:
/*
    host: 'localhost',
    user: 'root',
    database: 'infodat_app'
*/

const connection = mysql.createPool({
    host: '192.185.213.88',
    user: 'cloudv64_Infodat',
    password: 'InFOt825030@12',
    database: 'cloudv64_Infodat_App'
});

//CONSULTA DE DADOS
app.get('/professores', (req, res) => {
    connection.query('SELECT * FROM funcionarios', (err, result) => {
        if (err) {
            console.log('Deu RUIM')
        } else {
            res.send(result)
        }
    })
})

app.get('/alunos', (req, res) => {
    connection.query('SELECT * FROM alunos', (err, result) => {
        if (err) {
            console.log('Deu RUIM')
        } else {
            res.send(result)
        }
    })
})

app.get('/cursos', (req, res) => {
    connection.query('SELECT * FROM cursos', (err, result) => {
        if (err) {
            console.log('Deu RUIM')
        } else {
            res.send(result)
        }
    })
})

app.get('/disciplinas', (req, res) => {
    connection.query('SELECT * FROM disciplina', (err, result) => {
        if (err) {
            console.log('Deu RUIM')
        } else {
            res.send(result)
        }
    })
})

app.get('/digitacao', (req, res) => {
    connection.query('SELECT * FROM digitacao', (err, result) => {
        if (err) {
            console.log('Deu RUIM')
        } else {
            res.send(result)
        }
    })
})

app.post('/getFaltas', (req, res) => {
    const matricula = req.body.matricula
    const data = req.body.data

    connection.query('SELECT * FROM diario WHERE matricula = ? AND data = ?', 
    [matricula, data],
    (err, result) => {
        if (err) {
            console.log('Erro ao consultar faltas')
        } else {
            res.send(result)
            console.log(`FALTAS DE MATRICULA ${matricula} E DATA ${data} OBTIDAS COM SUCESSO`)
        }
    } )
})

//INSERÇÃO DE DADOS.
app.post('/criar-diario', (req, res) => {
    //id / matricula / disciplina / etapa / data
    const id = req.body.id;
    const matricula = req.body.matricula;
    const disciplina_id = req.body.disciplina_id;
    const etapa = req.body.etapa;
    const data = req.body.data;
    const faltas = req.body.faltas

    connection.query(
        'INSERT INTO diario (id, matricula, disciplina_id, etapa, data, faltas) VALUES (?,?,?,?,?,?)',
        [id, matricula, disciplina_id, etapa, data, faltas], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result)
                //res.status(200).send()
                console.log('DADOS INSERIDOS COM SUCESSO')
            }
        }
    )
});


//'INSERT INTO conteudo (id, data, curso_id, disciplina_id, turma, descricao, atividade_casa, etapa) VALUES (null, 28-02-2021, 8, 5, A, "Descrição", "Atividade", "" )'
app.post('/conteudo', (req, res) => {
    // id / data / curso-id / disciplina_id / turma / descricao / atividade_casa / etapa
    const id = req.body.id;
    const data = req.body.data;
    const curso_id = req.body.curso_id
    const disciplina_id = req.body.disciplina_id
    const turma = req.body.turma
    const descricao = req.body.descricao
    const atividade_casa = req.body.atividade
    const etapa = req.body.etapa

    connection.query(
        'INSERT INTO conteudo (id, data, curso_id, disciplina_id, turma, descricao, atividade_casa, etapa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id, data, curso_id, disciplina_id, turma, descricao, atividade_casa, etapa],
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.json(result)
                console.log(result)
            }
        }
    )
});

//UPDATE FALTAS
app.post('/updateFaltas', (req, res) => {
    const matricula = req.body.matricula
    const faltas = req.body.faltas

    connection.query(
        'UPDATE diario SET faltas = ? WHERE matricula = ?',
        [faltas, matricula],
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.json(result)
                console.log('DADOS ATUALIZADOS COM SUCESSO')
            }
        }
    )
})


app.listen(3000, () => {
    console.log('Rodando servidor na porta 3001')
})
