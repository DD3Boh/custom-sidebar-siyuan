import {
  Dock,
  getFrontend,
  openMobileFileById,
  openTab,
  Plugin,
} from "siyuan";
import { createApp } from 'vue'
import AppComponent from './App.vue'
import { App } from "siyuan";
import { getSectionSavesFromDisk, saveSectionsToDisk } from "./utils/storage-helper";

let plugin = null
export function usePlugin(pluginProps?: Plugin): Plugin {
  console.log('usePlugin', pluginProps, plugin)
  if (pluginProps) {
    plugin = pluginProps
  }
  if (!plugin && !pluginProps) {
    console.error('need bind plugin')
  }
  return plugin;
}

export function openDoc(
  docId: string,
  app: App,
) {
  if (!plugin) {
    console.error('Plugin not initialized, cannot open doc')
    return;
  }

  const frontEnd = getFrontend();
  const isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile"

  if (isMobile)
    openMobileFileById(app, docId, ['cb-get-all']);
  else
    openTab({ app: plugin.app, doc: { id: docId } });
}

export async function addSectionById(id: string) {
  if (!appInstance) {
    console.log('App instance not initialized, saving section to storage');
    const sections = await getSectionSavesFromDisk();
    await saveSectionsToDisk(sections.concat({ id, expanded: true }));

    return;
  }

  if (appInstance.addSectionById)
    appInstance.addSectionById(id);
  else
    console.error('addSectionById method not available on app instance');
}

let app = null
let appInstance = null
let localDock: Dock = null
export function init(plugin: Plugin) {
  // bind plugin hook
  usePlugin(plugin);

  const DOCK_TYPE = "custom-dock";
  plugin.addDock({
      config: {
        position: "LeftTop",
        size: { width: 200, height: 0 },
        icon: "iconHeart",
        title: "Custom Dock",
        hotkey: "⌥⌘W",
      },
      data: {},
      type: DOCK_TYPE,
      resize() {
        console.log(DOCK_TYPE + " resize");
      },
      update() {
        console.log(DOCK_TYPE + " update");
      },
      init: (dock) => {
          localDock = dock;

          // Mount Vue app directly to the dock element
          app = createApp(AppComponent);
          appInstance = app.mount(dock.element);
      },
      destroy() {
          console.log("destroy dock:", DOCK_TYPE);
      }
  });

}

export function destroy() {
  if (app) {
    app.unmount()
    app = null
    appInstance = null
  }
}
