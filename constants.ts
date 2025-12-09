// src/constants.ts
import { Project } from './types';

export const DEFAULT_COLOR = '#5340ff';

export const PROJECTS: Project[] = [
  // === PROJETO 1: BIG MAC ===
  {
    id: '1',
    year: '2025',
    role: 'Direção de Arte',
    title: 'BIG MAC / McDONALD\'S',
    color: '#DC0000', 
    detailBg: '#EBD5AB', 
    isDarkText: true, 
    agency: 'Miami Ad School',
    client: "McDonald's",
    description: "Todo mundo já ouviu falar na expressão fome de monstro. Pensando nisso, criamos uma campanha divertida de Big Mac onde criaturas gigantes, representando a fome, invadem o McDonald's com aquele apetite impossível de ignorar. A cada hora, nossos funcionários enfrentam o desafio de alimentar essas feras de maneiras cada vez mais inusitadas.",
    technicalDetails: [ "React", "GSAP" ],
    testimonial: { text: "Amazing work.", author: "Sarah Jenkins" },
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/monstro_final.gif' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/02_menor.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/05.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/07.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/01.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/08.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/09.png' }] }
    ]
  },

  // === PROJETO 2: AI FRYER ===
  {
    id: '2',
    year: '2025',
    role: 'Direção de Arte',
    title: 'AI FRYER / PHILIPS WALITA',
    color: '#9CC6DB',
    agency: 'Miami Ad School',
    client: 'Philips Walita',
    description: "A Gen Z busca uma alimentação prática, saudável e consciente. Para aproximar esse público, nativo digital, da Philips Walita, criamos a 1ª airfryer que fala a língua deles: conectada à Inteligência Artificial e à expertise culinária de três creators gastronômicos do TikTok. Uma experiência que une tecnologia, criatividade e sabor.",
    technicalDetails: [ "Live Streaming Integration", "Real-time Social Feed", "Interactive Lookbook", "PWA Implementation" ],
    mediaSections: [
       { layout: 'full', items: [{ type: 'image', url: '/images/kv04.png', alt: 'Key Visual' }] },
       { layout: 'columns-4', items: [{ type: 'image', url: '/images/cel1.webp' }, { type: 'image', url: '/images/cel2.webp' }, { type: 'image', url: '/images/cel3.webp' }, { type: 'image', url: '/images/cel4.webp' }] },
       { layout: 'full', items: [{ type: 'image', url: '/images/anuncio.png', alt: 'Anúncio' }] },
       { layout: 'full', items: [{ type: 'image', url: '/images/gridB.webp' }] },
       { layout: 'carousel-split', items: [{ type: 'image', url: '/images/carr1.webp' }, { type: 'image', url: '/images/carr2.webp' }, { type: 'image', url: '/images/carr3.webp' }, { type: 'image', url: '/images/carr4.webp' }, { type: 'image', url: '/images/carr5.webp' }, { type: 'video', url: '/images/reels_2_correto.mp4', alt: 'Reels Video' }] },
       { layout: 'grid', items: [{ type: 'image', url: '/images/ooh6.png' }, { type: 'image', url: '/images/ooh7.png' }] },
       { layout: 'full', items: [{ type: 'image', url: '/images/livro04.png' }] }
    ]
  },
  
  // === PROJETO 3: AUDI ===
  {
    id: '3',
    year: '2025',
    role: 'Direção de Arte',
    title: 'AUDI A6 / E-TRON', 
    color: '#222831',
    agency: 'Miami Ad School',
    client: 'Audio A6 E-Tron',
    description: "Transformamos o tempo, o verdadeiro luxo da classe A, no centro desta campanha. Para executivos e executivas, ele significa liberdade, autonomia e a chance de dedicar energia ao que realmente importa. E foi dessa relação com o tempo que nasceu o Cartier A6, uma edição limitada criada a partir da união entre dois ícones de luxo e tecnologia.",
    mediaSections: [
        { layout: 'full', items: [{ type: 'image', url: '/images/kv-audi.png' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/Gemini_Generated_Image_3h8xk03h8xk03h8x.png' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/Gemini_Generated_Image_5djhcg5djhcg5djh.png' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/Gemini_Generated_Image_z8xi00z8xi00z8xi.png' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/Digitais-Embarque-Centralizado-_-Aeroporto-de-Guarulhos-(GRU).jpg' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/mockup-aeroporto.png' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/oohaudi.png' }] },
        { layout: 'grid', items: [{ type: 'image', url: '/images/Gemini_Generated_Image_27v1ac27v1ac27v1.png' }, { type: 'image', url: '/images/Gemini_Generated_Image_hats8ahats8ahats.png' }] },
        { layout: 'grid', items: [{ type: 'image', url: '/images/Gemini_Generated_Image_f6affdf6affdf6af.png' }, { type: 'image', url: '/images/Gemini_Generated_Image_fmabtefmabtefmab.png' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/Gemini_Generated_Image_o0y03mo0y03mo0y0.png' }] },
    ]
  },

  // === PROJETO 4: MERCADO LIVRE (ATUALIZADO) ===
  {
    id: '4',
    year: '2025',
    role: 'Direção de Arte',
    title: 'MERCADO LIVRE', 
    color: '#ffe600', 
    isDarkText: true, 
    detailBg: '#ffe600', 
    agency: 'Miami Ad School',
    client: 'Mercado Livre',
    description: "Para a final da Libertadores, o Mercado Livre, patrocinador oficial, mostrou que sua entrega é tão rápida quanto a paixão do torcedor. Criamos uma campanha onde a velocidade da entrega se conecta com a urgência e a emoção de viver o futebol, garantindo que nada falte na hora do jogo.",
    
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/abertura.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/aero4.png' }] },
      
      // --- MUDANÇA AQUI ---
      // Adicionei a classe 'max-h-[600px] object-cover' para limitar a altura da imagem
      { 
        layout: 'full', 
        items: [
          { 
            type: 'image', 
            url: '/images/close_fita_caixa.png',
            // Adicione esta propriedade 'className' para aplicar classes extras na imagem
            className: 'max-h-[600px] object-cover w-full' 
          }
        ] 
      },
      
      { layout: 'full', items: [{ type: 'image', url: '/images/faixa.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/telaonovo.png' }] },
    ]
  },
  
  // === OUTROS PROJETOS ===
  {
    id: '5',
    year: '2021',
    role: 'DevOps',
    title: 'YET ONE',
    color: '#ff9f1c',
    client: 'Server Mesh',
    description: "Visualizing the invisible.",
    mediaSections: []
  },
  {
    id: '6',
    year: '2020',
    role: 'Strategy',
    title: 'LAST ONE',
    color: '#2ec4b6',
    client: 'StartUp Inc',
    description: "From zero to one.",
    mediaSections: []
  }
];