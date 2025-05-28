let frmOS = document.getElementById('frmOS')

let idOS = document.getElementById('txtOs')
let dataOS = document.getElementById('txtData')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let idClient = document.getElementById('inputIdClient')
let statusOS = document.getElementById('osStatus')
let modeloCarro = document.getElementById('inputModeloDoCarro')
let marcaCarro = document.getElementById('inputMarcaCarro')
let placaCarro = document.getElementById('inputPlacaCarro')
let servico = document.getElementById('inputDefeito')
let funcionario = document.getElementById('inputTecnico')
let pecas = document.getElementById('inputDiagnostico')
let observacoes = document.getElementById('inputpecas')
let orcamento = document.getElementById('inputValor')



frmOS.addEventListener('submit', async (event) => {    
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    
    
    if (idClient.value === "") {
        api.validateClient()
    } else {
        // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
        if (idOS.value === "") {
            //Gerar OS
            //Criar um objeto para armazenar os dados da OS antes de enviar ao main
            const os = {
                nomeCliente: nomeCliente.value,
                foneCliente: foneCliente.value,
                idCliente: idClient.value,
                statusOS: statusOS.value,
                modeloCarro: modeloCarro.value,
                marcaCarro: marcaCarro.value,
                placaCarro: placaCarro.value,
                 servico: servico.value,
                funcionario: funcionario.value,
                pecas: pecas.value,
                observacoes: observacoes.value,
                orcamento: orcamento.value
            }
            // Enviar ao main o objeto os - (Passo 2: fluxo)
            // uso do preload.js
            api.newOS(os)
        } else {
            //Editar OS
            //Gerar OS
            //Criar um objeto para armazenar os dados da OS antes de enviar ao main
            const os = {
                id_OS: idOS.value,
                nomeCliente: nomeCliente.value,
                foneCliente: foneCliente.value,
                idCliente: idClient.value,
                statusOS: statusOS.value,
                modeloCarro: modeloCarro.value,
                marcaCarro: marcaCarro.value,
                placaCarro: placaCarro.value,
                servico: servico.value,
                funcionario: funcionario.value,
                pecas: pecas.value,
                observacoes: observacoes.value,
                orcamento: orcamento.value
            }
            // Enviar ao main o objeto os - (Passo 2: fluxo)
            // uso do preload.js
            api.updateOS(os)
        }
    }

    // console.log(ordemServico)
    // api.newOS(ordemServico)
})

// ============================================================
// == Buscar OS - CRUD Read ===================================

function findOS() {
    api.searchOS()
}

api.renderOS((event, dataOS) => {
    console.log(dataOS)
    const os = JSON.parse(dataOS)

    idOS.value = os._id

    // Usar o mesmo modelo
    const data = new Date(os.dataOS)
    const formatada = data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
    dataOS.value = formatada

    nomeCliente.value = os.nomeCliente
    foneCliente.value = os.foneCliente
    idClient.value = os.idCliente
    statusOS.value = os.statusOS
    modeloCarro.value = os.modeloCarro
    marcaCarro.value = os.marcaCarro
    placaCarro.value = os.placaCarro
    servico.value = os.servico
    funcionario.value = os.funcionario
    pecas.value = os.pecas
    observacoes.value = os.observacoes
    orcamento.value = os.orcamento

    btnGerarOS.disabled = true
    btnUpdate.disabled = false
    btnDelete.disabled = false
})


// ==================================================
// == Busca avançada - estilo Google ================

const input = document.getElementById('inputSearchClient')
const suggestionList = document.getElementById('viewListSuggestion')

let arrayClients = []

input.addEventListener('input', () => {
    const search = input.value.toLowerCase()
    api.searchClients()

    api.listClients((event, clients) => {
        const dataClients = JSON.parse(clients)
        arrayClients = dataClients

        const results = arrayClients.filter(c =>
            c.nomeCliente && c.nomeCliente.toLowerCase().includes(search)
        ).slice(0, 10)

        suggestionList.innerHTML = ""

        results.forEach(c => {
            const item = document.createElement('li')
            item.classList.add('list-group-item', 'list-group-item-action')
            item.textContent = c.nomeCliente
            suggestionList.appendChild(item)

            item.addEventListener('click', () => {
                idClient.value = c._id
                nomeCliente.value = c.nomeCliente
                foneCliente.value = c.foneCliente
                input.value = ""
                suggestionList.innerHTML = ""
            })
        })
    })
})

document.addEventListener('DOMContentLoaded', () => {
    // Desativar os botões
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

document.addEventListener('click', (event) => {
    if (!input.contains(event.target) && !suggestionList.contains(event.target)) {
        suggestionList.innerHTML = ""
    }
})

function resetFormOS() {
    location.reload()
}

api.resetFormOS((args) => {
    resetFormOS()
})

// === Função para excluir OS ===
function removeOS() {
    console.log(idOS.value) // Passo 1 (receber do form o id da OS)
    api.deleteOS(idOS.value) // Passo 2 (enviar o id da OS ao main)
}
