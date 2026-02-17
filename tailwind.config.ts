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
        bg: {
          primary: '#FFFFFF',
          muted: '#F3F4F6',
          dark: '#111827',
        },
        text: {
          primary: '#111827',
          secondary: '#374151',
          muted: '#6B7280',
          light: '#FFFFFF',
        },
        accent: {
          primary: '#3B82F6',
          secondary: '#10B981',
          amber: '#F59E0B',
        },
        border: {
          default: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        md: '6px',
        lg: '8px',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#374151',
            '--tw-prose-headings': '#111827',
            '--tw-prose-links': '#2563EB',
            '--tw-prose-bold': '#111827',
            '--tw-prose-code': '#111827',
            '--tw-prose-pre-bg': '#F3F4F6',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
