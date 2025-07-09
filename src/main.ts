import {
  Dock,
  Plugin,
} from "siyuan";
import { createApp } from 'vue'
import App from './App.vue'

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
      data: {
          text: "This is my custom dock"
      },
      type: DOCK_TYPE,
      resize() {
        console.log(DOCK_TYPE + " resize");
      },
      update() {
        console.log(DOCK_TYPE + " update");
      },
      init: (dock) => {
          if (this.isMobile) {
              dock.element.innerHTML = `<div class="toolbar toolbar--border toolbar--dark">
              <svg class="toolbar__icon"><use xlink:href="#iconEmoji"></use></svg>
                  <div class="toolbar__text">Custom Dock</div>
              </div>
              <div class="fn__flex-1 plugin-sample__custom-dock">
                  ${dock.data.text}
              </div>
              </div>`;
          } else {
              dock.element.innerHTML = `<div class="fn__flex-1 fn__flex-column">
              <div class="block__icons">
                  <div class="block__logo">
                      <svg class="block__logoicon"><use xlink:href="#iconEmoji"></use></svg>
                      Custom Dock
                  </div>
                  <span class="fn__flex-1 fn__space"></span>
                  <span data-type="add-section" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Add new section"><svg class="block__logoicon"><use xlink:href="#iconAdd"></use></svg></span>
                  <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw" aria-label="Min Ctrl+W"><svg class="block__logoicon"><use xlink:href="#iconMin"></use></svg></span>
              </div>
              <div class="fn__flex-1 custom-dock-content">
              </div>
              </div>`;
          }
          localDock = dock;
          console.log("init dock:", DOCK_TYPE, dock);
          console.log("dock element:", dock.element);

          // Add event listener for the add section button
          const addButton = dock.element.querySelector('[data-type="add-section"]');
          if (addButton) {
            addButton.addEventListener('click', () => {
              if (appInstance && appInstance.addSection) {
                appInstance.addSection();
              }
            });
          }

          const originalDiv = localDock?.element.querySelector('.custom-dock-content');
          const div = originalDiv.appendChild(document.createElement('div'));
          app = createApp(App);
          appInstance = app.mount(div);
      },
      destroy() {
          console.log("destroy dock:", DOCK_TYPE);
      }
  });

}

export function destroy() {
  app.unmount()
  const div = document.getElementById(this.name)
  document.body.removeChild(div)
}
