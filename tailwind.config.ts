import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#8C1D40',
        ink: '#1a1a1a',
        paper: '#fcfcfd'
      }
    }
  },
  plugins: []
};

export default config;
