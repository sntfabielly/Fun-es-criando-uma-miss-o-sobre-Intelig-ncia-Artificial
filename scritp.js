// ============================================
// 1. CRIANDO O OBJETO PRINCIPAL (SMARTPHONE)
// ============================================
const smartphone = {
    // Propriedades (características do objeto)
    marca: "TechPhone",
    modelo: "Pro Max",
    cor: "Preto Espacial",
    armazenamentoTotal: 256, // em GB
    armazenamentoUsado: 89.5, // em GB
    bateria: 75, // porcentagem
    appsInstalados: ["WhatsApp", "Instagram", "Spotify", "YouTube"],

    // Métodos (comportamentos do objeto)
    
    /**
     * Simula o uso de um aplicativo
     * @param {string} nomeApp - Nome do app a ser usado
     * @returns {string} Mensagem de resultado
     */
    usarApp(nomeApp) {
        // Verifica se o app está instalado
        if (this.appsInstalados.includes(nomeApp)) {
            // Consome 5% de bateria ao usar o app
            this.bateria -= 5;
            // Garante que a bateria não fique negativa
            if (this.bateria < 0) this.bateria = 0;
            return `📱 Usando ${nomeApp}... Bateria: ${this.bateria}%`;
        } else {
            return `❌ App "${nomeApp}" não encontrado. Instale primeiro!`;
        }
    },

    /**
     * Instala um novo aplicativo
     * @param {string} nomeApp - Nome do app a ser instalado
     * @returns {string} Mensagem de resultado
     */
    instalarApp(nomeApp) {
        // Verifica se o app já está instalado
        if (this.appsInstalados.includes(nomeApp)) {
            return `⚠️ O app "${nomeApp}" já está instalado.`;
        } else {
            // Adiciona o app à lista
            this.appsInstalados.push(nomeApp);
            // Consome 2.5GB de armazenamento
            this.armazenamentoUsado += 2.5;
            return `✅ App "${nomeApp}" instalado com sucesso!`;
        }
    },

    /**
     * Retorna o status atual do smartphone
     * @returns {Object} Status com bateria, armazenamento e quantidade de apps
     */
    getStatus() {
        return {
            bateria: this.bateria,
            armazenamentoLivre: this.armazenamentoTotal - this.armazenamentoUsado,
            apps: this.appsInstalados.length
        };
    },

    /**
     * Carrega a bateria do smartphone
     * @param {number} quantidade - Quantidade a ser carregada
     * @returns {string} Mensagem de resultado
     */
    carregarBateria(quantidade = 10) {
        this.bateria = Math.min(100, this.bateria + quantidade);
        return `🔋 Bateria carregada para ${this.bateria}%`;
    },

    /**
     * Desinstala um aplicativo
     * @param {string} nomeApp - Nome do app a ser desinstalado
     * @returns {string} Mensagem de resultado
     */
    desinstalarApp(nomeApp) {
        const index = this.appsInstalados.indexOf(nomeApp);
        if (index === -1) {
            return `❌ App "${nomeApp}" não está instalado.`;
        }
        this.appsInstalados.splice(index, 1);
        this.armazenamentoUsado = Math.max(0, this.armazenamentoUsado - 2.5);
        return `🗑️ App "${nomeApp}" desinstalado com sucesso!`;
    }
};

// ============================================
// 2. FUNÇÃO PARA EXIBIR PROPRIEDADES E MÉTODOS
// ============================================

/**
 * Exibe as propriedades e métodos do smartphone no DOM
 */
function exibirObjeto() {
    // Exibir propriedades
    const propsDiv = document.getElementById('propriedades');
    const propriedades = [
        { key: 'Marca', value: smartphone.marca },
        { key: 'Modelo', value: smartphone.modelo },
        { key: 'Cor', value: smartphone.cor },
        { key: 'Armazenamento Total', value: `${smartphone.armazenamentoTotal} GB` },
        { key: 'Armazenamento Usado', value: `${smartphone.armazenamentoUsado.toFixed(1)} GB` },
        { key: 'Bateria', value: `${smartphone.bateria}%` },
        { key: 'Apps Instalados', value: smartphone.appsInstalados.join(', ') }
    ];

    propsDiv.innerHTML = propriedades.map(prop =>
        `<div class="property">
            <span class="key">${prop.key}:</span>
            <span class="value">${prop.value}</span>
        </div>`
    ).join('');

    // Exibir métodos
    const metodosDiv = document.getElementById('metodos');
    metodosDiv.innerHTML = `
        <div class="property">
            <span class="key">📲 usarApp(nome)</span>
            <span class="value">Usa um app e consome bateria</span>
        </div>
        <div class="property">
            <span class="key">⬇️ instalarApp(nome)</span>
            <span class="value">Instala um novo aplicativo</span>
        </div>
        <div class="property">
            <span class="key">🔋 getStatus()</span>
            <span class="value">Retorna status do smartphone</span>
        </div>
        <div class="property">
            <span class="key">⚡ carregarBateria(qtd)</span>
            <span class="value">Carrega a bateria do smartphone</span>
        </div>
        <div class="property">
            <span class="key">🗑️ desinstalarApp(nome)</span>
            <span class="value">Remove um aplicativo instalado</span>
        </div>
    `;
}

