import aquinas from '../assets/igreja/aquinas.jpg'
import emmaus from '../assets/igreja/emmaus.jpg'
import matthew from '../assets/igreja/matthew.jpg'
import michael from '../assets/igreja/michael.jpg'
import prodigal from '../assets/igreja/prodigal.jpg'
import adam from '../assets/mental/adam.jpg'
import athens from '../assets/mental/athens.jpg'
import vitruvian from '../assets/mental/vitruvian.jpg'
import cultura from '../assets/paisagens/cultura.jpg'
import inicio from '../assets/paisagens/inicio.jpg'
import profissional from '../assets/paisagens/profissional.jpg'
import trabalho from '../assets/paisagens/trabalho.jpg'
import uem from '../assets/paisagens/uem.jpg'

// Obras em domínio público e fotos CC0, do Wikimedia Commons (verificadas em 27/10/2026). Ficam dentro do app para funcionar offline.
export interface Artwork {
  src: string
  credit: string
  source: string
  position?: string // object-position do recorte
}

// Imagem do topo de cada módulo que tem uma.
export const covers: Record<string, Artwork> = {
  igreja: {
    src: michael,
    credit: 'Guido Reni, São Miguel Arcanjo, c. 1636',
    source: 'https://commons.wikimedia.org/wiki/File:Guido_Reni_031.jpg',
    position: '50% 22%',
  },
  mental: {
    src: adam,
    credit: 'Michelangelo, A criação de Adão, c. 1512',
    source: 'https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg',
    position: '58% 40%',
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
    'Teologia pura': {
      src: aquinas,
      credit: 'Carlo Crivelli, São Tomás de Aquino, 1476',
      source: 'https://commons.wikimedia.org/wiki/File:St-thomas-aquinas.jpg',
      position: '55% 18%',
    },
    'Sentimentos humanos': {
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
  mental: {
    'Para os dias de desânimo': {
      src: athens,
      credit: 'Rafael, A Escola de Atenas, 1509–1511',
      source: 'https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
      position: '50% 45%',
    },
    'Minhas razões': {
      src: vitruvian,
      credit: 'Leonardo da Vinci, Homem Vitruviano, c. 1490',
      source: 'https://commons.wikimedia.org/wiki/File:Da_Vinci_Vitruve_Luc_Viatour_(cropped).jpg',
      position: '50% 40%',
    },
  },
}

export const artFor = (moduleId: string, groupTitle?: string) =>
  groupTitle ? groupArt[moduleId]?.[groupTitle] : undefined

// Fotos de paisagem (CC0) da página inicial. Igreja e Mental usam a própria capa.
export const landscapes: Record<string, Artwork> = {
  inicio: {
    src: inicio,
    credit: 'Jon Flobrant, montanha erodida na Islândia',
    source: 'https://commons.wikimedia.org/wiki/File:Eroded_Icelandic_mountain_(Unsplash).jpg',
    position: '50% 60%',
  },
  profissional: {
    src: profissional,
    credit: 'Anders Jildén, estrada na Islândia',
    source: 'https://commons.wikimedia.org/wiki/File:Iceland_roads_(Unsplash).jpg',
    position: '50% 55%',
  },
  trabalho: {
    src: trabalho,
    credit: 'Wann Majaw, arrozais vistos do alto',
    source: 'https://commons.wikimedia.org/wiki/File:Rice_fields_Aerial.jpg',
  },
  uem: {
    src: uem,
    credit: 'Vovogov90, trilha de floresta no outono',
    source: 'https://commons.wikimedia.org/wiki/File:Autumn_Forest_Path_with_Tall_Trees.jpg',
  },
  cultura: {
    src: cultura,
    credit: 'Blair Fraser, falésia verde e mar calmo',
    source: 'https://commons.wikimedia.org/wiki/File:Green_Cliff_Calm_Sea_(Unsplash).jpg',
  },
}

export const bannerFor = (moduleId: string) => landscapes[moduleId] ?? covers[moduleId]
