/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'serif'],
        bagel: ['"Bagel Fat One"', 'cursive'],
      },
      fontWeight: {
        300: '300',
        400: '400',
        600: '600',
        700: '700',
        800: '800',
      },
      screens: {
        'xs': '320px',   // Extra small screens
        'xss': '375px',
        'xsm': '425px',  // Extra small medium screens
        'sm': '640px',   // Small screens
        'md': '768px',   // Medium screens
        'lg': '1024px',  // Large screens
        'xl': '1280px',  // Extra large screens
        '2xl': '1536px', // 2 Extra large screens
      },
      colors: {
        customRed: {
          light: 'rgb(255, 102, 102)',    // Slightly lighter red
          dark: 'rgb(153, 0, 0)',         // Slightly darker red
        },
        customBlack: 'rgb(24, 24, 56)',  // Define custom black color
        customYellow: '#FACC15', // Define custom yellow color
      },
      backgroundImage: {
        'parallax1': 'url("./src/assets/landingImages/pexels-palumalerba-2426546.jpg")',
        'parallax2': 'url("./src/assets/landingImages/pexels-simo-3544415.jpg")'
      },
      // Custom font-variation-settings utility
      fontVariationSettings: {
        wdth: 100,  // Add custom font variations here
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      // Add custom component for font with variation settings
      addComponents({
        '.open-sans-custom': {
          fontFamily: '"Open Sans", serif',
          fontStyle: 'normal',
          fontWeight: '400',  // Adjust as needed (300, 600, etc.)
          fontVariationSettings: '"wdth" 100',  // This applies the width variation
        },
      });
    },
  ],
};

