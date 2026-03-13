document.addEventListener('DOMContentLoaded', () => {
   
   
    // ================= 1. CONTROLE DE MÚSICA =================
    const audio = document.getElementById('musica-fundo');
    const btnMusica = document.getElementById('btn-musica');
    let tocando = false;

    // Quando clicar no botão de música
    btnMusica.addEventListener('click', () => {
        if (tocando) {
            audio.pause();
            btnMusica.innerHTML = '🔇 Music: OFF';
            btnMusica.style.color = '#3b3f46';
        } else {
            audio.play();
            btnMusica.innerHTML = '🎵 Music: ON';
            btnMusica.style.color = '#ff6bc9';
        }
        tocando = !tocando; // Inverte o estado (de falso para verdadeiro e vice-versa)
    });

    
    // Telas e Botões principais
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnVoltar = document.getElementById('btn-voltar');
    const telaInicial = document.getElementById('tela-inicial');
    const containerJogo = document.getElementById('container-jogo');

    
    // Navegação Início <-> Mapa
    btnIniciar.addEventListener('click', () => {
        // Toca a música se estiver desligada
        if (!tocando) {
            audio.play();
            btnMusica.innerHTML = '🎵 Music: ON';
            btnMusica.style.color = '#ff6bc9';
            tocando = true;
        }

        // 1. Esconde a tela inicial e mostra o mapa
        telaInicial.classList.add('escondido');
        containerJogo.classList.remove('escondido');

        // ================= A MÁGICA DA ENTRADA TRIUNFAL =================
        const personagem = document.getElementById('personagem');

        // 2. Desliga a animação rapidinho e joga ela para fora da tela (no céu à esquerda)
        personagem.style.transition = 'none'; 
        personagem.style.top = '-20%'; 
        personagem.style.left = '-20%'; 

        // 3. Dá uma pausa de 100 milissegundos pro mapa carregar na tela
        setTimeout(() => {
            // Religa a animação suave de 1.5s
            personagem.style.transition = 'left 1.5s ease-in-out, top 1.5s ease-in-out';
            
            // Manda ela pousar na posição inicial (ajuste esses % para o seu banco da praça)
            personagem.style.top = '68%'; 
            personagem.style.left = '12%'; 
            
            // Garante que ela vai entrar virada pra direita
            personagem.style.transform = 'translate(-50%, -100%) scaleX(1)';
        }, 100); 
        // =================================================================
    });
    
    // ================= ANIMAÇÃO DE ROLAGEM (Título e Boneca) =================
    const titulo = document.querySelector('.titulo-principal');
    const bonecaScroll = document.getElementById('boneca-scroll');

    window.addEventListener('scroll', () => {
        let rolagem = window.scrollY; // Vê o quanto a tela desceu

        // 1. Faz o título encolher
        if (rolagem > 50) {
            titulo.classList.add('titulo-encolhido');
        } else {
            titulo.classList.remove('titulo-encolhido');
        }

        // 2. Faz a boneca voar pra cima (Efeito Parallax)
        // O número "1.5" faz ela subir mais rápido que a velocidade que você rola a tela!
        if (bonecaScroll) {
            bonecaScroll.style.transform = `translateY(-${rolagem * 1.5}px)`;
        }
    });
    btnVoltar.addEventListener('click', () => {
        containerJogo.classList.add('escondido');
        telaInicial.classList.remove('escondido');
    });

    // A mágica da movimentação e Modal
    const personagem = document.getElementById('personagem');
    const predios = document.querySelectorAll('.predio');
    const modal = document.getElementById('modal-info');
    const btnFechar = document.getElementById('btn-fechar');

    // Fechar o Modal
    btnFechar.addEventListener('click', () => {
        modal.classList.add('escondido');
    });

    // Quando clica em um prédio (Casa, Escola, etc)
    predios.forEach(predio => {
        predio.addEventListener('click', (evento) => {
            // Pega as posições (em porcentagem) onde a caixa do prédio está no CSS
            const destinoTop = predio.style.top;
            const destinoLeft = predio.style.left;

            // Vira a bonequinha para a direção certa
            const posicaoAtualLeft = parseFloat(personagem.style.left) || 0;
            const novoLeft = parseFloat(destinoLeft);

            if (novoLeft < posicaoAtualLeft) {
                // Vai pra esquerda, inverte a imagem
                personagem.style.transform = 'translate(-50%, -100%) scaleX(-1)';
            } else {
                // Vai pra direita, imagem normal
                personagem.style.transform = 'translate(-50%, -100%) scaleX(1)';
            }

            // Manda a bonequinha para a nova posição!
            personagem.style.top = destinoTop;
            personagem.style.left = destinoLeft;

            // Espera a animação terminar (1.5 segundos = 1500ms) para abrir as informações
            setTimeout(() => {
                modal.classList.remove('escondido');
            }, 1500);
        });
    });
});
// ================= TELA DE CARREGAMENTO =================
    window.addEventListener('load', () => {
        // Espera 2.5 segundos de "carregamento falso" para dar o charme
        setTimeout(() => {
            const loading = document.getElementById('tela-carregamento');
            loading.style.opacity = '0'; // Faz sumir suavemente
            setTimeout(() => {
                loading.style.visibility = 'hidden'; // Remove do caminho
            }, 500);
        }, 2500);
    });

    // ================= RASTRO DO CURSOR DE ESTRELA =================
    let tempoUltimaEstrela = 0;
    document.addEventListener('mousemove', (e) => {
        const agora = Date.now();
        // Só cria uma estrela a cada 50 milissegundos pra não travar o PC
        if (agora - tempoUltimaEstrela > 50) {
            const estrela = document.createElement('div');
            estrela.classList.add('rastro-estrela');
            estrela.innerHTML = '✨';
            
            // Pega a posição exata do mouse
            estrela.style.left = e.pageX + 'px';
            estrela.style.top = e.pageY + 'px';
            
            document.body.appendChild(estrela);
            tempoUltimaEstrela = agora;

            // Remove a estrelinha do código depois que a animação acaba (800ms)
            setTimeout(() => {
                estrela.remove();
            }, 800);
        }
    });
