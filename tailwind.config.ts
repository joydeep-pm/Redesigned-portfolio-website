import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF6E6',
        ink: '#1D1A16',
        pink: '#FFB3C7',
        mint: '#B8ECD2',
        sky: '#B5D8FF',
        sun: '#FFD86B',
        lilac: '#D9C6FF',
        bg: {
          primary: '#FFF6E6',
          muted: '#FCEBCB',
          dark: '#1D1A16',
        },
        text: {
          primary: '#1D1A16',
          secondary: '#4A443B',
          muted: '#7A7266',
          light: '#FFFFFF',
        },
        accent: {
          primary: '#1D1A16',
          secondary: '#2F7A5C',
          amber: '#FFD86B',
        },
        border: {
          default: '#1D1A16',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        md: '12px',
        lg: '24px',
      },
      boxShadow: {
        pop: '5px 5px 0 #1D1A16',
        'pop-lg': '7px 7px 0 #1D1A16',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#4A443B',
            '--tw-prose-headings': '#1D1A16',
            '--tw-prose-links': '#1D1A16',
            '--tw-prose-bold': '#1D1A16',
            '--tw-prose-code': '#1D1A16',
            '--tw-prose-pre-bg': '#FCEBCB',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
