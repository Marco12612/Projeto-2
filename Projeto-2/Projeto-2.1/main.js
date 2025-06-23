// Referências aos elementos HTML que serão manipulados
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Array de objetos contendo as perguntas, alternativas e seus desfechos.
// Cada objeto de pergunta contém:
// - 'enunciado': O texto da pergunta.
// - 'alternativas': Um array de objetos, onde cada objeto tem:
//   - 'texto': O texto da alternativa.
//   - 'acao': O que acontece ao escolher esta alternativa. Pode ser o índice da próxima pergunta
//             ou uma string que indica um resultado final.
const perguntas = [
    {
        enunciado: "Diante da crescente influência da Inteligência Artificial em nossas vidas, qual caminho você acredita que a sociedade deveria priorizar para seu desenvolvimento?",
        alternativas: [
            {
                texto: "Priorizar a segurança e a ética, garantindo que a IA seja desenvolvida de forma responsável e controlada, mesmo que isso signifique um ritmo mais lento.",
                acao: 1 // Leva para a próxima pergunta sobre segurança/ética
            },
            {
                texto: "Priorizar a inovação e o avanço tecnológico rápido, impulsionando os limites da IA para explorar seu potencial máximo, mesmo com riscos inerentes.",
                acao: 2 // Leva para a próxima pergunta sobre inovação/consequências
            }
        ]
    },
    { // Pergunta 1 (ID 1): Caminho de Segurança e Ética
        enunciado: "Para garantir que a IA seja ética e segura, qual abordagem você considera mais eficaz?",
        alternativas: [
            {
                texto: "Estabelecer comitês de supervisão humana e regulamentações rigorosas, com forte intervenção governamental e civil.",
                acao: "resultadoSegurancaHumana" // Leva a um resultado final
            },
            {
                texto: "Desenvolver IAs capazes de auto-monitoramento ético e aprendizado moral, com base em princípios pré-definidos e validação contínua.",
                acao: "resultadoSegurancaIA" // Leva a um resultado final
            }
        ]
    },
    { // Pergunta 2 (ID 2): Caminho de Inovação e Consequências
        enunciado: "Com a rápida automação impulsionada pela IA, como você propõe lidar com o impacto no mercado de trabalho e o deslocamento de empregos?",
        alternativas: [
            {
                texto: "Implementar programas de Renda Básica Universal (RBU) para garantir subsistência e permitir que as pessoas se dediquem a novas áreas.",
                acao: "resultadoInovacaoRBU" // Leva a um resultado final
            },
            {
                texto: "Focar em programas massivos de requalificação profissional e educação continuada, adaptando a força de trabalho para novas demandas.",
                acao: "resultadoInovacaoRequalificacao" // Leva a um resultado final
            }
        ]
    }
];

// Objeto para armazenar os resultados finais do "jogo"
const resultados = {
    resultadoSegurancaHumana: "Você escolheu um futuro onde a segurança e a ética da IA são rigidamente controladas por seres humanos e regulamentações. Isso garante um desenvolvimento cauteloso, mas pode limitar a velocidade da inovação. A confiança na tecnologia é alta, mas a burocracia pode ser um desafio.",
    resultadoSegurancaIA: "Você optou por um futuro onde a IA é desenvolvida com a capacidade de auto-monitoramento ético. Isso permite uma inovação mais ágil, pois a própria IA busca ser responsável, mas levanta questões sobre a autonomia da máquina e a real compreensão de valores humanos.",
    resultadoInovacaoRBU: "Você vislumbrou um futuro de inovação rápida com uma rede de segurança social forte. A Renda Básica Universal alivia as pressões do deslocamento de empregos, permitindo que a sociedade se adapte. No entanto, o desafio reside na sustentabilidade econômica e na motivação para novas contribuições.",
    resultadoInovacaoRequalificacao: "Você apoiou um futuro de inovação contínua, onde a força de trabalho é constantemente adaptada e requalificada. Isso mantém as pessoas ativas no mercado, mas exige um investimento massivo em educação e um sistema flexível para acompanhar as rápidas mudanças tecnológicas."
};

let perguntaAtual = 0; // Índice da pergunta atual no array 'perguntas'

// Função para mostrar a pergunta atual na tela
function mostraPergunta() {
    // Esconde a caixa de resultado se estiver visível
    caixaResultado.style.display = 'none';
    caixaPrincipal.style.height = 'auto'; // Ajusta a altura se necessário

    // Obtém o objeto da pergunta atual
    const pergunta = perguntas[perguntaAtual];
    // Atualiza o texto da pergunta na div
    caixaPerguntas.textContent = pergunta.enunciado;
    // Limpa as alternativas anteriores antes de adicionar as novas
    caixaAlternativas.innerHTML = '';

    // Itera sobre as alternativas da pergunta atual e cria botões para cada uma
    pergunta.alternativas.forEach(alternativa => {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.classList.add("alternativa"); // Adiciona a classe CSS para estilização

        // Adiciona um evento de clique ao botão
        botaoAlternativa.addEventListener("click", () => {
            // Chama a função para lidar com a escolha da alternativa
            escolheAlternativa(alternativa);
        });
        caixaAlternativas.appendChild(botaoAlternativa); // Adiciona o botão à caixa de alternativas
    });
}

// Função para lidar com a escolha de uma alternativa
function escolheAlternativa(alternativaEscolhida) {
    // Verifica o tipo de ação da alternativa
    if (typeof alternativaEscolhida.acao === 'number') {
        // Se for um número, é o índice da próxima pergunta
        perguntaAtual = alternativaEscolhida.acao;
        mostraPergunta(); // Mostra a próxima pergunta
    } else if (typeof alternativaEscolhida.acao === 'string') {
        // Se for uma string, é o nome de um resultado final
        mostraResultado(alternativaEscolhida.acao); // Mostra o resultado final
    }
}

// Função para mostrar o resultado final
function mostraResultado(nomeResultado) {
    // Oculta as caixas de perguntas e alternativas
    caixaPerguntas.style.display = 'none';
    caixaAlternativas.style.display = 'none';
    // Exibe a caixa de resultado
    caixaResultado.style.display = 'block';

    // Define o texto do resultado final
    textoResultado.textContent = resultados[nomeResultado];

    // Opcional: ajustar a altura da caixa principal para o conteúdo do resultado
    caixaPrincipal.style.height = 'auto';
}

// Inicia a aplicação mostrando a primeira pergunta quando a página é carregada
mostraPergunta();
