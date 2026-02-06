import { reactive } from 'vue'

const API_URL = '/api/auth'

interface User {
    id: number
    nom?: string
    email: string
    role?: 'ADMIN' | 'CLIENT' | string
    token?: string
    telephone?: string
    actif?: boolean
    dateCreation?: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
}

export const authState = reactive<AuthState>({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
})

export const authService = {
    async login(email: string, motDePasse: string) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, motDePasse }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                // Try to find a meaningful error message
                const errorMessage = errorData.message || errorData.error || 'Login failed'
                throw new Error(errorMessage)
            }

            const user: User = await response.json()

            this.setSession(user)
            return user
        } catch (error) {
            throw error
        }
    },

    async register(nom: string, email: string, motDePasse: string, telephone: string) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, email, motDePasse, telephone }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            const errorMessage = errorData.message || 'Registration failed'
            throw new Error(errorMessage)
        }
        return await response.json()
    },

    logout() {
        authState.user = null
        authState.isAuthenticated = false
        localStorage.removeItem('user')
        // creating a temporary router instance might not work well here,
        // better to handle redirect in the component calling logout or use global router if possible.
        window.location.href = '/login'
    },

    setSession(user: User) {
        authState.user = user
        authState.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(user))
    },

    isAdmin() {
        return authState.user?.role === 'ADMIN'
    }
}
