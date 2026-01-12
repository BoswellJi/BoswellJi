import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  setup(_option, nuxt) {
    nuxt.hook('build:manifest', (manifest) => {
      const keys = Object.keys(manifest);

      // detect vite plugin added
      if (!keys.some((key) => key.includes('polyfills-legacy'))) {
        return;
      }

      const entryKey = keys.find((key) => key.includes('entry-legacy')) as string;
      const entryValue = manifest[entryKey];

      // remove entry
      delete manifest[entryKey];

      // add entry end of manifest
      // @ts-ignore
      manifest[entryKey] = entryValue;

      // fix legacy module attributes
      for (const item in manifest) {
        // @ts-ignore
        manifest[item].module = item.includes('polyfills-legacy')
          ? false
          : !item.includes('-legacy.js');
      }
    });
  },
});