// ============================================
// 3. FUNÇÕES PARA INTERAÇÃO (BOTÕES)
// ============================================

/**
 * Função chamada ao clicar em "Usar App"
 */
function usarApp() {
    const app = prompt('Qual app você quer usar? (WhatsApp, Instagram, Spotify, YouTube)');
    if (app && app.trim()) {
        const appNome = app.trim();
        const resultado = smartphone.usarApp(appNome);
        alert(resultado);
        exibirObjeto();
        atualizarStatus();
    }
}

/**
 * Função chamada ao clicar em "Instalar App"
 */
function instalarApp() {
    const app = prompt('Qual app você quer instalar?');
    if (app && app.trim()) {
        const appNome = app.trim();
        const resultado = smartphone.instalarApp(appNome);
        alert(resultado);
        exibirObjeto();
        atualizarStatus();
    }
}

/**
 * Função chamada ao clicar em "Ver Status"
 */
function mostrarStatus() {
    const status = smartphone.getStatus();
    alert(
        `📱 Status do Smartphone\n\n` +
        `🔋 Bateria: ${status.bateria}%\n` +
        `💾 Armazenamento Livre: ${status.armazenamentoLivre.toFixed(1)} GB\n` +
        `📦 Apps Instalados: ${status.apps}\n\n` +
        `💡 Dica: Use os botões para interagir!`
    );
}

/**
 * Atualiza a exibição da bateria em tempo real
 */
function atualizarStatus() {
    const propsDiv = document.getElementById('propriedades');
    const propriedadesElements = propsDiv.querySelectorAll('.property');
    
    // Atualiza a bateria (6º elemento)
    if (propriedadesElements.length >= 6) {
        const bateriaElement = propriedadesElements[5].querySelector('.value');
        if (bateriaElement) {
            bateriaElement.textContent = `${smartphone.bateria}%`;
        }
    }

    // Atualiza o armazenamento usado (5º elemento)
    if (propriedadesElements.length >= 5) {
        const armazenamentoElement = propriedadesElements[4].querySelector('.value');
        if (armazenamentoElement) {
            armazenamentoElement.textContent = `${smartphone.armazenamentoUsado.toFixed(1)} GB`;
        }
    }

    // Atualiza a lista de apps (7º elemento)
    if (propriedadesElements.length >= 7) {
        const appsElement = propriedadesElements[6].querySelector('.value');
        if (appsElement) {
            appsElement.textContent = smartphone.appsInstalados.join(', ');
        }
    }
}

// ============================================
// 4. LISTA DE OBJETOS (CRIANDO MÚLTIPLOS OBJETOS)
// ============================================

/**
 * Cria e exibe uma lista de objetos do dia a dia
 */
