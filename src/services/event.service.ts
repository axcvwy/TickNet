const API_URL = '/api';

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
  localisation: string;
  capacite: number;
}

export interface Session {
  id: number;
  spectacle: Spectacle;
  salle: Salle;
  dateHeure: string;
  prix: number;
  capacite: number;
}

export interface Event {
  id: number;
  title: string;
  date?: string;
  location?: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  popular?: boolean;
}

export interface Category {
  title: string;
  slug: string;
}

const categories: Category[] = [
  { title: "Théâtre", slug: "theatre" },
  { title: "Musique", slug: "musique" },
  { title: "Danse", slug: "danse" },
  { title: "Comédie", slug: "comedie" },
  { title: "Arts visuels", slug: "arts-visuels" }
];

export const EventService = {
  async getAllEvents(): Promise<Event[]> {
    try {
      // Fetch all spectacles
      const response = await fetch(`${API_URL}/spectacles`);
      if (!response.ok) throw new Error('Failed to fetch spectacles');
      const spectacles: Spectacle[] = await response.json();

      // For each spectacle, fetch its sessions to get price/date/location
      const eventPromises = spectacles.map(async (spec) => {
        try {
          const sessionsRes = await fetch(`${API_URL}/sessions/spectacle/${spec.id}`);
          const sessions: Session[] = sessionsRes.ok ? await sessionsRes.json() : [];

          // Determine min price and next date
          let minPrice = 0;
          let nextDate = 'Prochainement';
          let location = 'À déterminer';

          if (sessions.length > 0) {
             // Find min price
             minPrice = Math.min(...sessions.map(s => s.prix));

             // Find next upcoming date
             const upcoming = sessions
                .map(s => new Date(s.dateHeure))
                .filter(d => d > new Date())
                .sort((a, b) => a.getTime() - b.getTime());

             if (upcoming.length > 0) {
                 nextDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(upcoming[0]);
             } else {
                 // If no upcoming, maybe show last one or "Terminé"?
                 // We'll stick to "Prochainement" or distinct logic.
                 // Let's use the first session's date/loc if available as fallback
                 location = sessions[0]?.salle?.nom || 'À déterminer';
             }

             // Use location from first relevant session
             const validSession = sessions.find(s => new Date(s.dateHeure) > new Date()) || sessions[0];
             if (validSession) {
                 location = validSession.salle.nom;
             }
          }

          return {
            id: spec.id,
            title: spec.titre,
            description: spec.description,
            image: spec.imageUrl || 'https://images.unsplash.com/photo-1459749411177-0473ef716175?auto=format&fit=crop&q=80&w=600',
            category: spec.genre,
            price: minPrice,
            date: nextDate,
            location: location,
            popular: false // We can't determine this easily yet
          } as Event;
        } catch (e) {
          console.error(`Error fetching sessions for spectacle ${spec.id}`, e);
          return {
            id: spec.id,
            title: spec.titre,
            price: 0,
            image: spec.imageUrl || 'https://images.unsplash.com/photo-1459749411177-0473ef716175?auto=format&fit=crop&q=80&w=600',
            category: spec.genre,
            date: 'Indisponible'
          } as Event;
        }
      });

      return await Promise.all(eventPromises);
    } catch (e) {
      console.error("Error loading events", e);
      return [];
    }
  },

  async getPopularEvents(): Promise<Event[]> {
    // Mimic popular by taking random or first few
    const events = await this.getAllEvents();
    return events.slice(0, 4);
  },

  async getSpectacleById(id: number): Promise<Spectacle> {
    const response = await fetch(`${API_URL}/spectacles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch spectacle');
    return await response.json();
  },

  async getSessionsBySpectacleId(id: number): Promise<Session[]> {
    const response = await fetch(`${API_URL}/sessions/spectacle/${id}`);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    return await response.json();
  },

  async getEventsByCategory(categorySlug: string): Promise<Event[]> {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return [];

    const events = await this.getAllEvents();
    return events.filter(e => e.category === category.title);
  },

  async searchEvents(query: string): Promise<Event[]> {
    const events = await this.getAllEvents();
    const lowerQuery = query.toLowerCase();
    return events.filter(e =>
      e.title.toLowerCase().includes(lowerQuery) ||
      e.description?.toLowerCase().includes(lowerQuery) ||
      e.category.toLowerCase().includes(lowerQuery)
    );
  },

  getCategories(): Category[] {
    return categories;
  }
};
