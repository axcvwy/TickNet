import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Show = {
  id: string
  title: string
  description?: string
  image?: string
  price: number
  date: string
  genre?: string
}

const SAMPLE: Show[] = [
  { id: 's1', title: 'Le Fantôme', description: 'Drame mystérieux.', price: 25, date: '2025-12-05T20:00:00', genre: 'Théâtre', image: '/images/show1.svg' },
  { id: 's2', title: 'Comédie du Soir', description: 'Rires assurés.', price: 18, date: '2025-12-10T19:00:00', genre: 'Comédie', image: '/images/show2.svg' },
  { id: 's3', title: 'Concert Classique', description: 'Mélodies envoûtantes.', price: 30, date: '2025-12-15T20:30:00', genre: 'Musique', image: '/images/show3.svg' }
]

function loadFromStorage(){
  try{
    const raw = localStorage.getItem('shows')
    if(!raw) return SAMPLE.slice()
    return JSON.parse(raw) as Show[]
  }catch(e){
    return SAMPLE.slice()
  }
}

function saveToStorage(shows: Show[]){
  try{ localStorage.setItem('shows', JSON.stringify(shows)) }catch(e){}
}

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<Show[]>(loadFromStorage())

  function addShow(payload: Partial<Show>){
    const id = 's' + Date.now()
    const s: Show = { id, title: payload.title || 'Nouveau spectacle', description: payload.description || '', image: payload.image || '', price: payload.price || 0, date: payload.date || new Date().toISOString(), genre: payload.genre || '' }
    shows.value.push(s)
    saveToStorage(shows.value)
    return s
  }

  function updateShow(id: string, payload: Partial<Show>){
    const idx = shows.value.findIndex(s=>s.id===id)
    if(idx === -1) return null
    shows.value[idx] = { ...shows.value[idx], ...payload }
    saveToStorage(shows.value)
    return shows.value[idx]
  }

  function removeShow(id: string){
    shows.value = shows.value.filter(s=>s.id!==id)
    saveToStorage(shows.value)
  }

  const upcoming = computed(() => shows.value.slice().sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime()))

  return { shows, upcoming, addShow, updateShow, removeShow }
})
