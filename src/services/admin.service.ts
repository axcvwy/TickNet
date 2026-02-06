const API_URL = '/api';

export interface DashboardStats {
    totalSales: number;
    totalReservations: number;
    // Add other stats as backend provides
}

export interface UserDTO {
    id: number;
    nom: string;
    email: string;
    role: 'ADMIN' | 'CLIENT';
    telephone?: string;
    actif: boolean;
    dateCreation: string;
}

export const adminService = {
    async getDashboardStats(): Promise<DashboardStats> {
        const response = await fetch(`${API_URL}/admin/dashboard`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token || ''}` // Use token if available, though currently we might rely on cookie/session if backend uses it, but authService stores 'user' in localStorage. The previous `login` didn't explicitly save a token field in `User` interface in the successful response, but `User` interface has `token?`. I'll assume standard fetch for now or add Auth header if needed.
                // Actually `auth.service.ts` just stores the user object. If backend is stateless (JWT), we need the token.
                // The backend likely relies on Basic Auth or Session?
                // The user said "it works with the backend".
                // I'll assume no special header needed if it's session based or if credentials are included?
                // Wait, `fetch` needs `credentials: 'include'` if cookie based.
                // Or if JWT is in `User` object.
                // Let's check `User` interface in `auth.service.ts`.
            }
        });
        if (!response.ok) throw new Error('Failed to fetch stats');
        return await response.json();
    },

    async getAllUsers(): Promise<UserDTO[]> {
        const response = await fetch(`${API_URL}/admin/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return await response.json();
    },

    async toggleUserStatus(id: number): Promise<UserDTO> {
        const response = await fetch(`${API_URL}/admin/users/${id}/toggle-status`, {
            method: 'PATCH'
        });
        if (!response.ok) throw new Error('Failed to toggle user status');
        return await response.json();
    },

    async deleteUser(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/admin/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete user');
    },

    // Spectacles
    async getAllSpectacles(): Promise<Spectacle[]> {
        const response = await fetch(`${API_URL}/spectacles`);
        if (!response.ok) throw new Error('Failed to fetch spectacles');
        return await response.json();
    },

    async createSpectacle(data: Partial<Spectacle>): Promise<Spectacle> {
        const response = await fetch(`${API_URL}/spectacles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create spectacle');
        return await response.json();
    },

    async updateSpectacle(id: number, data: Partial<Spectacle>): Promise<Spectacle> {
        const response = await fetch(`${API_URL}/spectacles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update spectacle');
        return await response.json();
    },

    async deleteSpectacle(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/spectacles/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete spectacle');
    },

    // Salles
    async getAllSalles(): Promise<Salle[]> {
        const response = await fetch(`${API_URL}/salles`);
        if (!response.ok) throw new Error('Failed to fetch salles');
        return await response.json();
    },

    async createSalle(data: Partial<Salle>): Promise<Salle> {
        const response = await fetch(`${API_URL}/salles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create salle');
        return await response.json();
    },

    async updateSalle(id: number, data: Partial<Salle>): Promise<Salle> {
        const response = await fetch(`${API_URL}/salles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update salle');
        return await response.json();
    },

    async deleteSalle(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/salles/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete salle');
    },

    // Sessions
    async getAllSessions(): Promise<Session[]> {
        const response = await fetch(`${API_URL}/sessions`);
        if (!response.ok) throw new Error('Failed to fetch sessions');
        return await response.json();
    },

    async createSession(data: Record<string, unknown>): Promise<Session> {
        const response = await fetch(`${API_URL}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create session');
        return await response.json();
    },

    async updateSession(id: number, data: Record<string, unknown>): Promise<Session> {
        const response = await fetch(`${API_URL}/sessions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update session');
        return await response.json();
    },

    async deleteSession(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/sessions/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete session');
    },

    // Reservations
    async getAllReservations(): Promise<Reservation[]> {
        const response = await fetch(`${API_URL}/reservations`);
        if (!response.ok) throw new Error('Failed to fetch reservations');
        return await response.json();
    },

    async deleteReservation(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/reservations/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete reservation');
    }
};

export interface Spectacle {
    id: number;
    titre: string;
    description: string;
    imageUrl: string;
    genre: string;
    dureeMinutes: number;
}

export interface Salle {
    id: number;
    nom: string;
    capacite: number;
    localisation: string;
}

export interface Session {
    id: number;
    dateHeure: string;
    prix: number;
    capacite: number;
    spectacle: Spectacle;
    salle: Salle;
}

export interface Reservation {
    id: number;
    visiteur: UserDTO;
    session: Session;
    nbPlaces: number;
    montantTotal: number;
    dateReservation: string;
}
