<template>
  <div class="sidebar-section">
    <div class="section-header" v-if="title">
      <h2 class="section-title">{{ title }}</h2>
      <button
        v-if="sectionId && canRemove"
        @click="$emit('remove', sectionId)"
        class="remove-button"
        :title="`Remove ${title} section`"
      >
        ×
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  sectionId?: string;
  canRemove?: boolean;
}>();

defineEmits<{
  remove: [id: string];
}>();
</script>

<style scoped>
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--b3-border-color);
  padding-bottom: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
  flex: 1;
}

.remove-button {
  background: none;
  border: none;
  color: var(--b3-theme-error);
  cursor: pointer;
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.remove-button:hover {
  background-color: var(--b3-theme-error-lighter);
}
</style>
