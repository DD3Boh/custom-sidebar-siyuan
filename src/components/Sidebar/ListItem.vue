<template>
  <div class="list-item" :class="{ 'collapsible': collapsible }">
    <div class="item-content">
      <span v-if="collapsible" class="collapse-icon">{{ collapsed ? '>' : 'v' }}</span>
      <span v-if="icon" class="icon">{{ icon }}</span>
      <span class="label">{{ label }}</span>
    </div>
    <div v-if="collapsible && !collapsed" class="sub-items">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  label: string;
  icon?: string;
  collapsible?: boolean;
}>();

const collapsed = ref(props.collapsible);
</script>

<style scoped>
.list-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.collapse-icon {
  width: 16px;
}

.icon {
  width: 24px;
  text-align: center;
}

.label {
  flex-grow: 1;
}

.sub-items {
  padding-left: 24px;
}
</style>
