interface SidebarSectionData {
  id: string
  title: string
  icon?: string,
  items?: SidebarItem[]
  expanded?: boolean
}

interface SidebarItem {
  id: string
  title: string
  icon?: string
}

interface SidebarSectionSave {
  id: string
  expanded?: boolean
}
