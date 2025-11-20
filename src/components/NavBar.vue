<template>
  <nav class="w-full">
    <div class="max-w-7xl mx-auto px-4 flex items-center h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center mr-8">
        <span class="inline-block -rotate-6 bg-orange-500 rounded-bl-lg rounded-br-lg px-4 py-1 text-white font-bold text-xl mr-2" style="font-family: sans-serif; letter-spacing: 0.5px; height:40px; display:flex; align-items:center;">
          TickNet
        </span>
      </a>
      <!-- Nav Links center -->
      <div class="flex-1 flex gap-7">
        <a href="/sports" class="text-gray-800 hover:text-purple-700 font-medium text-base transition">Théâtre</a>
        <a href="/sports" class="text-gray-800 hover:text-purple-700 font-medium text-base transition">Comédie</a>
        <a href="/sports" class="text-gray-800 hover:text-purple-700 font-medium text-base transition">Festivals</a>
        <a href="/sports" class="text-gray-800 hover:text-purple-700 font-medium text-base transition">Concert</a>
        <a href="/sports" class="text-gray-800 hover:text-purple-700 font-medium text-base transition">Musique</a>
      </div>
      <!-- Right links and avatar -->
      <div class="flex items-center gap-6">
        <a href="/favorites" class="text-gray-800 hover:text-purple-700 text-base font-medium transition">Favorites</a>
        <a href="/tickets" class="text-gray-800 hover:text-purple-700 text-base font-medium transition">My Tickets</a>
        <a href="/login" class="flex items-center gap-1 text-gray-800 hover:text-purple-700">
          <span>Sign In</span>
          <svg class="w-7 h-7 text-purple-600 ml-2" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4.418 0-8 1.791-8 4v2c0 .553.447 1 1 1h14c.553 0 1-.447 1-1v-2c0-2.209-3.582-4-8-4z"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>
