<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlugin } from './main'
import SidebarSection from './components/Sidebar/SidebarSection.vue'
import { openTab } from 'siyuan'
import { getDocInfo, getFileBlob, putFile } from './api'

interface SidebarSectionData {
  id: string
  title: string
  content?: string,
  icon?: string
}

const plugin = usePlugin();
const sections = ref<SidebarSectionData[]>([]);
const sectionsFileName = 'sections.json';

const addSection = async () => {
  const clipboard = await addFromClipboard();
  if (!clipboard) {
    return;
  }

  // Get doc info from clipboard ID
  const docInfo = await getDocInfo(clipboard);

  sections.value.push({
    id: clipboard,
    title: docInfo.name || `Section ${sections.value.length + 1}`,
    content: `This is section ${clipboard}. You can customize this content.`,
    icon: docInfo.icon || 'iconDocument',
  })

  saveSectionIds();
}

const removeSection = (id: string) => {
  // Don't remove if it's the last section
  if (sections.value.length > 1) {
    sections.value = sections.value.filter(section => section.id !== id)
  }
}

const onSectionClick = (id: string) => {
  console.log(`Section clicked: ${id}`);

  openTab({ app: plugin.app, doc: { id } });
}

const addFromClipboard = async (): Promise<string | undefined> => {
  const id = await navigator.clipboard.readText();
  if (!id) {
    return;
  }
  console.log(`Adding section with ID: ${id}`);
  return id;
};

onMounted(async () => {
  const savedSections = await getFileBlob(`data/storage/petal/custom-sidebar/${sectionsFileName}`);

  console.log("Loading saved sections from:", savedSections);
  let parsed: { id: string }[] = [];
  if (savedSections) {
    const text = await savedSections.text();
    parsed = JSON.parse(text) as { id: string }[];
  }

  parsed.forEach(async section => {
    const info = await getDocInfo(section.id);
    console.log(`Adding section from saved data: ${section.id}`, info);
    sections.value.push({
      id: section.id,
      title: info.name || `Section ${sections.value.length + 1}`,
      content: `This is section ${section.id}. You can customize this content.`,
      icon: info.icon || 'iconDocument',
    });
  });

  console.log('Saved sections:', parsed);
});

const saveSectionIds = async () => {
  const sectionsData = sections.value.map(section => ({ id: section.id }));
  const jsonData = JSON.stringify(sectionsData, null, 2);
  console.log("Saving section IDs:", jsonData);

  const file = new File([jsonData], sectionsFileName, { type: 'application/json' });
  await putFile(`data/storage/petal/custom-sidebar/${sectionsFileName}`, false, file);
}

// Expose functions to be called from main.ts
defineExpose({
  addSection,
  removeSection,
  addFromClipboard,
  onSectionClick
})

</script>

<template>
  <div class="app-container">
    <SidebarSection
      v-for="section in sections"
      :key="section.id"
      :title="section.title"
      :section-id="section.id"
      :can-remove="sections.length > 1"
      :icon="section.icon"
      @remove="removeSection"
      @click="onSectionClick"
    >
      <div v-if="section.content" class="section-content">
        {{ section.content }}
      </div>
    </SidebarSection>
  </div>
</template>

<style scoped>
.app-container {
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.section-content {
  padding: 8px;
  color: var(--b3-theme-on-background);
  font-size: 14px;
}
</style>
