<template>
  <div class="w-full max-w-4xl mx-auto relative">
    <div class="flex items-center bg-white rounded-full shadow px-5 py-4">
      <svg class="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        v-model="search"
        @input="onInput"
        @keydown.down.prevent="move(+1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="select"
        type="text"
        :placeholder="placeholder"
        class="flex-1 bg-transparent outline-none text-lg"
        autocomplete="off"
      />
    </div>
    <!-- Suggestions Dropdown -->
    <div v-if="showDropdown && suggestions.length > 0"
         class="absolute top-full left-0 w-full bg-white rounded-xl shadow-lg mt-2 z-50 overflow-hidden">
      <div v-for="(item, idx) in suggestions" :key="item.id"
           @mousedown.prevent="select(item)"
           :class="[
             'flex items-center px-5 py-3 cursor-pointer transition',
             idx===selectedIdx ? 'bg-purple-100' : 'hover:bg-purple-50'
           ]">
        <img :src="item.img" class="w-9 h-9 rounded-lg mr-3 bg-gray-200 object-cover" alt="">
        <div class="flex-1">
          <div class="font-semibold text-gray-900">{{ item.title }}</div>
          <div class="text-xs text-gray-400">{{ item.type }}</div>
        </div>
        <div class="text-gray-500 text-xs">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{ placeholder?: string }>()
const search = ref('')
const showDropdown = ref(false)
const selectedIdx = ref(0)
const suggestions = ref<any[]>([])

// Dummy data for demo. In prod, fetch from API
const data = [
  { id: 1, title: 'Sabrina Carpenter', img: 'https://randomuser.me/api/portraits/women/1.jpg', type: 'Concert Tickets', count: '20 events' },
  { id: 2, title: 'Sabrina Claudio', img: 'https://randomuser.me/api/portraits/women/2.jpg', type: 'Concert Tickets', count: '28 events' },
  { id: 3, title: 'Joaquin Sabina', img: 'https://randomuser.me/api/portraits/men/3.jpg', type: 'Concert Tickets', count: '3 events' },
  { id: 4, title: 'Sabrina Carpenter Night', img: 'https://randomuser.me/api/portraits/women/4.jpg', type: 'Theater Tickets', count: '0 events' },
]

function onInput() {
  showDropdown.value = !!search.value
  if (search.value.length === 0) {
    suggestions.value = []
    return
  }
  // Replace with API call if needed
  suggestions.value = data.filter(d =>
    d.title.toLowerCase().includes(search.value.toLowerCase())
  )
  selectedIdx.value = 0
}

function move(dir: number) {
  selectedIdx.value = Math.max(0, Math.min(suggestions.value.length - 1, selectedIdx.value + dir))
}

function select(item?: any) {
  const val = item || suggestions.value[selectedIdx.value]
  if (val) {
    search.value = val.title
    showDropdown.value = false
    // Emit the selection
    // Use your event logic here
  }
}

watch(search, val => {
  if (!val) showDropdown.value = false
})
</script>
