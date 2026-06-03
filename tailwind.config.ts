// tailwind.config.ts
// Note: DaisyUI is a Tailwind plugin — it adds component classes like
// btn, card, input on top of standard Tailwind utility classes

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ['light', 'dark'],
  }
}

export default config