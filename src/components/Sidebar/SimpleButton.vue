<template>
  <button class="simple-button">
    <span v-if="icon" class="icon">{{ icon }}</span>
    <span class="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  icon?: string;
}>();
</script>

<style scoped>
.simple-button {
  background-color: #3a3a3a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.icon {
  font-size: 1.2em;
}
</style>
