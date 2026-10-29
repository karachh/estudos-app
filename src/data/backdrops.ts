import bebopBlocos from '../assets/bebop/bebop-blocos.jpg'
import bebopCapa from '../assets/bebop/bebop-capa.jpg'
import bebopJornal from '../assets/bebop/bebop-jornal.jpg'
import bebopOlho from '../assets/bebop/bebop-olho.jpg'
import bebopSepia from '../assets/bebop/bebop-sepia.jpg'
import cosmosCidade from '../assets/cosmos/cidade.jpg'
import cosmosNebulosa from '../assets/cosmos/nebulosa.jpg'
import cosmosSolNuvens from '../assets/cosmos/sol-nuvens.jpg'
import cosmosSolSepia from '../assets/cosmos/sol-sepia.jpg'
import cosmosTerraCruz from '../assets/cosmos/terra-cruz.jpg'
import evaLua from '../assets/eva/eva-lua.jpg'
import evaTokyo from '../assets/eva/eva-tokyo.jpg'
import evaVerde from '../assets/eva/eva-verde.jpg'
import evaVermelho from '../assets/eva/eva-vermelho.jpg'
import igrejaCristo from '../assets/igreja/bg-cristo.jpg'
import igrejaMaria from '../assets/igreja/bg-maria.jpg'
import igrejaMiguel from '../assets/igreja/bg-miguel.jpg'
import igrejaPoster from '../assets/igreja/bg-poster.jpg'
import mentalAlto from '../assets/mental/bg-alto.jpg'
import mentalCannon from '../assets/mental/bg-cannon.jpg'
import mentalEntardecer from '../assets/mental/bg-entardecer.jpg'
import mentalFalesia from '../assets/mental/bg-falesia.jpg'
import mentalCover from '../assets/paisagens/mental.jpg'
import officeComic from '../assets/trabalho/bg-comic.jpg'
import officeFear from '../assets/trabalho/bg-fear.jpg'
import officePoster from '../assets/trabalho/bg-poster.jpg'
import officeRedstar from '../assets/trabalho/bg-redstar.jpg'

// Fundo de cada módulo (components/ThemeBackdrop.tsx): imagens fixas atrás da página que se trocam.
// - scroll: a cada ~uma tela rolada entra a próxima, com uma linha de varredura (o efeito do Evangelion);
// - section: a imagem acompanha o grupo que está na tela (Igreja: Espiritualidade, Teologia pura...) e
//   troca com um esmaecimento lento.
// Origem: UEM, Igreja, Profissional (cosmos), Repertório (bebop) e Trabalho são referências que o dono pôs
// em ../refs/; praias são CC0 de ../refs/paisagens/ (hoje no Motivação).
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
  // Um por assunto, na ordem: Espiritualidade, Teologia pura, Nosso coração, Maturidade espiritual
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
      { src: officeRedstar, pos: '50% 60%', tint: '#d9432f' },
      { src: officeFear, pos: '50% 35%', tint: '#f2b82e' },
      { src: officeComic, pos: '50% 45%', tint: '#d9432f' },
    ],
  },
  // Profissional: o sol vermelho sobre o mar de nuvens, a Terra com a cruz de luz, a nebulosa e a cidade
  profissional: {
    mode: 'scroll',
    tag: 'OBSERVATÓRIO · DADOS + IA',
    images: [
      { src: cosmosCidade, pos: '50% 78%', tint: '#ece4cf' },
      { src: cosmosSolNuvens, pos: '50% 40%', tint: '#ee5a35' },
      { src: cosmosTerraCruz, pos: '50% 50%', tint: '#f0a860' },
      { src: cosmosNebulosa, pos: '50% 35%', tint: '#a58bff' },
      { src: cosmosSolSepia, pos: '50% 45%', tint: '#ee5a35' },
    ],
  },
  // Repertório: os pôsteres de Cowboy Bebop
  cultura: {
    mode: 'scroll',
    tag: 'SEE YOU SPACE COWBOY…',
    images: [
      { src: bebopCapa, pos: '50% 30%', tint: '#f2c230' },
      { src: bebopJornal, pos: '50% 20%', tint: '#e7b8c4' },
      { src: bebopBlocos, pos: '50% 40%', tint: '#3b7de0' },
      { src: bebopSepia, pos: '50% 30%', tint: '#e5453a' },
      { src: bebopOlho, pos: '50% 35%', tint: '#e5453a' },
    ],
  },
  // Motivação ficou com as praias que eram do Repertório
  mental: {
    mode: 'scroll',
    tag: 'MOTIVAÇÃO · MARÉ',
    images: [
      { src: mentalCover, pos: '50% 50%', tint: '#7cc4f0' },
      { src: mentalCannon, pos: '50% 55%', tint: '#e8d3a8' },
      { src: mentalFalesia, pos: '50% 50%', tint: '#7cc4f0' },
      { src: mentalAlto, pos: '50% 60%', tint: '#e8d3a8' },
      { src: mentalEntardecer, pos: '50% 55%', tint: '#f0a868' },
    ],
  },
}
