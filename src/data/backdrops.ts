import culturaAlto from '../assets/cultura/bg-alto.jpg'
import culturaCannon from '../assets/cultura/bg-cannon.jpg'
import culturaEntardecer from '../assets/cultura/bg-entardecer.jpg'
import culturaFalesia from '../assets/cultura/bg-falesia.jpg'
import evaLua from '../assets/eva/eva-lua.jpg'
import evaTokyo from '../assets/eva/eva-tokyo.jpg'
import evaVerde from '../assets/eva/eva-verde.jpg'
import evaVermelho from '../assets/eva/eva-vermelho.jpg'
import igrejaCristo from '../assets/igreja/bg-cristo.jpg'
import igrejaMaria from '../assets/igreja/bg-maria.jpg'
import igrejaMiguel from '../assets/igreja/bg-miguel.jpg'
import igrejaPoster from '../assets/igreja/bg-poster.jpg'
import athens from '../assets/mental/athens.jpg'
import mentalCampo from '../assets/mental/bg-campo.jpg'
import mentalLago from '../assets/mental/bg-lago.jpg'
import sistine from '../assets/mental/sistine.jpg'
import transfiguration from '../assets/mental/transfiguration.jpg'
import venus from '../assets/mental/venus.jpg'
import cultura from '../assets/paisagens/cultura.jpg'
import concorde from '../assets/profissional/bg-concorde.jpg'
import ufo from '../assets/profissional/bg-ufo.jpg'
import upside from '../assets/profissional/bg-upside.jpg'
import officeFear from '../assets/trabalho/bg-fear.jpg'
import officePoster from '../assets/trabalho/bg-poster.jpg'

// Fundo de cada módulo (components/ThemeBackdrop.tsx): imagens fixas atrás da página que se trocam.
// - scroll: a cada ~uma tela rolada entra a próxima, com uma linha de varredura (o efeito do Evangelion);
// - section: a imagem acompanha o grupo que está na tela (Igreja: Espiritualidade, Teologia pura...) e
//   troca com um esmaecimento lento.
// Origem: UEM, Igreja, Profissional e Trabalho são referências que o dono pôs em ../refs/; praias e
// campos são CC0 de ../refs/paisagens/; Rafael e Botticelli são domínio público do Wikimedia Commons.
// `pos` é o ponto da imagem que fica à vista no recorte; `tint` é a cor da varredura quando ela entra.
export interface BackdropImage {
  src: string
  pos: string
  tint: string
}

export interface Backdrop {
  mode: 'scroll' | 'section'
  images: BackdropImage[]
  tag: string // etiqueta miúda no canto da tela
}

export const backdrops: Record<string, Backdrop> = {
  uem: {
    mode: 'scroll',
    tag: 'EVA UNIT 01 · SYNC',
    images: [
      { src: evaTokyo, pos: '60% 30%', tint: '#d12a2a' },
      { src: evaVerde, pos: '40% 35%', tint: '#8cf03a' },
      { src: evaVermelho, pos: '55% 40%', tint: '#ff3b30' },
      { src: evaLua, pos: '50% 30%', tint: '#a98bff' },
    ],
  },
  // Um por assunto, na ordem: Espiritualidade, Teologia pura, Sentimentos humanos, Maturidade espiritual
  igreja: {
    mode: 'section',
    tag: 'AD MAIOREM DEI GLORIAM',
    images: [
      { src: igrejaMaria, pos: '50% 22%', tint: '#dcaa3c' },
      { src: igrejaPoster, pos: '50% 30%', tint: '#dcaa3c' },
      { src: igrejaCristo, pos: '50% 25%', tint: '#dcaa3c' },
      { src: igrejaMiguel, pos: '50% 28%', tint: '#dcaa3c' },
    ],
  },
  trabalho: {
    mode: 'scroll',
    tag: 'DUNDER MIFFLIN · SCRANTON, PA',
    images: [
      { src: officePoster, pos: '50% 20%', tint: '#d9432f' },
      { src: officeFear, pos: '50% 35%', tint: '#f2b82e' },
    ],
  },
  profissional: {
    mode: 'scroll',
    tag: 'FLIGHT 01 · DADOS + IA',
    images: [
      { src: concorde, pos: '50% 45%', tint: '#e2b93b' },
      { src: ufo, pos: '50% 35%', tint: '#e8318f' },
      { src: upside, pos: '50% 50%', tint: '#ee7a2c' },
    ],
  },
  cultura: {
    mode: 'scroll',
    tag: 'REPERTÓRIO · MARÉ',
    images: [
      { src: cultura, pos: '50% 50%', tint: '#7cc4f0' },
      { src: culturaCannon, pos: '50% 55%', tint: '#e8d3a8' },
      { src: culturaFalesia, pos: '50% 50%', tint: '#7cc4f0' },
      { src: culturaAlto, pos: '50% 60%', tint: '#e8d3a8' },
      { src: culturaEntardecer, pos: '50% 55%', tint: '#f0a868' },
    ],
  },
  mental: {
    mode: 'scroll',
    tag: 'SURSUM CORDA',
    images: [
      { src: transfiguration, pos: '50% 18%', tint: '#c9a24a' },
      { src: sistine, pos: '50% 30%', tint: '#b23a2a' },
      { src: mentalLago, pos: '50% 55%', tint: '#c9a24a' },
      { src: athens, pos: '50% 45%', tint: '#b23a2a' },
      { src: venus, pos: '50% 35%', tint: '#c9a24a' },
      { src: mentalCampo, pos: '50% 55%', tint: '#b23a2a' },
    ],
  },
}
