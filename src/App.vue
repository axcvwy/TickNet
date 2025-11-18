<template>
  <div class="app-shell">
    <NavBar />
    <main class="main site container">
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<style scoped>
.container{max-width:var(--max-width);margin:0 auto}
.main{padding-top:1rem}
</style>