function criarListaObjetos() {
    // Array de objetos do dia a dia com suas características
    const objetosDoDia = [
        {
            nome: "📱 Smartphone",
            propriedades: `Marca: ${smartphone.marca}, Modelo: ${smartphone.modelo}`,
            funcao: "Comunicação, entretenimento, produtividade"
        },
        {
            nome: "💻 Notebook",
            propriedades: "Marca: Apple, Modelo: MacBook Pro",
            funcao: "Trabalho, estudo, criação de conteúdo"
        },
        {
            nome: "🎧 Fone de Ouvido",
            propriedades: "Marca: Sony, Tipo: Bluetooth",
            funcao: "Música, chamadas, imersão sonora"
        },
        {
            nome: "⌚ Smartwatch",
            propriedades: "Marca: Samsung, Modelo: Galaxy Watch",
            funcao: "Monitoramento de saúde, notificações"
        },
        {
            nome: "📷 Câmera Digital",
            propriedades: "Marca: Canon, Modelo: EOS R6",
            funcao: "Fotografia profissional, vídeos 4K"
        },
        {
            nome: "🎮 Console de Jogos",
            propriedades: "Marca: Sony, Modelo: PlayStation 5",
            funcao: "Jogos, entretenimento, streaming"
        },
        {
            nome: "📚 E-Reader",
            propriedades: "Marca: Amazon, Modelo: Kindle Paperwhite",
            funcao: "Leitura de livros digitais"
        }
    ];

    // Exibir a lista no DOM
    const listaDiv = document.getElementById('listaObjetos');
    const conteudoDiv = document.getElementById('listaConteudo');

    conteudoDiv.innerHTML = objetosDoDia.map(obj =>
        `<div class="object-item">
            <span class="name">${obj.nome}</span>
            <span class="details">${obj.propriedades} • ${obj.funcao}</span>
        </div>`
    ).join('');

    // Mostrar a lista com animação
    listaDiv.style.display = 'block';
    listaDiv.style.animation = 'none';
    setTimeout(() => {
        listaDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);

    // Scroll suave para a lista
    listaDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// 5. FUNÇÕES ADICIONAIS (DESAFIOS EXTRAS)
// ============================================

/**
 * Função para carregar a bateria (chamada via console)
 */
function carregarBateria(quantidade = 10) {
    const resultado = smartphone.carregarBateria(quantidade);
    alert(resultado);
    exibirObjeto();
    atualizarStatus();
}

/**
 * Função para desinstalar app (chamada via console)
 */
function desinstalarApp(nomeApp) {
    if (!nomeApp) {
        nomeApp = prompt('Qual app você quer desinstalar?');
    }
    if (nomeApp && nomeApp.trim()) {
        const resultado = smartphone.desinstalarApp(nomeApp.trim());
        alert(resultado);
        exibirObjeto();
        atualizarStatus();
    }
}

// ============================================
// 6. INICIALIZAÇÃO DA MISSÃO
// ============================================

/**
 * Função principal que inicia a missão
 * Divide o problema grande em problemas menores
 */
function inicializarMissao() {
    // Problema 1: Exibir o objeto no DOM
    exibirObjeto();
    console.log('✅ Objeto exibido com sucesso!');

    // Problema 2: Registrar informações no console
    console.log('📱 Smartphone objeto criado:', smartphone);
    console.log('📦 Apps instalados:', smartphone.appsInstalados.join(', '));
    console.log('🔋 Bateria inicial:', smartphone.bateria + '%');

    // Problema 3: Mensagem de boas-vindas interativa
    console.log('✨ Dica: Use os botões para interagir com o smartphone!');
    console.log('💡 Comandos extras no console:');
    console.log('  - carregarBateria(20)  // Carrega 20%');
    console.log('  - desinstalarApp("Spotify")  // Desinstala um app');
    console.log('  - smartphone.usarApp("YouTube")  // Usa um app');

    // Problema 4: Mostrar reflexão sobre IA
    setTimeout(() => {
        console.log('\n🤖 Reflexão sobre Inteligência Artificial:');
        console.log('1. Assistentes virtuais (Siri, Alexa, Google Assistant)');
        console.log('2. Recomendações personalizadas (Netflix, YouTube)');
        console.log('3. Reconhecimento facial e de voz');
        console.log('4. Tradução automática (Google Translate)');
        console.log('5. Filtros de spam em e-mails');
        console.log('6. Carros autônomos e navegação');
        console.log('\n💡 Como objetos em JavaScript podem representar IA?');
        console.log('   - Cada assistente é um objeto com propriedades (nome, idioma)');
        console.log('   - Métodos simulam comportamentos (responder, pesquisar)');
        console.log('   - Organização de dados reflete o aprendizado de máquina');
    }, 1500);

    // Problema 5: Adicionar evento de teclado (extra)
    document.addEventListener('keydown', (e) => {
        if (e.key === 's' || e.key === 'S') {
            mostrarStatus();
        }
        if (e.key === 'l' || e.key === 'L') {
            criarListaObjetos();
        }
    });

    console.log('⌨️ Atalhos de teclado: [S] Status | [L] Listar Objetos');
}

// ============================================
// 7. EXPORTAÇÃO PARA O CONSOLE (DEBUG)
// ============================================

// Tornar funções globais para uso no console
window.usarApp = usarApp;
window.instalarApp = instalarApp;
window.mostrarStatus = mostrarStatus;
window.criarListaObjetos = criarListaObjetos;
window.carregarBateria = carregarBateria;
window.desinstalarApp = desinstalarApp;
window.smartphone = smartphone;

// Iniciar a missão quando a página carregar
document.addEventListener('DOMContentLoaded', inicializarMissao);

// ============================================
// 8. LOG COMPLETO DA MISSÃO
// ============================================

console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║     🚀 MISSÃO INTELIGÊNCIA ARTIFICIAL - OBJETOS         ║
║                                                          ║
║  📌 Objetivo: Entender objetos em JavaScript             ║
║  📱 Objeto Criado: Smartphone                           ║
║  🎯 Elementos: 7 propriedades + 5 métodos               ║
║                                                          ║
║  🔑 Aprenda:                                            ║
║   • Como criar objetos com propriedades e métodos       ║
║   • Como usar funções para organizar o código           ║
║   • Como manipular o DOM com JavaScript                 ║
║   • Como a IA se relaciona com objetos                  ║
║                                                          ║
║  💡 Use os botões para interagir com o smartphone!      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`);