<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- Top Nav -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              TickNet Administration
            </h1>
          </div>
          <div class="flex items-center gap-4">
             <span class="text-sm text-gray-500">Bonjour, {{ authState.user?.nom }}</span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm text-orange-600 border border-orange-200 rounded-md hover:bg-orange-50 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex h-[calc(100vh-64px)]">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 hidden md:block">
            <div class="p-4 space-y-1">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="currentTab = tab.id"
                  :class="[
                    'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    currentTab === tab.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  ]"
                >
                    {{ tab.name }}
                </button>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-gray-50 p-8">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ currentTabName }}</h2>

                <!-- Overview Tab -->
                <div v-if="currentTab === 'overview'" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Stat Card 1 -->
                        <div class="bg-white p-6 rounded-xl shadow-sm border border-orange-100 relative overflow-hidden group">
                           <p class="text-sm font-medium text-gray-500">Total Réservations</p>
                           <p class="text-3xl font-bold text-gray-900 mt-2">{{ stats.totalReservations }}</p>
                        </div>

                         <!-- Stat Card 2 -->
                        <div class="bg-white p-6 rounded-xl shadow-sm border border-purple-100 relative overflow-hidden group">
                           <p class="text-sm font-medium text-gray-500">Ventes Totales</p>
                           <p class="text-3xl font-bold text-gray-900 mt-2">{{ formatCurrency(stats.totalSales) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Users Tab -->
                <div v-else-if="currentTab === 'users'" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                     <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ user.nom }}</div>
                                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                                    <div class="text-xs text-gray-400 mt-0.5">{{ user.telephone || 'Non renseigné' }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="[
                                      'px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full',
                                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                    ]">
                                      {{ user.role }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                     <span :class="[
                                      'px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full',
                                      user.actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]">
                                      {{ user.actif ? 'Actif' : 'Inactif' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ new Date(user.dateCreation).toLocaleDateString() }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button
                                      @click="handleToggleStatus(user)"
                                      class="text-purple-600 hover:text-purple-900 transition-colors"
                                    >
                                      {{ user.actif ? 'Désactiver' : 'Activer' }}
                                    </button>
                                    <button
                                      @click="handleDeleteUser(user)"
                                      class="text-red-600 hover:text-red-900 transition-colors"
                                      v-if="user.email !== authState.user?.email"
                                    >
                                      Supprimer
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Spectacles Tab -->
                <div v-else-if="currentTab === 'spectacles'" class="space-y-6">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium text-gray-900">Liste des Spectacles</h3>
                        <button @click="openModal('spectacle')" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                            Nouveau Spectacle
                        </button>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durée</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="spec in spectacles" :key="spec.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ spec.titre }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ spec.genre }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ spec.dureeMinutes }} min</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button @click="openModal('spectacle', spec)" class="text-purple-600 hover:text-purple-900">Modifier</button>
                                        <button @click="handleDeleteSpectacle(spec)" class="text-red-600 hover:text-red-900">Supprimer</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Salles Tab -->
                <div v-else-if="currentTab === 'salles'" class="space-y-6">
                     <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium text-gray-900">Liste des Salles</h3>
                        <button @click="openModal('salle')" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                            Nouvelle Salle
                        </button>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacité</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="salle in salles" :key="salle.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ salle.nom }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ salle.capacite }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ salle.localisation }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button @click="openModal('salle', salle)" class="text-purple-600 hover:text-purple-900">Modifier</button>
                                        <button @click="handleDeleteSalle(salle)" class="text-red-600 hover:text-red-900">Supprimer</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Sessions Tab -->
                <div v-else-if="currentTab === 'sessions'" class="space-y-6">
                     <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium text-gray-900">Liste des Sessions</h3>
                        <button @click="openModal('session')" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                            Nouvelle Session
                        </button>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spectacle</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salle</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Heure</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="sess in sessions" :key="sess.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ sess.spectacle.titre }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sess.salle.nom }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(sess.dateHeure) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatCurrency(sess.prix) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button @click="openModal('session', sess)" class="text-purple-600 hover:text-purple-900">Modifier</button>
                                        <button @click="handleDeleteSession(sess)" class="text-red-600 hover:text-red-900">Supprimer</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Reservations Tab -->
                <div v-else-if="currentTab === 'reservations'" class="space-y-6">
                     <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium text-gray-900">Liste des Réservations</h3>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spectacle</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Places</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Rés.</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="res in reservations" :key="res.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ res.visiteur?.nom || 'Inconnu' }}
                                        <div class="text-xs text-gray-400">{{ res.visiteur?.email }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ res.session.spectacle.titre }}
                                        <div class="text-xs">{{ formatDate(res.session.dateHeure) }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{{ res.nbPlaces }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">{{ formatCurrency(res.montantTotal) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{{ formatDate(res.dateReservation) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button @click="handleDeleteReservation(res)" class="text-red-600 hover:text-red-900">Annuler</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-bold text-gray-900">
                    {{ isEditing ? 'Modifier' : 'Ajouter' }}
                    {{ modalType === 'spectacle' ? 'un spectacle' : modalType === 'salle' ? 'une salle' : 'une session' }}
                </h3>
                <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">Fermer</button>
            </div>

            <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
                <!-- Spectacle Form -->
                <template v-if="modalType === 'spectacle'">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Titre</label>
                        <input v-model="formSpec.titre" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea v-model="formSpec.description" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">URL Image</label>
                        <input v-model="formSpec.imageUrl" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Genre</label>
                            <select v-model="formSpec.genre" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2 bg-white">
                                <option value="" disabled>Sélectionner un genre</option>
                                <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Durée (min)</label>
                            <input type="number" v-model="formSpec.dureeMinutes" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                        </div>
                    </div>
                </template>

                <!-- Salle Form -->
                <template v-else-if="modalType === 'salle'">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nom de la salle</label>
                        <input v-model="formSalle.nom" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Capacité</label>
                        <input type="number" v-model="formSalle.capacite" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Localisation</label>
                        <input v-model="formSalle.localisation" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                    </div>
                </template>

                <!-- Session Form -->
                <template v-else>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Spectacle</label>
                        <select v-model="formSession.spectacleId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2">
                            <option v-for="s in spectacles" :key="s.id" :value="s.id">{{ s.titre }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Salle</label>
                        <select v-model="formSession.salleId" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2">
                            <option v-for="s in salles" :key="s.id" :value="s.id">{{ s.nom }} (Cap. {{ s.capacite }})</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Date & Heure</label>
                        <input type="datetime-local" v-model="formSession.dateHeure" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Prix (€)</label>
                            <input type="number" step="0.01" v-model="formSession.prix" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Capacité de la session</label>
                            <input type="number" v-model="formSession.capacite" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm border p-2" />
                            <p class="text-xs text-gray-400 mt-1">Optionnel - utilise la salle par défaut</p>
                        </div>
                    </div>
                </template>

                <div class="flex justify-end gap-3 pt-4">
                    <button type="button" @click="showModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Annuler</button>
                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                        {{ isEditing ? 'Confirmer' : 'Ajouter' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { authService, authState } from '../services/auth.service'
import { adminService, type DashboardStats, type UserDTO, type Spectacle, type Salle, type Session, type Reservation } from '../services/admin.service'

const currentTab = ref('overview')

const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble' },
    { id: 'users', name: 'Utilisateurs' },
    { id: 'spectacles', name: 'Spectacles' },
    { id: 'salles', name: 'Salles' },
    { id: 'sessions', name: 'Sessions' },
    { id: 'reservations', name: 'Réservations' },
]

const genres = ["Théâtre", "Musique", "Danse", "Comédie", "Arts visuels"]

const currentTabName = computed(() => tabs.find(t => t.id === currentTab.value)?.name)

const stats = ref<DashboardStats>({ totalSales: 0, totalReservations: 0 })
const users = ref<UserDTO[]>([])
const spectacles = ref<Spectacle[]>([])
const salles = ref<Salle[]>([])
const sessions = ref<Session[]>([])
const reservations = ref<Reservation[]>([])

// Modal state
const showModal = ref(false)
const modalType = ref<'spectacle' | 'salle' | 'session'>('spectacle')
const isEditing = ref(false)
const currentId = ref<number | null>(null)

const formSpec = reactive<Partial<Spectacle>>({
    titre: '',
    description: '',
    imageUrl: '',
    genre: '',
    dureeMinutes: 120
})

const formSalle = reactive<Partial<Salle>>({
    nom: '',
    capacite: 0,
    localisation: ''
})

const formSession = reactive({
    dateHeure: '',
    prix: 0,
    capacite: 0,
    spectacleId: null as number | null,
    salleId: null as number | null
})

const handleLogout = () => {
  authService.logout()
}

async function fetchData() {
    const results = await Promise.allSettled([
        adminService.getDashboardStats(),
        adminService.getAllUsers(),
        adminService.getAllSpectacles(),
        adminService.getAllSalles(),
        adminService.getAllSessions(),
        adminService.getAllReservations()
    ])

    if (results[0].status === 'fulfilled') stats.value = results[0].value
    else console.error("Stats failed", results[0].reason)

    if (results[1].status === 'fulfilled') users.value = results[1].value
    else console.error("Users failed", results[1].reason)

    if (results[2].status === 'fulfilled') spectacles.value = results[2].value
    else console.error("Spectacles failed", results[2].reason)

    if (results[3].status === 'fulfilled') salles.value = results[3].value
    else console.error("Salles failed", results[3].reason)

    if (results[4].status === 'fulfilled') sessions.value = results[4].value
    else console.error("Sessions failed", results[4].reason)

    if (results[5].status === 'fulfilled') reservations.value = results[5].value
    else console.error("Reservations failed", results[5].reason)
}

function openModal(type: 'spectacle' | 'salle' | 'session', item?: any) {
    modalType.value = type
    showModal.value = true
    isEditing.value = !!item
    currentId.value = item?.id || null

    if (type === 'spectacle') {
        Object.assign(formSpec, item || { titre: '', description: '', imageUrl: '', genre: '', dureeMinutes: 120 })
    } else if (type === 'salle') {
        Object.assign(formSalle, item || { nom: '', capacite: 0, localisation: '' })
    } else {
        if (item) {
            formSession.dateHeure = item.dateHeure.substring(0, 16)
            formSession.prix = item.prix
            formSession.capacite = item.capacite
            formSession.spectacleId = item.spectacle.id
            formSession.salleId = item.salle.id
        } else {
            Object.assign(formSession, {
                dateHeure: new Date().toISOString().substring(0, 16),
                prix: 0,
                capacite: 0,
                spectacleId: spectacles.value[0]?.id || null,
                salleId: salles.value[0]?.id || null
            })
        }
    }
}

async function handleSubmit() {
    try {
        if (modalType.value === 'spectacle') {
            if (isEditing.value && currentId.value) {
                await adminService.updateSpectacle(currentId.value, formSpec)
            } else {
                await adminService.createSpectacle(formSpec)
            }
        } else if (modalType.value === 'salle') {
            if (isEditing.value && currentId.value) {
                await adminService.updateSalle(currentId.value, formSalle)
            } else {
                await adminService.createSalle(formSalle)
            }
        } else {
            const payload = {
                dateHeure: formSession.dateHeure ? `${formSession.dateHeure}:00` : '', // LocalDateTime compatible format
                prix: formSession.prix,
                capacite: formSession.capacite || null,
                spectacle: { id: formSession.spectacleId },
                salle: { id: formSession.salleId }
            }
            if (isEditing.value && currentId.value) {
                await adminService.updateSession(currentId.value, payload)
            } else {
                await adminService.createSession(payload)
            }
        }
        showModal.value = false
        await fetchData()
    } catch (e) {
        alert("Erreur lors de l'enregistrement")
        console.error(e)
    }
}

async function handleToggleStatus(user: UserDTO) {
    try {
        await adminService.toggleUserStatus(user.id)
        await fetchData()
    } catch (e) {
        alert("Erreur lors du changement de statut")
        console.error(e)
    }
}

async function handleDeleteUser(user: UserDTO) {
    if (!confirm(`Supprimer ${user.nom} ?`)) return
    try {
        await adminService.deleteUser(user.id)
        await fetchData()
    } catch (e) {
        alert("Erreur")
        console.error(e)
    }
}

async function handleDeleteSpectacle(spec: Spectacle) {
    if (!confirm(`Supprimer le spectacle ${spec.titre} ?`)) return
    try {
        await adminService.deleteSpectacle(spec.id)
        await fetchData()
    } catch (e) {
        alert("Erreur")
        console.error(e)
    }
}

async function handleDeleteSalle(salle: Salle) {
    if (!confirm(`Supprimer la salle ${salle.nom} ?`)) return
    try {
        await adminService.deleteSalle(salle.id)
        await fetchData()
    } catch (e) {
        alert("Erreur")
        console.error(e)
    }
}

async function handleDeleteSession(sess: Session) {
    if (!confirm(`Supprimer cette session ?`)) return
    try {
        await adminService.deleteSession(sess.id)
        await fetchData()
    } catch (e) {
        alert("Erreur")
        console.error(e)
    }
}

async function handleDeleteReservation(res: Reservation) {
    if (!confirm(`Annuler cette réservation de ${res.visiteur?.nom || 'l\'utilisateur'} ?`)) return
    try {
        await adminService.deleteReservation(res.id)
        await fetchData()
    } catch (e) {
        alert("Erreur lors de l'annulation")
        console.error(e)
    }
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
}

function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(dateStr))
}

onMounted(fetchData)
</script>
