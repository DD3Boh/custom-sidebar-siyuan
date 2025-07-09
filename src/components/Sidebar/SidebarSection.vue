<template>
  <div class="sidebar-section" @click="handleSectionClick">
    <div class="section-header" v-if="title">
      <div class="title-with-icon">
        <SyUtf8Icon v-if="icon" :utf8Code="icon" :size="20" />
        <h2 class="section-title">{{ title }}</h2>
      </div>
      <button
        v-if="sectionId && canRemove"
        @click.stop="$emit('remove', sectionId)"
        class="remove-button"
        :title="`Remove ${title} section`"
        >
        <SyIcon name="iconTrashcan" :size="16" />
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import SyIcon from '../SiyuanTheme/SyIcon.vue'
import SyUtf8Icon from '../SiyuanTheme/SyUtf8Icon.vue'

const props = defineProps<{
  title?: string;
  sectionId?: string;
  canRemove?: boolean;
  icon?: string;
}>();

const emit = defineEmits<{
  remove: [id: string];
  click: [id: string];
}>();

const handleSectionClick = () => {
  if (props.sectionId) {
    emit('click', props.sectionId);
  }
};
</script>

<style scoped>
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--b3-border-color);
  padding-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 4px;
  padding: 12px;
}

.sidebar-section:hover {
  background-color: var(--b3-theme-surface-lighter);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.section-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
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
  transition: all 0.2s ease;
  opacity: 0;
  visibility: hidden;
}

.sidebar-section:hover .remove-button {
  opacity: 1;
  visibility: visible;
}

.remove-button:hover {
  background-color: var(--b3-theme-error-lighter);
}
</style>
