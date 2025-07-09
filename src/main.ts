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
              <div class="block__icons custom-dock">
                  <div class="block__logo">
                      <svg class="block__logoicon"><use xlink:href="#iconEmoji"></use></svg>
                      Custom Dock
                  </div>
                  <span class="fn__flex-1 fn__space"></span>
                  <span data-type="min" class="block__icon b3-tooltips b3-tooltips__sw"><svg class="block__logoicon"><use xlink:href="#iconMin"></use></svg></span>
              </div>
              <div class="fn__flex-1 plugin-sample__custom-dock">
                  ${dock.data.text}
              </div>
              </div>`;
          }
          localDock = dock;
          console.log("init dock:", DOCK_TYPE, dock);
          console.log("dock element:", dock.element);

          const originalDiv = localDock?.element.querySelector('.custom-dock');
          const div = originalDiv.appendChild(document.createElement('div'));
          app = createApp(App);
          app.mount(div);
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
