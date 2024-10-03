/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#1c85e8",
                    
          "secondary": "#082c4e",
                    
          "accent": "#1d6ab9",
                    
          "neutral": "#ffffff",
                    
          "base-100": "#f7f9fc",
                    
          "info": "#8092a4",
                    
          "success": "#2bc8a6",
                    
          "warning": "#ffaeae",
                    
          "error": "#ef4444",
                    },
        },
      ],
    },
}

