import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primaryGreen: "#31572C",
        lightGreen: "#466841",
        darkerGreen: "#2c4e28",
        fontGreen: "#31572C",
        offWhite: "#F7F7F7",
        primaryOrange: "#FFA50F",
        primaryBlack: "#212427",
        offWhiteInput: "#EFEFEF",
        inputBorder: "#A5A5A5"
      },
      boxShadow: {
        top: ' 0 -5px 5px -5px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
export default config
