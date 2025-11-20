<template>
  <div class="mt-6">
    <form @submit.prevent="onSubmit" class="flex w-full max-w-3xl mx-auto">
      <input v-model="query" type="text" placeholder="Nom de l'artiste, lieu ou événement" class="flex-1 p-3 rounded-l-lg border-0" />
      <select v-model="category" class="p-3 border-l border-r hidden sm:block">
        <option value="">Tous</option>
        <option value="concert">Concert</option>
        <option value="sport">Sport</option>
        <option value="theatre">Théâtre</option>
      </select>
      <button type="submit" class="bg-yellow-400 px-6 rounded-r-lg font-semibold hover:bg-yellow-500">Rechercher</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const query = ref('')
const category = ref('')
const emit = defineEmits(['search'])

function onSubmit() {
  emit('search', { query: query.value, category: category.value })
}
</script>