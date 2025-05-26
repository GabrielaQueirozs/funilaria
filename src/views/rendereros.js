let dataOS = document.getElementById('txtData')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let idClient = document.getElementById('inputIdClient')
let statusOS = document.getElementById('osStatus')
let modeloCarro = document.getElementById('inputModeloDoCarro')
let marcaCarro = document.getElementById('inputMarcaCarro') // corrigido
let placaCarro = document.getElementById('inputPlacaCarro') // corrigido
let servico = document.getElementById('inputDefeito')
let funcionario = document.getElementById('inputTecnico')
let pecas = document.getElementById('inputDiagnostico')
let observacoes = document.getElementById('inputpecas')
let orcamento = document.getElementById('inputValor')


const btnGerarOS = document.getElementById('btn-create')
btnGerarOS.addEventListener('click', () => {
    const hoje = new Date().toLocaleDateString('pt-BR')
    dataOS.value = hoje

    const ordemServico = {
        dataOS: hoje,
        nomeCliente: nomeCliente.value,
        foneCliente: foneCliente.value,
        idCliente: idClient.value, // ENVIA O ID DO CLIENTE AQUI
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

    console.log(ordemServico) // TESTE — importante
    api.newOS(ordemServico)
})





// ============================================================
// == Buscar OS - CRUD Read ===================================

function findOS() {
    api.searchOS()
}

api.renderOS((event, dataOS) => {
    console.log(dataOS)
    const os = JSON.parse(dataOS)
    // preencher os campos com os dados da OS
    idOS.value = os._id
    // formatar data:
    const data = new Date(os.dataEntrada)
    const formatada = data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
    dateOS.value = formatada
    idClient.value = os.idCliente
    statusOS.value = os.statusOS
    computer.value = os.nomeCliente
    serial.value = os.foneCliente
    problem.value = os.cpfCliente
    obs.value = os.modeloCarro
    specialist.value = os.marcaCarro
    diagnosis.value = os.placaCarro
    parts.value = os.servico
    total.value = os.funcionario
    total.value = os.pecas
    total.value = os.observacoes
    total.value = os.orcamento

    // desativar o botão adicionar
    btnCreate.disabled = true
    // ativar os botões editar e excluir
    btnUpdate.disabled = false
    btnDelete.disabled = false    
})

// == Fim - Buscar OS - CRUD Read =============================
// ============================================================


// ==================================================
// == Busca avançada - estilo Google ================

// capturar os id referente ao campo do nome
const input = document.getElementById('inputSearchClient')
// capturar o id do ul da lista de sugestões de clientes
const suggestionList = document.getElementById('viewListSuggestion')
// capturar os campos que vão ser preenchidos
// let idCliente = document.getElementById('inputIdClient')
// let nameClient = document.getElementById('inputNameClient')
// let phoneClient = document.getElementById('inputPhoneClient')

// vetor usado na manipulação (filtragem) dos dados
let arrayClients = []

// captura em tempo real do input (digitação de caracteres na caixa de busca)
input.addEventListener('input', () => {
    // Passo 1: capturar o que for digitado na caixa de busca e converter tudo para letras minúsculas (auxilio ao filtro)
    const search = input.value.toLowerCase()
    //console.log(search) // teste de apoio a lógica
    // Passo 2: Enviar ao main um pedido de busca de clientes pelo nome (via preload - api )
    api.searchClients()

    // Recebimento dos clientes do banco de dados (passo 3)
    api.listClients((event, clients) => {
        // console.log(clients) // teste do passo 3
        // converter para JSON os dados dos clientes recebidos
        const dataClients = JSON.parse(clients)
        // armazenar no vetor os dados dos clientes
        arrayClients = dataClients
        // Passo 4: Filtrar os dados dos clientes extraindo nomes que tenham relação com os caracteres digitados na busca em tempo real
        const results = arrayClients.filter(c =>
            c.nomeCliente && c.nomeCliente.toLowerCase().includes(search)
        ).slice(0, 10) //máximo 10 resultados
        //console.log(results) // IMPORTANTE para o entendimento
        // Limpar a lista a cada caractere digitado
        suggestionList.innerHTML = ""
        // Para cada resultado gerar um ítem da lista <li>
        results.forEach(c => {
            // criar o elemento li
            const item = document.createElement('li')
            // adicionar classes bootstrap a cada li criado
            item.classList.add('list-group-item', 'list-group-item-action')
            // exibir o nome do cliente
            item.textContent = c.nomeCliente

            // adicionar os li s criados a lista ul
            suggestionList.appendChild(item)

            // adicionar um evento de clique no item da lista para preencher os campos do formulário
            item.addEventListener('click', () => {
                idClient.value = c._id
                nomeCliente.value = c.nomeCliente
                foneCliente.value = c.foneCliente
                // limpar o input e recolher a lista
                input.value = ""
                suggestionList.innerHTML = ""
            })
        })
    })
})

// Ocultar a lista ao clicar fora
document.addEventListener('click', (event) => {
    // ocultar a lista se ela existir e estiver ativa
    if (!input.contains(event.target) && !suggestionList.contains(event.target)) {
        suggestionList.innerHTML = ""
    }
})

// == Fim - busca avançada ==========================
// ==================================================
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

