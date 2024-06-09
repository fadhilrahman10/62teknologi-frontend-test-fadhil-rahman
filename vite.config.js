import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      })
    ],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.yelp.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy, options) => {
                    // Menambahkan header Authorization dengan API key Yelp
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        proxyReq.setHeader('Authorization', 'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx');
                    });
                }
            }
        }
    }
})
