import { defineConfig } from "astro/config";
import criticalCSS from "astro-critical-css";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  integrations: [criticalCSS()],
});
