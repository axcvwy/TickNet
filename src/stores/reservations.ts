import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Reservation = {
  id: string
  userName: string
  userEmail: string
  showId: string
  nbPlaces: number
  totalAmount: number
  date: string
}

function load(){
  try{ const raw = localStorage.getItem('reservations'); return raw ? JSON.parse(raw) as Reservation[] : [] }catch(e){ return [] }
}

function save(items: Reservation[]){ try{ localStorage.setItem('reservations', JSON.stringify(items)) }catch(e){} }

export const useReservationsStore = defineStore('reservations', () => {
  const items = ref<Reservation[]>(load())

  function createReservation(payload: Omit<Reservation,'id'|'date'>){
    const id = 'r' + Date.now()
    const date = new Date().toISOString()
    const r = { id, date, ...payload }
    items.value.push(r)
    save(items.value)
    return r
  }

  function listByEmail(email: string){
    return items.value.filter(i => i.userEmail === email)
  }

  const totalSold = computed(() => items.value.reduce((a,b)=>a + b.nbPlaces, 0))
  const revenue = computed(() => items.value.reduce((a,b)=>a + b.totalAmount, 0))

  return { items, createReservation, listByEmail, totalSold, revenue }
})
