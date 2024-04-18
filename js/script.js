// Seleciona o botão de menu
const menu = document.querySelector('.menu')

const nav = document.querySelector('.nav')

menu.addEventListener('click', () => {
  nav.classList.toggle('active')
})

function fecharMenu(aba) {
  nav.classList.remove('active')

  event.preventDefault()
  // Encontra o elemento da âncora selecionada
  const elementoAba = document.querySelector(aba)

  setTimeout(() => {
    // Rola a página até o elemento da âncora selecionada
    elementoAba.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (aba === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, 1000)
}

const palavras = ['DAVI GOMES', 'DESENVOLVEDOR', 'PROGRAMADOR']
let indicePalavraAtual = 0
let indiceLetraAtual = 0
let apagando = false // Flag para indicar se está apagando o texto
let elementoPalavra = document.querySelector('.typing-animation h1')

function escreverProximaLetra() {
  const palavraAtual = palavras[indicePalavraAtual]
  if (!apagando) {
    // Escrevendo o texto
    elementoPalavra.textContent = palavraAtual.slice(0, indiceLetraAtual)
    indiceLetraAtual++
    // Se chegou ao fim da palavra, começar a apagar
    if (indiceLetraAtual > palavraAtual.length) {
      apagando = true
      indiceLetraAtual = palavraAtual.length
      setTimeout(escreverProximaLetra, 1000) // Tempo de espera antes de apagar
    } else {
      setTimeout(escreverProximaLetra, 100) // Tempo de espera entre cada letra
    }
  } else {
    // Apagando o texto
    elementoPalavra.textContent = palavraAtual.slice(0, indiceLetraAtual)
    indiceLetraAtual--
    // Se apagou todo o texto, passar para a próxima palavra
    if (indiceLetraAtual === 0) {
      apagando = false
      indicePalavraAtual = (indicePalavraAtual + 1) % palavras.length
      setTimeout(escreverProximaLetra, 1000) // Tempo de espera antes de escrever a próxima palavra
    } else {
      setTimeout(escreverProximaLetra, 50) // Tempo de espera entre cada letra apagada
    }
  }
}

// Iniciar o efeito de digitação
setTimeout(escreverProximaLetra, 500) // Tempo de espera inicial antes de começar

const projetosContainer = document.querySelector('.projetos')

fetch('/js/projetos.json')
  .then(response => response.json())
  .then(data => {
    data.forEach((projeto, index) => {
      const novoProjeto = document.createElement('div')
      novoProjeto.classList.add('projeto')
      novoProjeto.setAttribute('onclick', `expandirProjeto(${index})`)

      const tituloProjeto = document.createElement('h2')
      tituloProjeto.textContent = projeto.titulo

      const infoProjeto = document.createElement('p')
      infoProjeto.textContent = projeto.descricao

      novoProjeto.appendChild(tituloProjeto)
      novoProjeto.appendChild(infoProjeto)

      projetosContainer.appendChild(novoProjeto)
    })
    
  })
  .catch(error =>
    console.error('Erro ao carregar os dados dos projetos:', error)
  )

let urlOriginal = ''

function expandirProjeto(index) {
  // faz uma requisição http no arquivo JSON
  fetch('/js/projetos.json')
    .then(response => response.json())
    .then(data => {
      const projetos = data // Atribui os dados carregados do JSON à variável projetos
      const expandido = document.querySelector('.expandido')
      const tituloProjeto = document.getElementById('titulo-projeto')
      const infoProjeto = document.getElementById('info-projeto')
      const tipoProjeto = document.getElementById('tipo-projeto')
      const tecnologiasProjeto = document.getElementById('tecnologias-projeto')
      const urlProjeto = document.getElementById('url-projeto')

      tituloProjeto.textContent = projetos[index].titulo
      infoProjeto.textContent = projetos[index].descricao
      tipoProjeto.textContent = projetos[index].tipo
      tecnologiasProjeto.textContent = projetos[index].tecnologia
      if (projetos[index].url === '') {
        urlProjeto.textContent = 'Projeto Privado'
        urlProjeto.style.cursor = 'default'
        urlProjeto.href = ''
        urlProjeto.removeAttribute('href')
      } else {
        urlProjeto.textContent = projetos[index].url
        urlProjeto.href = projetos[index].url
        urlProjeto.style.cursor = 'pointer'
      }
      expandido.classList.add('active')
      urlOriginal = urlProjeto.textContent
      atualizarUrlProjeto()
    })
    .catch(error =>
      console.error('Erro ao carregar os dados dos projetos:', error)
    )
}

function fecharExpandido() {
  const expandido = document.querySelector('.expandido')
  expandido.classList.remove('active')
}

// Função para verificar o tamanho da tela e atualizar o conteúdo do elemento #url-projeto
function atualizarUrlProjeto() {
  const urlProjeto = document.getElementById('url-projeto')
  const larguraTela = window.innerWidth

  if (larguraTela <= 440) {
    urlProjeto.textContent = 'Link'
  } else {
    urlProjeto.textContent = urlOriginal
  }
}

// Chame a função inicialmente para configurar o conteúdo com base no tamanho da tela atual
atualizarUrlProjeto()

// Adicione um ouvinte de evento de redimensionamento da janela para atualizar dinamicamente o conteúdo conforme o tamanho da tela muda
window.addEventListener('resize', atualizarUrlProjeto)

function exibirMensagemSucesso() {
  const urlParams = new URLSearchParams(window.location.search)
  const nextParam = urlParams.get('_next')
  if (nextParam && nextParam.includes('mensagem-sucesso')) {
    document.getElementById('mensagem-sucesso').classList.add('active')
    window.location.hash = 'contato'
  }
}

setInterval(exibirMensagemSucesso(), 1000)

function fecharMensagem() {
  document.getElementById('mensagem-sucesso').classList.remove('active')
  const urlParams = new URLSearchParams(window.location.search)
  urlParams.delete('_next')
  const newUrl = window.location.pathname + urlParams.toString()
  history.replaceState(null, null, newUrl)
}
