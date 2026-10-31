import bebopBlocos from '../assets/bebop/bebop-blocos.jpg'
import bebopCapa from '../assets/bebop/bebop-capa.jpg'
import bebopJornal from '../assets/bebop/bebop-jornal.jpg'
import bebopOlho from '../assets/bebop/bebop-olho.jpg'
import bebopSepia from '../assets/bebop/bebop-sepia.jpg'
import evaLua from '../assets/eva/eva-lua.jpg'
import evaTokyo from '../assets/eva/eva-tokyo.jpg'
import evaVerde from '../assets/eva/eva-verde.jpg'
import evaVermelho from '../assets/eva/eva-vermelho.jpg'
import fosCabecas from '../assets/fosforo/cabecas.jpg'
import fosNavio from '../assets/fosforo/navio.jpg'
import fosRetrato from '../assets/fosforo/retrato-ascii.jpg'
import igrejaCristo from '../assets/igreja/bg-cristo.jpg'
import igrejaJose from '../assets/igreja/bg-jose.jpg'
import igrejaMaria from '../assets/igreja/bg-maria.jpg'
import igrejaPoster from '../assets/igreja/bg-poster.jpg'
import mentalLago from '../assets/mental/bg-lago.jpg'
import mentalOndas from '../assets/mental/bg-ondas.jpg'
import mentalSurf from '../assets/mental/bg-surf.jpg'
import officeComic from '../assets/trabalho/bg-comic.jpg'
import officeFear from '../assets/trabalho/bg-fear.jpg'
import officePoster from '../assets/trabalho/bg-poster.jpg'
import officeRedstar from '../assets/trabalho/bg-redstar.jpg'

// Fundo de cada módulo (components/ThemeBackdrop.tsx): imagens fixas atrás da página que se trocam.
// - scroll: a cada ~uma tela rolada entra a próxima, com uma linha de varredura (o efeito do Evangelion);
// - section: a imagem acompanha o grupo que está na tela (Igreja: Espiritualidade, Teologia...) e
//   troca com um esmaecimento lento.
// Origem: UEM, Igreja, Profissional (fosforo), Repertório (bebop) e Trabalho são referências que o dono pôs
// em refs/ (dentro do projeto); praias são CC0 de refs/paisagens/.
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
  // Um por assunto, na ordem: Espiritualidade, Teologia, Nosso coração, Maturidade espiritual
  igreja: {
    mode: 'section',
    tag: 'AD MAIOREM DEI GLORIAM',
    images: [
      { src: igrejaMaria, pos: '50% 22%', tint: '#dcaa3c' },
      { src: igrejaPoster, pos: '50% 30%', tint: '#dcaa3c' },
      { src: igrejaCristo, pos: '50% 25%', tint: '#dcaa3c' },
      { src: igrejaJose, pos: '50% 25%', tint: '#dcaa3c' }, // São José com o Menino, no lugar de São Miguel (29/10/2026)
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
  // Profissional: as três referências do monitor de fósforo, todas passadas pela mesma rampa de verde
  // (navio no scanner, cabeças em malha e o retrato em ASCII recortado da tela de BIOS), para o fundo parecer um monitor só
  profissional: {
    mode: 'scroll',
    tag: 'ESTUDOS BIOS · DADOS + IA',
    images: [
      { src: fosNavio, pos: '50% 35%', tint: '#7dff9a' },
      { src: fosCabecas, pos: '50% 40%', tint: '#7dff9a' },
      { src: fosRetrato, pos: '50% 30%', tint: '#ff7a24' },
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
  // Motivação: mar e lago das referências em ../refs/refs_motivacao_novo/ (as praias antigas estão em _arquivo/)
  mental: {
    mode: 'scroll',
    tag: 'MOTIVAÇÃO · MARÉ',
    images: [
      { src: mentalSurf, pos: '50% 45%', tint: '#5fa3a8' },
      { src: mentalOndas, pos: '50% 60%', tint: '#e8c987' },
      { src: mentalLago, pos: '50% 55%', tint: '#d6c27a' },
    ],
  },
}
