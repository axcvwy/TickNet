<template>
  <div class="app-shell">
    <main class="main site container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  max-width: var(--max-width);
  margin: 0 auto;
}
.main {
  padding-top: 1rem;
}
</style>
