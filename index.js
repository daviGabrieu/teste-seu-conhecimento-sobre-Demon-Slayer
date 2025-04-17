const perguntas = [
    {
 pergunta: "Qual é o nome do protagonista de Demon Slayer?",
    respostas: [
      "Tanjiro Kamado",
      "Zenitsu Agatsuma",
      "Giyu Tomioka"
    ],
    correta: 0 // A resposta correta é "Tanjiro Kamado"
    },
    {
    pergunta: "Qual é o nome da irmã mais nova de Tanjiro, que foi transformada em demônio?",
    respostas: [
      "Nezuko Kamado",
      "Shinobu Kocho",
      "Kanao Tsuyuri"
    ],
    correta: 0 // A resposta correta é "Nezuko Kamado"
    },
    {
   pergunta: "Quem é o pilar do fogo da organização dos Caçadores de Demônios?",
    respostas: [
      "Kyojuro Rengoku",
      "Tengen Uzui",
      "Muichiro Tokito"
    ],
    correta: 0 // A resposta correta é "Kyojuro Rengoku"
    },
    {
    pergunta: "Qual é o nome da técnica de respiração usada por Tanjiro?",
    respostas: [
      "Respiração da Água",
      "Respiração do chamas",
      "Respiração do Sol"
    ],
    correta: 2 // A resposta correta é "Respiração do sol"
    },
    {
   pergunta: "Quem é o líder da família de aranhas demoníacas?",
    respostas: [
      "Muzan Kibutsuji",
      "Enmu",
      "Rui"
    ],
    correta: 2 // A resposta correta é "Rui"
    },
    {
  pergunta: "Qual é o nome da organização responsável por treinar os Caçadores de Demônios?",
    respostas: [
      "Corpo de Espadas",
      "Corpo de Exorcistas",
      "Corpo de Demon Slayer"
    ],
    correta: 1 // A resposta correta é "Corpo de Exorcistas"
    },
    {
       pergunta: "Qual é o nome do mestre de Tanjiro que ensinou a ele a técnica de respiração?",
    respostas: [
      "Kagaya Ubuyashiki",
      "Sakonji Urokodaki",
      "Jigoro Kuwajima"
    ],
    correta: 1 // A resposta correta é "Sakonji Urokodaki"
    },
    {
    pergunta: "Quem é o Hashira do Inseto Borboleta?",
    respostas: [
      "Shinobu Kocho",
      "Mitsuri Kanroji",
      "Muichiro Tokito"
    ],
    correta: 0 // A resposta correta é "Shinobu Kocho"
    },
    {   
     pergunta: "Qual é o objetivo principal de Tanjiro como Caçador de Demônios?",
    respostas: [
      "Salvar sua irmã Nezuko",
      "Vingar a morte de seus pais",
      "Encontrar e derrotar Muzan Kibutsuji"
    ],
    correta: 0 // A resposta correta é "Salvar sua irmã Nezuko"
    },
    {
    pergunta: "Qual é o nome do hashira que tem um amor incondicional por Tanjiro?",
    respostas: [
      "Giyu Tomioka",
      "Kyojuro Rengoku",
      "Tengen Uzui"
    ],
    correta: 0 // A resposta correta é "Giyu Tomioka"
  
    }
  ];

const quiz = document.querySelector('#quiz')
const template = document.querySelector('template')

const corretas = new Set()
const totalDePerguntas = perguntas.length
const mostrarTotal = document.querySelector('#acertos span')
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas

//loop ou laço de repetição
for(const item of perguntas) {
const quizItem = template.content.cloneNode(true)
quizItem.querySelector('h3').textContent = item.pergunta

for(let resposta of item.respostas) {
  const dt = quizItem.querySelector('dl dt').cloneNode(true)
  dt.querySelector('span').textContent = resposta
  dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
  dt.querySelector('input').value = item.respostas.indexOf(resposta)
  dt.querySelector('input').onchange = (event) => {
    const estaCorreta = event.target.value == item.correta

    corretas.delete(item)
    if(estaCorreta) {
      corretas.add(item)
    }

    mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas
  } 
  
  quizItem.querySelector('dl').appendChild(dt)
}

//fazer aparecer a resposta
quizItem.querySelector('dl dt').remove()


//coloca a pergunta na tela
quiz.appendChild(quizItem)
}
