
const fotos = [
  'photo/phot.png',
  'photo/phot.jpg',
  'photo/phot.jpg',
  'photo/phot.jpg',
  'photo/phot.jpg',
  'photo/phot.jpg',
  'photo/phot.jpg',
  'photo/phot.jpg'
];

let currentPhotoIndex = 0;
let autoplayActive = true;
let autoplayInterval = null;
let animandoGaleria = false;

class GalleryManager {
  constructor() {
    this.container = document.getElementById('galleryContainer');
    this.counter = document.getElementById('photoCounter');
    this.btnPrev = document.getElementById('btnPrevPhoto');
    this.btnPlay = document.getElementById('btnPlayPause');
    this.btnNext = document.getElementById('btnNextPhoto');
    this.init();
  }

  init() {
    this.renderGallery();
    this.setupEventListeners();
    this.startAutoplay();
  }

  renderGallery() {
    this.container.innerHTML = '';

    fotos.forEach((foto, index) => {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide';
      if (index === currentPhotoIndex) slide.classList.add('active');

      const img = document.createElement('img');
      img.src = foto;
      img.alt = `Foto ${index + 1}`;

      img.onerror = () => {
        img.src = 'https://via.placeholder.com/600x400/ff69b4/ffffff?text=Foto+' + (index + 1);
      };

      slide.appendChild(img);
      this.container.appendChild(slide);
    });

    this.updateCounter();
  }

  showPhoto(index) {
    if (animandoGaleria) return;
    animandoGaleria = true;

    const slides = document.querySelectorAll('.gallery-slide');

    slides[currentPhotoIndex].classList.remove('active');
    slides[currentPhotoIndex].classList.add('exit');

    setTimeout(() => {
      currentPhotoIndex = (index + fotos.length) % fotos.length;

      slides.forEach(slide => {
        slide.classList.remove('active', 'exit');
      });

      slides[currentPhotoIndex].classList.add('active');
      this.updateCounter();
      animandoGaleria = false;
    }, 800);
  }

  nextPhoto() {
    this.showPhoto(currentPhotoIndex + 1);
  }

  prevPhoto() {
    this.showPhoto(currentPhotoIndex - 1);
  }

  updateCounter() {
    this.counter.textContent = `Foto ${currentPhotoIndex + 1} de ${fotos.length}`;
  }

  startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayActive = true;
    this.btnPlay.textContent = '⏸️';
    autoplayInterval = setInterval(() => this.nextPhoto(), 5000);
  }

  stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayActive = false;
    this.btnPlay.textContent = '▶️';
  }

  toggleAutoplay() {
    autoplayActive ? this.stopAutoplay() : this.startAutoplay();
  }

  setupEventListeners() {
    this.btnNext.addEventListener('click', () => this.nextPhoto());
    this.btnPrev.addEventListener('click', () => this.prevPhoto());
    this.btnPlay.addEventListener('click', () => this.toggleAutoplay());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.nextPhoto();
      if (e.key === 'ArrowLeft') this.prevPhoto();
      if (e.key === ' ') {
        e.preventDefault();
        this.toggleAutoplay();
      }
    });
  }
}

const glow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const gallery = new GalleryManager();

const particlesContainer = document.getElementById('particles');

function criarParticulas() {
  const quantidade = 45;

  for (let i = 0; i < quantidade; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = 8 + Math.random() * 10 + 's';
    particle.style.animationDelay = Math.random() * 8 + 's';

    const tamanho = 3 + Math.random() * 10;
    particle.style.width = tamanho + 'px';
    particle.style.height = tamanho + 'px';

    particlesContainer.appendChild(particle);
  }
}

criarParticulas();


const mensagens = [
  "EU TE AMOOOO! ❤️",
  "Você é o meu mundo 🌎",
  "Seu sorriso ilumina meu dia ☀️",
  "Cada batida do meu coração é por você 💓",
  "Te amo mais do que ontem, menos do que amanhã 💞",
  "Você é meu destino e minha paz 🌹",
  "Nada é mais lindo que o seu olhar ✨",
  "Você me faz feliz demais 😍",
  "Obrigado por existir 💝",
  "Meu amor por você é infinito ♾️",
  "Você é minha melhor escolha 💖",
  "Te amo mais do que palavras podem dizer 💬",
];

let posicoes = [];
let indicePosicao = 0;

function gerarPosicoes() {
  const largura = window.innerWidth;
  const total = Math.max(1, Math.floor(largura / 180));
  posicoes = [];

  for (let i = 0; i < total; i++) {
    posicoes.push(40 + i * 180);
  }

  indicePosicao = 0;
}

gerarPosicoes();
window.addEventListener('resize', gerarPosicoes);

function criarBalaoDigitando(texto) {
  const balao = document.createElement('div');
  balao.className = 'balao';

  let leftPos = posicoes[indicePosicao];
  balao.style.left = leftPos + 'px';

  indicePosicao = (indicePosicao + 1) % posicoes.length;

  balao.style.bottom = '120px';

  const duracao = 8 + Math.random() * 4;
  balao.style.animation = `subir ${duracao}s linear forwards`;

  document.body.appendChild(balao);

  let i = 0;
  function digitar() {
    if (i < texto.length) {
      balao.textContent += texto[i];
      i++;
      setTimeout(digitar, 30);
    }
  }
  digitar();

  setTimeout(() => {
    balao.remove();
  }, duracao * 1000);
}

// botão mensagem
document.getElementById('btnMensagem').addEventListener('click', () => {
  const frase = mensagens[Math.floor(Math.random() * mensagens.length)];
  criarBalaoDigitando(frase);
});

const musica = document.getElementById('musicaFundo');
const btnMusica = document.getElementById('btnMusica');

musica.volume = 0.3;
let musicaPlaying = false;

function autoPlayMusic() {
  const playPromise = musica.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        musicaPlaying = true;
        btnMusica.textContent = '🎵 Pausar';
        btnMusica.classList.add('playing');
      })
      .catch(() => { });
  }
}

window.addEventListener('load', autoPlayMusic);

document.addEventListener('click', () => {
  if (!musicaPlaying) autoPlayMusic();
}, { once: true });

btnMusica.addEventListener('click', () => {
  if (musica.paused) {
    musica.play();
    btnMusica.textContent = '🎵 Pausar';
    btnMusica.classList.add('playing');
    musicaPlaying = true;
  } else {
    musica.pause();
    btnMusica.textContent = '🎵 Reproduzir';
    btnMusica.classList.remove('playing');
    musicaPlaying = false;
  }
});
