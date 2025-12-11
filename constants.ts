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
    description: "Campanha para Big Mac, o ícone absoluto do McDonald’s no mundo. Para reforçar que ele mata qualquer tipo de fome, trouxemos personagens gigantes da cultura global, facilmente reconhecíveis, com uma linguagem superlativa e bem-humorada.",
    technicalDetails: [ "React", "GSAP" ],
    // testimonial removido aqui
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/video.mp4' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/02mc.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/03mc.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/04mc.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/01mc.webp' }] },
    ], // <--- ADICIONEI ESTA VÍRGULA E O COLCHETE DE FECHAMENTO
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
       { layout: 'full', items: [{ type: 'image', url: '/images/kv04menor.webp', alt: 'Key Visual' }] },
       { layout: 'columns-4', items: [{ type: 'image', url: '/images/cel1.webp' }, { type: 'image', url: '/images/cel2.webp' }, { type: 'image', url: '/images/cel3.webp' }, { type: 'image', url: '/images/cel4.webp' }] },
       { layout: 'full', items: [{ type: 'image', url: '/images/anunciomenor.webp', alt: 'Anúncio' }] },
       { layout: 'full', items: [{ type: 'image', url: '/images/gridBmenor.webp' }] },
       { layout: 'carousel-split', items: [{ type: 'image', url: '/images/carr1.webp' }, { type: 'image', url: '/images/carr2.webp' }, { type: 'image', url: '/images/carr3.webp' }, { type: 'image', url: '/images/carr4.webp' }, { type: 'image', url: '/images/carr5.webp' }, { type: 'video', url: '/images/reels_2_correto.webm', alt: 'Reels Video' }] },
       { layout: 'grid', items: [{ type: 'image', url: '/images/oohfryer1.webp' }, { type: 'image', url: '/images/oohfryer3.webp' }] },
       { layout: 'full', items: [{ type: 'image', url: '/images/livro04menor.webp' }] }
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
    description: "Para lançar Audi A6 e-tron no Brasil, criamos uma collab que é puro luxo: uma edição inédita e limitada de relógios Cartier A6. Uma verdadeira celebração ao tempo de rápido carregamento do carro elétrico.",
    mediaSections: [
        { layout: 'full', items: [{ type: 'image', url: '/images/kv-audi.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/carteir01.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/cartier2.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/cartier4.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/cartier7.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/mockup-aeroporto-menor.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/oohaudimenor.webp' }] },
        { layout: 'grid', items: [{ type: 'image', url: '/images/cartier3.webp' }, { type: 'image', url: '/images/cartier8.webp' }] },
        { layout: 'grid', items: [{ type: 'image', url: '/images/cartier10.webp' }, { type: 'image', url: '/images/cartier9.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/cartier11.webp' }] },
    ]
  },

  // === PROJETO 4: MERCADO LIVRE ===
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
    description: "Mercado Livre é patrocinador oficial da Conmebol Libertadores. Na partida final entre Flamengo e Palmeiras, em Lima, Peru, ativamos a marca através do conceito Entrega Campeã. Mercado Livre entregou para a torcida, ainda no estádio, a nova camisa do título - a tempo de comemorar com o time do coração.",
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/aberturamenor2.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/aero5menor.webp' }] },
      { 
        layout: 'full', 
        items: [
          { 
            type: 'image', 
            url: '/images/close_fita_caixamenor.webp',
            className: 'max-h-[600px] object-cover w-full' 
          }
        ] 
      },
      { layout: 'full', items: [{ type: 'image', url: '/images/faixa_menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/Instagram.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/telaonovomenor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/pushmenor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/storiesmenor.webp' }] },
    ]
  },
  
  // === PROJETO 5: ÁGUA DE COCO AMAZÔNIA ===
  {
    id: '5',
    year: '2025',
    role: 'Direção de Arte',
    title: 'Água de Coco Amazônia',
    agency: "Ogilvy",
    color: '#51b36a',
    client: 'Água de Coco Amazônia',
    description: "A água de Coco Amazônia criou uma nova linha de embalagens exclusivas. Para marcar a chegada das novas embalagens no mercado, criamos 72 imagens em 3D, destacando a identidade da marca e um pouco da cultura do nosso país em ilustrações que saíram nos Estados Unidos, França e Nos Emirados Árabes Unidos.",
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/comp2menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/out4menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/am.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/out1.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/out5menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/out6menor.webp' }] },
    ]
  },

  // === PROJETO 6: YOURBAN2030 ===
  {
    id: '6',
    year: '2025',
    role: 'Direção de Arte',
    title: 'Yourban2030',
    color: '#2ec4b6',
    agency: "Magla Creative LA",
    client: 'Yourban2030',
    description: "Em Nova York, a Yurban2030 lança uma campanha visual de social media para chamar atenção ao impacto ambiental no planeta. Com o conceito Nature Asks for Help, a marca transforma o pedido de socorro da natureza em movimento cultural e urbano.",
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/sos1menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/sos2menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/sos3menor.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/sos4menor.webp' }] },
    ]
  },
  
  // === PROJETO 7: ESPN ===
  {
    id: '7',
    year: '2025',
    role: 'Direção de Arte',
    title: 'ESPN',
    color: '#00B7B5',
    agency: "Projeto Pessoal",
    client: 'ESPN',
    description: "A ESPN lança uma campanha que coloca em foco a intensidade e o esforço diário dos atletas. Com o conceito É Pura Emoção, a marca transforma cada sacrifício, vitória e superação em narrativa poderosa.",
    mediaSections: [
        { layout: 'full', items: [{ type: 'image', url: '/images/espn3.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn1.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn2.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn4.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn9.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn5.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn6.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn7.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/espn8.webp' }] },
    ]
  },

  // === PROJETO 8: SKOL BEATS ===
  {
    id: '8',
    year: '2025',
    role: 'Direção de Arte',
    title: 'SKOL BEATS',
    color: '#7132CA',
    agency: 'Projeto Pessoal',
    client: 'Skol Beats',
    description: "Skol Beats lança uma campanha que celebra a identidade única de cada festa. Com o conceito Toda Vibe Tem um Som, a marca transforma o universo das “bibas” em ritmo, cor e atitude.",
    mediaSections: [
        { layout: 'full', items: [{ type: 'image', url: '/images/beats1.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/beats2.webp' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/beats3.webp' }] },
         { layout: 'full', items: [{ type: 'image', url: '/images/beats4.webp' }] },
         { layout: 'full', items: [{ type: 'image', url: '/images/beats5.webp' }] },
         { layout: 'full', items: [{ type: 'image', url: '/images/beats7.webp' }] },
    ]
  }
];