import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { pb: '#0077B6', cy: '#00B4D8', az: '#E0FBFC', co: '#FF6F59', nl: '#F8F9FA', db: '#F3F4F6', td: '#1D3557' },
      fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], head: ['var(--font-jakarta)', 'sans-serif'] },
      boxShadow: { soft: '0 10px 15px -3px rgba(23,37,84,.05)' },
    },
  },
  plugins: [],
};
export default config;
