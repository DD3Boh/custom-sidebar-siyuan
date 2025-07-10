import {
  Plugin,
  getFrontend,
} from "siyuan";
import "@/index.scss";
import { destroy, init, addSectionById } from '@/main'

export default class PluginSample extends Plugin {
  // Run as mobile
  public isMobile: boolean
  // Run in browser
  public isBrowser: boolean

  async onload() {
    const frontEnd = getFrontend();
    this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile"
    this.isBrowser = frontEnd.includes('browser')

    console.log('Plugin loaded, the plugin is ', this)

    this.eventBus.on("open-menu-doctree", (event) => {
      if (event && event.detail) {
        const nodeId = event.detail.elements[0].dataset.nodeId || null;
        event.detail.menu.addItem({
          label: "Add to sidebar",
          async click() {
            if (nodeId) await addSectionById(nodeId);
          },
        });
      }
    });

    init(this)
  }

  onunload() {
    destroy()
  }

  openSetting() {}
}
