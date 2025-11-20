<template>
  <div class="flex-1">
    <Navbar />

    <!-- HERO -->
    <header class="">
      <div class="bg-linear-to-r from-orange-600 to-orange-600 text-white mx-auto max-w-7xl p-10 rounded-2xl">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="max-w-2xl">
            <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Trouvez vos billets pour les meilleurs événements
            </h1>
            <p class="text-lg text-blue-100">
              Concerts, sports, théâtre — comparez et achetez en toute confiance.
            </p>
          </div>

          <div class="hidden md:block w-1/3">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80&auto=format&fit=crop" alt="hero" class="rounded-lg shadow-lg object-cover w-full h-64" />
          </div>
        </div>
      </div>
    </header>

    <!-- Tendances / Carrousel -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Tendances près de chez vous</h2>
        <button class="text-sm text-gray-600 hover:text-gray-800">Voir tout</button>
      </div>
      <EventCarousel :events="topEvents" />
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold mb-6">Catégories populaires</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <CategoryCard v-for="c in categories" :key="c.title" :category="c" />
      </div>
    </section>

    <!-- Grid of events -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Spectacles & Événements</h2>
        <p class="text-sm text-gray-500">Affichage de 1–12 de 240 résultats</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <EventCard v-for="e in events" :key="e.id" :event="e" />
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeroSearch from '../components/HeroSearch.vue'
import EventCarousel from '../components/EventCarousel.vue'
import CategoryCard from '../components/CategoryCard.vue'
import EventCard from '../components/EventCard.vue'
import Footer from '../components/Footer.vue'

const topEvents = ref([
  { id: 1, title: "Coldplay — Paris", price: 45, img: "https://picsum.photos/600/400?random=11" },
  { id: 2, title: "PSG vs OM", price: 80, img: "https://picsum.photos/600/400?random=12" },
  { id: 3, title: "Imagine Dragons", price: 55, img: "https://picsum.photos/600/400?random=13" },
  { id: 4, title: "Metallica", price: 70, img: "https://picsum.photos/600/400?random=14" }
])

const categories = ref([
  { title: "Concerts", icon: "🎤" },
  { title: "Sport", icon: "🏟️" },
  { title: "Théâtre", icon: "🎭" },
  { title: "Festivals", icon: "🎪" }
])

const events = ref([
  { id: 101, title: "The Weeknd — Paris", date: "12 juin 2025", location: "Accor Arena", price: 89, image: "https://picsum.photos/600/400?random=1" },
  { id: 102, title: "Soprano — Marseille", date: "28 juillet 2025", location: "Orange Vélodrome", price: 45, image: "https://picsum.photos/600/400?random=2" },
  { id: 103, title: "Ariana Grande — Lyon", date: "05 août 2025", location: "Halle Tony Garnier", price: 110, image: "https://picsum.photos/600/400?random=3" },
  { id: 104, title: "Cats — Théâtre", date: "18 sept. 2025", location: "Théâtre Mogador", price: 55, image: "https://picsum.photos/600/400?random=4" },
  { id: 105, title: "Festival Jazz", date: "02 oct. 2025", location: "Nice", price: 30, image: "https://picsum.photos/600/400?random=5" },
  { id: 106, title: "Match Rugby", date: "10 nov. 2025", location: "Stade de France", price: 60, image: "https://picsum.photos/600/400?random=6" },
  { id: 107, title: "Electro Night", date: "22 déc. 2025", location: "Zénith", price: 40, image: "https://picsum.photos/600/400?random=7" },
  { id: 108, title: "Stand-up Comedy", date: "05 janv. 2026", location: "Théâtre", price: 25, image: "https://picsum.photos/600/400?random=8" }
])

function handleSearch(q) {
  console.log('Recherche effectuée :', q)
}
</script>