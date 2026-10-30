import aquinas from '../assets/igreja/aquinas.jpg'
import emmaus from '../assets/igreja/emmaus.jpg'
import getsemani from '../assets/igreja/getsemani.jpg'
import matthew from '../assets/igreja/matthew.jpg'
import prodigal from '../assets/igreja/prodigal.jpg'
import inicio from '../assets/paisagens/inicio.jpg'
import mentalPhoto from '../assets/paisagens/mental.jpg'
import profissional from '../assets/paisagens/profissional.jpg'
import trabalho from '../assets/paisagens/trabalho.jpg'
import uem from '../assets/paisagens/uem.jpg'

// Obras em domínio público e fotos CC0, do Wikimedia Commons (verificadas em 27/10/2026). Ficam dentro do app para funcionar offline.
export interface Artwork {
  src: string
  credit: string
  source?: string // sem endereço, o crédito aparece só como texto
  position?: string // object-position do recorte
}

// Imagem do topo de cada módulo que tem uma.
export const covers: Record<string, Artwork> = {
  // Escolhida pelo dono em 29/10/2026, no lugar do São Miguel de Guido Reni (michael.jpg, sem uso). Animada em components/Gethsemane.tsx.
  igreja: {
    src: getsemani,
    credit: 'Heinrich Hofmann, Cristo no Getsêmani, 1886',
    source: 'https://commons.wikimedia.org/wiki/File:Christ_in_Gethsemane.jpg',
  },
}

// Imagem de cada grupo, pelo título. Grupo criado depois fica sem imagem.
export const groupArt: Record<string, Record<string, Artwork>> = {
  igreja: {
    Espiritualidade: {
      src: emmaus,
      credit: 'Caravaggio, Ceia em Emaús, 1601',
      source: 'https://commons.wikimedia.org/wiki/File:Supper_at_Emmaus-Caravaggio_(1601).jpg',
      position: '52% 30%',
    },
    Teologia: {
      src: aquinas,
      credit: 'Carlo Crivelli, São Tomás de Aquino, 1476',
      source: 'https://commons.wikimedia.org/wiki/File:St-thomas-aquinas.jpg',
      position: '55% 18%',
    },
    'Nosso coração': {
      src: prodigal,
      credit: 'Rembrandt, O retorno do filho pródigo, c. 1668',
      source: 'https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg',
      position: '30% 45%',
    },
    'Maturidade espiritual': {
      src: matthew,
      credit: 'Caravaggio, A vocação de São Mateus, 1599–1600',
      source: 'https://commons.wikimedia.org/wiki/File:The_Calling_of_Saint_Matthew-Caravaggo_(1599-1600).jpg',
      position: '70% 55%',
    },
  },
}

export const artFor = (moduleId: string, groupTitle?: string) =>
  groupTitle ? groupArt[moduleId]?.[groupTitle] : undefined

// Fotos de paisagem (CC0) da página inicial. Igreja usa a própria capa.
export const landscapes: Record<string, Artwork> = {
  inicio: {
    src: inicio,
    credit: 'Jon Flobrant, montanha erodida na Islândia',
    source: 'https://commons.wikimedia.org/wiki/File:Eroded_Icelandic_mountain_(Unsplash).jpg',
    position: '50% 60%',
  },
  profissional: {
    src: profissional,
    credit: 'Stellan Johansson, antena de radiotelescópio',
    source: 'https://commons.wikimedia.org/wiki/File:Sending_Signals_(Unsplash).jpg',
    position: '50% 40%',
  },
  trabalho: {
    src: trabalho,
    credit: 'Albinfo, vila e lotes vistos do avião',
    source: 'https://commons.wikimedia.org/wiki/File:Rinas_village_aerial_view.jpg',
  },
  uem: {
    src: uem,
    credit: 'Victoria Heath, pátio do campus da Universidade de Toronto',
    source: 'https://commons.wikimedia.org/wiki/File:Sir_Daniel_Wilson_Quadrangle_-_St._George_Campus,_Toronto,_Canada.jpg',
    position: '60% 60%',
  },
  mental: {
    src: mentalPhoto,
    credit: 'Blair Fraser, falésia verde e mar calmo',
    source: 'https://commons.wikimedia.org/wiki/File:Green_Cliff_Calm_Sea_(Unsplash).jpg',
  },
}

export const bannerFor = (moduleId: string) => landscapes[moduleId] ?? covers[moduleId]
