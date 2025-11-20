<template>
  <header class="bg-white shadow">
    <div class="mx-auto h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-6">
          <a class="text-2xl font-bold text-indigo-600" href="#">TickNet</a>

          <nav class="hidden lg:flex items-center gap-4 text-sm">
            <a href="#" class="hover:text-indigo-600">Événements</a>
            <a href="#" class="hover:text-indigo-600">Billets</a>
            <a href="#" class="hover:text-indigo-600">Aide</a>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden md:block">
            <input placeholder="Rechercher..." class="border rounded-lg px-3 py-1 text-sm" />
          </div>

          <div class="flex items-center gap-3">
            <button class="text-sm px-3 py-1 border rounded hover:bg-gray-100">Connexion</button>
            <button class="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">S'inscrire</button>

            <!-- mobile menu button -->
            <button @click="open = !open" class="lg:hidden p-2 rounded-md hover:bg-gray-100">
              <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- mobile menu -->
      <div v-if="open" class="lg:hidden py-2">
        <a class="block py-2" href="#">Événements</a>
        <a class="block py-2" href="#">Billets</a>
        <a class="block py-2" href="#">Aide</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>