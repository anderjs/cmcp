import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), tailwindcss(), dynamicImport()],
});
