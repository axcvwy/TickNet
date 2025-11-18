import axios from 'axios'
import type { Show } from '../stores/shows'

const API_BASE = 'http://localhost:8000/api' // future backend

async function fetchShows(): Promise<Show[]>{
  try{
    const res = await axios.get(`${API_BASE}/shows`)
    return res.data
  }catch(e){
    // fallback to localStorage via store consumer
    return Promise.resolve([])
  }
}

export default { fetchShows }
