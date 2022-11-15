module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'phone': '475',
      'tablet-portrait': '600px',
      'tablet-landscape': '900px',
      'deskstop': '1200px',
      'big-desktop': '2400px',
    },
    colors: {
      'p_green': '#1ac182',
      'p_purple': '#7621d8',
      'bg-purple': '#f0edf3',
      'bg-green': '#dbf2e9',
    },
    fontFamily: {
    },
    extend: {}
  },
  plugins: [],
}
