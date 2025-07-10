let i18nCache: { [key: string]: string } = {}

export function initI18n(plugin: any) {
  try {
    if (plugin?.i18n)
      i18nCache = plugin.i18n
    else
      loadFallbackI18n()
  } catch (error) {
    console.warn('Could not initialize i18n, using fallback:', error)
    loadFallbackI18n()
  }
}

function loadFallbackI18n() {
  i18nCache = {
    sidebar: 'Sidebar',
    addNewSection: 'Add new section',
    minimizeTooltip: 'Min Ctrl+W',
    removeSectionTooltip: 'Remove {title} section',
    sectionFallback: 'Section {number}',
    addToSidebar: 'Add to sidebar'
  }
}

export function i18n(key: string, replacements?: { [key: string]: string | number }): string {
  let text = i18nCache[key] || key

  if (replacements) {
    Object.keys(replacements).forEach(replaceKey => {
      text = text.replace(new RegExp(`\\{${replaceKey}\\}`, 'g'), String(replacements[replaceKey]))
    })
  }

  return text
}

// Hook-based approach for Vue components
export function useI18n() {
  return {
    i18n: (key: string, replacements?: { [key: string]: string | number }): string => {
      return i18n(key, replacements)
    }
  }
}
