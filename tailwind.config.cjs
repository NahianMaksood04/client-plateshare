module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A59',     // warm orange/persimmon
        accent: '#1B998B',      // teal accent
        muted: '#F6F5F3',
        text: '#14313D'
      },
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['"Poppins"', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        plateshare: {
          primary: '#FF7A59',
          secondary: '#1B998B',
          accent: '#FFD166',
          neutral: '#F6F5F3',
          'base-100': '#ffffff'
        }
      }
    ]
  }
};
