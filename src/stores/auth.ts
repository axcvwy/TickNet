import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

function load(){
  try{ const raw = localStorage.getItem('auth'); return raw ? JSON.parse(raw) as { user: User | null } : { user: null } }catch(e){ return { user: null } }
}

function save(state: { user: User | null }){ try{ localStorage.setItem('auth', JSON.stringify(state)) }catch(e){} }

export const useAuthStore = defineStore('auth', () => {
  const state = ref<{ user: User | null }>(load())

  const user = computed(() => state.value.user)
  const isAuthenticated = computed(() => !!state.value.user)
  const isAdmin = computed(() => state.value.user?.role === 'admin')

  function login(email: string, password: string){
    // Simple local auth stub. Replace with API call in future.
    let user: User
    if(email === 'admin@theatre.local' && password === 'admin'){
      user = { id: 'u1', name: 'Administrateur', email, role: 'admin' }
    } else {
      user = { id: 'u2', name: email.split('@')[0] || 'Client', email, role: 'user' }
    }
    state.value.user = user
    save(state.value)
    return user
  }

  function logout(){
    state.value.user = null
    save(state.value)
  }

  return { user, isAuthenticated, isAdmin, login, logout }
})
