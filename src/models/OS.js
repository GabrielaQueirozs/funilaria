/**
 * Modelo de dados para a coleção "OS" (Ordens de Serviço)
 */

const { model, Schema } = require('mongoose')

// Criação da estrutura da coleção OS
const osSchema = new Schema({
    dataOS: {
        type: String
    },
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    cpfCliente: {
        type: String
    },
    statusOS: {
        type: String
    },
    modeloCarro: {
        type: String
    },
    marcaCarro: {
        type: String
    },
    placaCarro: {
        type: String
    },
    servico: {
        type: String
    },
    funcionario: {
        type: String
    },
    pecas: {
        type: String
    },
    observacoes: {
        type: String
    },
    orcamento: {
        type: String
    }
}, { versionKey: false }) // não versionar os dados armazenados

// Exportar o modelo de dados
module.exports = model('dbOs', osSchema)
