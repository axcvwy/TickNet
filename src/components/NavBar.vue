<template>
  <nav class="w-full border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <a href="/" class="flex items-center flex-shrink-0">
          <span class="inline-block -rotate-6 bg-orange-500 rounded-bl-lg rounded-br-lg px-3 sm:px-4 py-1 text-white font-bold text-lg sm:text-xl" style="font-family: sans-serif; letter-spacing: 0.5px; height:36px; display:flex; align-items:center;">
            TickNet
          </span>
        </a>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex flex-1 justify-center gap-6 xl:gap-8">
          <RouterLink to="/category/theatre" class="text-gray-800 hover:text-orange-500 font-medium text-sm xl:text-base transition whitespace-nowrap">Théâtre</RouterLink>
          <RouterLink to="/category/musique" class="text-gray-800 hover:text-orange-500 font-medium text-sm xl:text-base transition whitespace-nowrap">Musique</RouterLink>
          <RouterLink to="/category/danse" class="text-gray-800 hover:text-orange-500 font-medium text-sm xl:text-base transition whitespace-nowrap">Danse</RouterLink>
          <RouterLink to="/category/comedie" class="text-gray-800 hover:text-orange-500 font-medium text-sm xl:text-base transition whitespace-nowrap">Comédie</RouterLink>
          <RouterLink to="/category/arts-visuels" class="text-gray-800 hover:text-orange-500 font-medium text-sm xl:text-base transition whitespace-nowrap">Arts visuels</RouterLink>
          <RouterLink v-if="authState.isAuthenticated" to="/mes-reservations" class="text-gray-800 hover:text-orange-500 font-medium text-sm xl:text-base transition whitespace-nowrap">Mes réservations</RouterLink>
        </div>

        <!-- Right side - Desktop -->
        <div class="hidden md:flex items-center gap-4">
          <div v-if="authState.isAuthenticated" class="flex items-center gap-3">
            <span class="text-xs sm:text-sm font-medium text-orange-600 truncate max-w-[120px]">{{ authState.user?.nom || authState.user?.email }}</span>
            <button @click="logout" class="text-xs sm:text-sm border border-orange-500 text-orange-500 hover:bg-orange-50 px-2 sm:px-3 py-1 rounded transition-colors whitespace-nowrap">
              Déconnexion
            </button>
          </div>
          <RouterLink v-else to="/login" class="flex items-center gap-1 text-gray-800 hover:text-orange-500">
            <span class="text-sm">Sign In</span>
            <svg class="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-4.418 0-8 1.791-8 4v2c0 .553.447 1 1 1h14c.553 0 1-.447 1-1v-2c0-2.209-3.582-4-8-4z"/>
            </svg>
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-100 py-4 space-y-3">
        <RouterLink @click="mobileMenuOpen = false" to="/category/theatre" class="block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 font-medium rounded-lg transition">Théâtre</RouterLink>
        <RouterLink @click="mobileMenuOpen = false" to="/category/musique" class="block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 font-medium rounded-lg transition">Musique</RouterLink>
        <RouterLink @click="mobileMenuOpen = false" to="/category/danse" class="block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 font-medium rounded-lg transition">Danse</RouterLink>
        <RouterLink @click="mobileMenuOpen = false" to="/category/comedie" class="block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 font-medium rounded-lg transition">Comédie</RouterLink>
        <RouterLink @click="mobileMenuOpen = false" to="/category/arts-visuels" class="block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 font-medium rounded-lg transition">Arts visuels</RouterLink>
        <RouterLink v-if="authState.isAuthenticated" @click="mobileMenuOpen = false" to="/mes-reservations" class="block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 font-medium rounded-lg transition">Mes réservations</RouterLink>

        <div class="border-t border-gray-100 pt-3 mt-3">
          <div v-if="authState.isAuthenticated" class="px-4 space-y-2">
            <div class="text-sm font-medium text-orange-600">{{ authState.user?.nom || authState.user?.email }}</div>
            <button @click="logout" class="w-full text-left py-2 text-sm border border-orange-500 text-orange-500 hover:bg-orange-50 px-3 rounded transition-colors">
              Déconnexion
            </button>
          </div>
          <RouterLink v-else @click="mobileMenuOpen = false" to="/login" class="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition">
            <span>Sign In</span>
            <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-4.418 0-8 1.791-8 4v2c0 .553.447 1 1 1h14c.553 0 1-.447 1-1v-2c0-2.209-3.582-4-8-4z"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { authState, authService } from '../services/auth.service';

const mobileMenuOpen = ref(false);

function logout() {
  authService.logout();
  mobileMenuOpen.value = false;
}
</script>
