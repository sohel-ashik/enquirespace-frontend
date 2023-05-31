/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,ts,js,tsx}"
  ],
  theme: {
    extend: {
        colors: {
            bluish:'#001253' ,
            bluishLight:'#3E6D9C' ,
            ultraBluishLight: '#113f6d73',
            reddish: '#E14D2A',
            reddishLight: '#FD841F',
        }
    },
    
  },
  plugins: [],
}

