<template>
  <div class="overflow-x-auto">
    <div class="flex gap-6 px-2">
      <EventCard v-for="e in events" :key="e.id" :event="{
        title: e.title,
        price: e.price,
        img: e.img || e.image
      }" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import EventCard from './EventCard.vue'

defineProps({
  events: { type: Array, default: () => [] }
})
</script>