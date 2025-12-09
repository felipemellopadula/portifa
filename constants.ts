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
      { layout: 'full', items: [{ type: 'image', url: '/images/monstro_final.gif' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/02_menor.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/05.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/07.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/01.png' }] },
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
    description: "Para lançar Audi A6 e-tron no Brasil, criamos uma collab que é puro luxo: uma edição inédita e limitada de relógios Cartier A6. Uma verdadeira celebração ao tempo de rápido carregamento do carro elétrico.",
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
      { layout: 'full', items: [{ type: 'image', url: '/images/abertura.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/aero4.png' }] },
      { 
        layout: 'full', 
        items: [
          { 
            type: 'image', 
            url: '/images/close_fita_caixa.png',
            className: 'max-h-[600px] object-cover w-full' 
          }
        ] 
      },
      { layout: 'full', items: [{ type: 'image', url: '/images/faixa.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/Instagram.webp' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/telaonovo.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/push.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/stories.png' }] },
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
    description: "A água de coco Amazônia tem o propósito de levar o sabor e a força da nossa floresta para o mundo. Para marcar as novas embalagens do produto, criamos 72 imagens em 3D, destacando a identidade brasileira em cada detalhe, cores, formas e a energia única da Amazônia.",
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/comp2.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/am.jpg' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/out1.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/out2.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/am2.jpg' }] },
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
    description: "Em Nova York, a Yurban2030 lança uma campanha para chamar atenção ao impacto ambiental nas grandes cidades. Com o conceito Nature Asks for Help, a marca transforma o pedido de socorro da natureza em movimento cultural e urbano.",
    mediaSections: [
      { layout: 'full', items: [{ type: 'image', url: '/images/sos1.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/sos2.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/sos3.png' }] },
      { layout: 'full', items: [{ type: 'image', url: '/images/sos4.png' }] },
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
        { layout: 'full', items: [{ type: 'image', url: '/images/A.jpg' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/bill.jpg' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/D.png' }] },
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
    description: "Skol Beats lança uma campanha que celebra a identidade única de cada festa. Com o conceito Toda Bibe Tem um Som, a marca transforma o universo das “bibas” em ritmo, cor e atitude.",
    mediaSections: [
        { layout: 'full', items: [{ type: 'image', url: '/images/09a.jpg' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/10.jpg' }] },
        { layout: 'full', items: [{ type: 'image', url: '/images/09b.png' }] },
    ]
  }
];