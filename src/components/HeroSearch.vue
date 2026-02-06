<template>
  <div class="w-full max-w-4xl mx-auto relative px-4 sm:px-6">
    <div class="flex items-center bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl px-4 sm:px-6 py-3 sm:py-5 border border-orange-100 focus-within:ring-2 sm:focus-within:ring-4 focus-within:ring-orange-200/50 transition-all duration-300">
      <svg class="w-5 h-5 sm:w-7 sm:h-7 text-orange-500 mr-3 sm:mr-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        v-model="search"
        @input="onInput"
        @keydown.down.prevent="move(+1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="select()"
        type="text"
        :placeholder="placeholder"
        class="flex-1 bg-transparent outline-none text-base sm:text-xl text-gray-800 placeholder-gray-400 font-medium"
        autocomplete="off"
      />
    </div>
    <!-- Suggestions Dropdown -->
    <div v-if="showDropdown && suggestions.length > 0"
         class="absolute top-full left-4 right-4 sm:left-6 sm:right-6 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-[0_20px_50px_rgba(0,0,0,0.15)] mt-3 sm:mt-4 z-50 overflow-hidden border border-gray-100 max-h-[60vh] overflow-y-auto">
      <div v-for="(item, idx) in suggestions" :key="item.id"
           @mousedown.prevent="select(item)"
           :class="[
             'flex items-center px-4 sm:px-6 py-3 sm:py-5 cursor-pointer transition-all duration-200',
             idx===selectedIdx ? 'bg-indigo-950 text-white' : 'hover:bg-gray-50'
           ]">
        <img :src="item.image" class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mr-3 sm:mr-5 bg-gray-200 object-cover shadow-md flex-shrink-0" alt="">
        <div class="flex-1 min-w-0">
          <div :class="['font-bold text-sm sm:text-lg leading-tight truncate', idx===selectedIdx ? 'text-white' : 'text-gray-900']">{{ item.title }}</div>
          <div :class="['text-xs sm:text-sm font-semibold mt-1 uppercase tracking-wider', idx===selectedIdx ? 'text-orange-400' : 'text-orange-600']">{{ item.category }}</div>
        </div>
        <div :class="['text-xs sm:text-sm font-medium ml-2 flex-shrink-0', idx===selectedIdx ? 'text-orange-200' : 'text-gray-400']">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { EventService, type Event } from '@/services/event.service'

const router = useRouter()

defineProps<{ placeholder?: string }>()
const emit = defineEmits(['search'])

const search = ref('')
const showDropdown = ref(false)
const selectedIdx = ref(0)
const suggestions = ref<Event[]>([])

async function onInput() {
  showDropdown.value = !!search.value
  if (search.value.length === 0) {
    suggestions.value = []
    emit('search', '')
    return
  }

  // Real API search
  const results = await EventService.searchEvents(search.value)
  suggestions.value = results.slice(0, 6) // limit suggestions
  selectedIdx.value = 0

  // Also emit search for real-time grid filtering
  emit('search', search.value)
}

function move(dir: number) {
  selectedIdx.value = Math.max(0, Math.min(suggestions.value.length - 1, selectedIdx.value + dir))
}

function select(item?: Event) {
  const val = item || suggestions.value[selectedIdx.value]
  if (val) {
    search.value = val.title
    showDropdown.value = false
    emit('search', val.title)
    router.push({ name: 'spectacle-detail', params: { id: val.id } })
  }
}

watch(search, val => {
  if (!val) {
    showDropdown.value = false
    emit('search', '')
  }
})
</script>
