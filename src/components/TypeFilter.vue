<template>
  <div class="filter-wrapper">
    <!-- Zone des boutons Types -->
    <div class="buttons-group">
      <button
        v-for="type in types"
        :key="type"
        :class="['filter-btn', { active: selectedType === type }]"
        @click="selectType(type)"
      >
        {{ type }}
      </button>
    </div>

    <!-- Séparateur visuel (optionnel) -->
    <div class="divider"></div>

    <!-- Zone Recherche Localisation -->
    <div class="search-group">
      <div class="input-wrapper">
        <!-- Icône SVG de localisation/recherche -->
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414a6 6 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
        </svg>
        <input
          v-model="location"
          type="text"
          placeholder="Ville ou lieu..."
          @input="emitFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeFilter',
  data() {
    return {
      types: ['Musique', 'Concert', 'Festivals', 'Comédie', 'Théâtre'],
      selectedType: 'Musique',
      location: ''
    };
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
      this.emitFilter();
    },
    emitFilter() {
      // On émet un objet complet pour que le parent ait toutes les infos
      this.$emit('filter-changed', {
        type: this.selectedType,
        location: this.location
      });
    }
  }
}
</script>

<style scoped>
/* Conteneur principal : Centre tout le contenu */
.filter-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
  width: 100%;
}

/* Groupe des boutons */
.buttons-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  background: #f7f6fb;
  border: 1px solid #e0e0e0;
  color: #673ab7;
  padding: 8px 20px;
  border-radius: 7px; /* Forme plus arrondie "pill" */
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.filter-btn:hover {
  background: #ede7ff;
  border-color: #d1c4e9;
}

.filter-btn.active {
  background: #e4daff;
  border-color: #673ab7;
  color: #231164;
  box-shadow: 0 2px 5px rgba(103, 58, 183, 0.15);
}

/* Petit séparateur vertical pour distinguer les zones */
.divider {
  width: 1px;
  height: 24px;
  background-color: #e0e0e0;
  display: none;
}

/* Afficher le séparateur seulement sur les écrans assez larges */
@media (min-width: 768px) {
  .divider { display: block; }
}

/* Style du champ de recherche */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  padding: 8px 15px 8px 38px; /* Padding gauche pour l'icône */
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #333;
  width: 200px;
  transition: all 0.2s;
  outline: none;
  font-size: 0.95rem;
}

.input-wrapper input:focus {
  border-color: #673ab7;
  box-shadow: 0 0 0 3px rgba(103, 58, 183, 0.1);
  width: 220px; /* Petit effet d'agrandissement au focus */
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: #9ca3af;
  pointer-events: none;
}
</style>
