import { getDocInfo, getFileBlob, getPathByID, listDocsByPath, putFile } from "@/api";

const sectionsFileName = 'sections.json';
const sectionsFilePath = `data/storage/petal/custom-sidebar/${sectionsFileName}`;

export async function saveSectionsToDisk(sections: SidebarSectionData[] | SidebarSectionSave[]): Promise<void> {
  const sectionsData = sections.map(section => ({
    id: section.id,
    expanded: section.expanded,
  }));
  const jsonData = JSON.stringify(sectionsData, null, 2);
  console.log("Saving section IDs:", jsonData);

  const file = new File([jsonData], sectionsFileName, { type: 'application/json' });
  await putFile(sectionsFilePath, false, file);
}

export async function getSectionSavesFromDisk(): Promise<SidebarSectionSave[]> {
  const savedSections = await getFileBlob(sectionsFilePath);

  if (!savedSections) return [];

  const text = await savedSections.text();
  return JSON.parse(text) as SidebarSectionSave[];
}

export async function loadSectionsFromDisk(): Promise<SidebarSectionData[]> {
  const sections = await getSectionSavesFromDisk();

  const loadedSections = await Promise.all(sections.map(async section => {
    const info = await getDocInfo(section.id);
    const path = await getPathByID(section.id);
    const subDirs = await listDocsByPath(path.notebook, path.path);
    const items = subDirs.files.map(doc => ({
      id: doc.id,
      title: doc.name.replace(/\.sy$/, ''),
      icon: doc.icon
    }));

    return {
      id: section.id,
      title: info.name || `Section ${loadedSections.length + 1}`,
      icon: info.icon,
      expanded: section.expanded !== undefined ? section.expanded : true,
      items: items
    };
  }));

  return loadedSections;
}
