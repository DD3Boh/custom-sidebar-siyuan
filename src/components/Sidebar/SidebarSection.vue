<template>
  <div
    class="sidebar-section"
    :class="{ 'mobile-layout': isMobile }"
    @click="handleSectionClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="section-header" v-if="title">
      <div class="title-with-icon">
        <!-- Show expand/collapse icon on hover, otherwise show regular icon -->
        <div class="icon-container" @click.stop="handleToggleExpanded">
          <SyIcon
            v-if="(isHovered || isTouched) && items && items.length > 0"
            :name="expanded ? 'iconDown' : 'iconRight'"
            :size="isMobile ? 16 : 10"
            class="expand-icon"
          />
          <SyUtf8Icon
            v-else-if="icon"
            :utf8Code="icon"
            :size="isMobile ? 28 : 20"
          />
        </div>
        <h2 class="section-title">{{ title }}</h2>
      </div>
      <button
        v-if="sectionId && canRemove"
        @click.stop="$emit('remove', sectionId)"
        class="remove-button"
        :class="{ 'mobile-visible': isTouched }"
        :title="i18n('removeSectionTooltip', { title: title })"
        >
        <SyIcon name="iconTrashcan" :size="isMobile ? 20 : 16" />
      </button>
    </div>

    <div
      v-if="items && items.length > 0 && expanded"
      class="items-list"
      :class="{ 'collapsed': !expanded }"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="sidebar-item"
        :class="{ 'mobile-item': isMobile }"
        @click="handleItemClick(item.id, $event)"
      >
        <div class="item-content">
          <SyUtf8Icon
            v-if="item.icon"
            :utf8Code="item.icon"
            :size="isMobile ? 20 : 16"
          />
          <span class="item-title">{{ item.title }}</span>
        </div>
      </div>
    </div>

    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { openDoc, usePlugin } from '@/main';
import { getFrontend } from 'siyuan'
import SyIcon from '../SiyuanTheme/SyIcon.vue'
import SyUtf8Icon from '../SiyuanTheme/SyUtf8Icon.vue'
import { useI18n } from '@/utils/i18n'

const { i18n } = useI18n()

interface SidebarItem {
  id: string;
  title: string;
  icon?: string;
}

const props = defineProps<{
  title?: string;
  sectionId?: string;
  canRemove?: boolean;
  icon?: string;
  items?: SidebarItem[];
  expanded?: boolean;
}>();

const plugin = usePlugin();
const isHovered = ref(false);
const isTouched = ref(false);

// Add mobile detection
const isMobile = computed(() => {
  const frontEnd = getFrontend()
  return frontEnd === "mobile" || frontEnd === "browser-mobile"
})

const emit = defineEmits<{
  remove: [id: string];
  click: [id: string];
  itemClick: [id: string];
  'toggle-expanded': [id: string];
}>();

const handleSectionClick = () => {
  if (props.sectionId) {
    emit('click', props.sectionId);
  }
};

const handleItemClick = (itemId: string, event: Event) => {
  event.stopPropagation();
  emit('itemClick', itemId);

  openDoc(itemId, plugin.app);
};

const handleTouchStart = () => {
  isTouched.value = true;
};

const handleTouchEnd = () => {
  // Delay hiding to prevent flicker
  setTimeout(() => {
    isTouched.value = false;
  }, 100);
};

const handleToggleExpanded = () => {
  if (props.sectionId) {
    emit('toggle-expanded', props.sectionId);
  }
};
</script>

<style scoped>
.sidebar-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--b3-border-color);
  padding-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 4px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Mobile-specific styling for larger touch targets */
.sidebar-section.mobile-layout {
  margin-bottom: clamp(10px, 2vw, 16px);
  padding-bottom: clamp(8px, 1vw, 12px);
  border-radius: clamp(6px, 1.5vw, 8px);
}

.sidebar-section:hover {
  background-color: var(--b3-theme-surface-lighter);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: grab;
  user-select: none;
  touch-action: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
}

.section-header:active {
  cursor: grabbing;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0; /* Allow text to truncate if needed */
}

.mobile-layout .title-with-icon {
  gap: clamp(12px, 3vw, 16px);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  width: 24px;
  height: 24px;
  touch-action: manipulation;
}

.mobile-layout .icon-container {
  width: clamp(32px, 8vw, 48px);
  height: clamp(32px, 8vw, 48px);
  border-radius: clamp(6px, 2vw, 8px);
}

.icon-container:hover {
  background-color: var(--b3-theme-surface);
}

.expand-icon {
  color: var(--b3-theme-on-surface);
  transition: transform 0.2s ease;
}

.section-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
}

.mobile-layout .section-title {
  font-size: clamp(1.25em, 4vw, 1.5em);
  line-height: 1.3;
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
  touch-action: manipulation;
}

.mobile-layout .remove-button {
  width: clamp(32px, 8vw, 48px);
  height: clamp(32px, 8vw, 48px);
  font-size: clamp(20px, 5vw, 24px);
  border-radius: clamp(6px, 2vw, 8px);
}

.sidebar-section:hover .remove-button,
.remove-button.mobile-visible {
  opacity: 1;
  visibility: visible;
}

.remove-button:hover {
  background-color: var(--b3-theme-error-lighter);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  transition: all 0.3s ease;
  opacity: 1;
  max-height: 1000px; /* Large enough to accommodate content */
  overflow: hidden;
}

.mobile-layout .items-list {
  gap: clamp(4px, 1vw, 8px);
  margin-bottom: clamp(8px, 2vw, 12px);
}

.items-list.collapsed {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: 1px solid transparent;
  touch-action: manipulation;
}

.sidebar-item.mobile-item {
  padding: 5px clamp(10px, 2.5vw, 20px);
  border-radius: clamp(6px, 1.5vw, 12px);
}

.sidebar-item:hover {
  background-color: var(--b3-theme-surface);
  border-color: var(--b3-border-color);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.item-title {
  font-size: 14px;
  color: var(--b3-theme-on-background);
  font-weight: 500;
}

.mobile-item .item-title {
  font-size: clamp(16px, 4vw, 20px);
  line-height: 1.4;
}

/* Additional mobile optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Touch device specific styles */
  .sidebar-section {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  .sidebar-item:active {
    background-color: var(--b3-theme-surface);
    transform: scale(0.98);
    transition: all 0.1s ease;
  }

  .icon-container:active {
    background-color: var(--b3-theme-surface);
    transform: scale(0.95);
  }

  .remove-button:active {
    background-color: var(--b3-theme-error-lighter);
    transform: scale(0.95);
  }
}
</style>
