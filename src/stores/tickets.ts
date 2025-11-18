import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Seat = {
  id: string
  row: string
  number: number
  price: number
  status: 'available' | 'reserved'
}

function makeSeats(rows = ['A','B','C','D','E'], perRow = 8){
  const seats: Seat[] = []
  for(const r of rows){
    for(let i=1;i<=perRow;i++){
      seats.push({ id:`${r}-${i}`, row:r, number:i, price: (i<=2?30: i<=5?25:20), status: Math.random() < 0.08 ? 'reserved' : 'available' })
    }
  }
  return seats
}

export const useTicketsStore = defineStore('tickets', () => {
  const seats = ref<Seat[]>(makeSeats())
  const selected = ref<string[]>([])

  function toggleSeat(id: string){
    const seat = seats.value.find(s => s.id === id)
    if(!seat || seat.status !== 'available') return
    const idx = selected.value.indexOf(id)
    if(idx === -1) selected.value.push(id)
    else selected.value.splice(idx,1)
  }

  const selectedSeats = computed(() => seats.value.filter(s => selected.value.includes(s.id)))
  const total = computed(() => selectedSeats.value.reduce((acc,s)=>acc + s.price, 0))
  const count = computed(() => selected.value.length)

  function reserveSelected(){
    for(const id of selected.value){
      const seat = seats.value.find(s=>s.id===id)
      if(seat) seat.status = 'reserved'
    }
    selected.value = []
  }

  function reset(){
    seats.value = makeSeats()
    selected.value = []
  }

  return { seats, selected, toggleSeat, selectedSeats, total, count, reserveSelected, reset }
})
