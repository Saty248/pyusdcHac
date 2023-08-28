/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        "light-pink": "#F0F0FA",
        "dark": "#252530",
        "light-dark": "#1E1E1E",
        "light-grey": "#F0F0FA",  
        'milk': "#E6EEFD",
        "blue": "#0653EA",
        "sky-blue": "#F4F8FF", 
        "light-blue": "rgba(6, 83, 234, 0.10)",
        "light-brown": "rgba(63, 61, 86, 0.75)",
        "dark-brown": "#3F3D56",
        "brown": "#3F3D56",
        "light-red": "#FC6681",
        "light-green": "#29AE55"
      },
      fontFamily: {
        "sans": ['poppins', 'sans-serif'] 
      },
      fontSize: {
        'xs': "10px",
        'sm': '12px',
        'sml': "14px",
        'base': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '50px',
      },
      backgroundImage: {
        'map-bg': "url('/images/map-bg.png')",
      }
    },
  },
  plugins: [],
}
