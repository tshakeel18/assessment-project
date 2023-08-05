/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xsm: '200px',
        sm: '375px',
        md: '600px',
        lg: '900px',
        xl: '1280px',
        '2xl': '1736px'
      },
      height: {
        257: '257px',
        54: '54px',
        18: '18px',
        14: '14px',
        16: '16px',
        48: '48px',
        70: '70px'
      },
      width: {
        156: '156px',
        106: '106px',
        187: '187px',
        27: '27px',
        13: '13px',
        50: '50px'
      },
      maxWidth: {
        156: '156px'
      },
      margin: {
        162: '162px',
        13: '13px'
      },

      fontSize: {
        18: '18px'
      }
    }
  },
  plugins: []
};

export default tailwindConfig;
