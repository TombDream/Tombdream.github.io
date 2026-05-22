/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Noto Serif SC', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f8f7f4',
          100: '#f0ede8',
          200: '#ddd8cf',
          300: '#c4bdb0',
          400: '#a89d8e',
          500: '#8e8174',
          600: '#766b5e',
          700: '#5e554a',
          800: '#3d362d',
          900: '#211d18',
          950: '#0f0d0b',
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.800'),
            '--tw-prose-headings': theme('colors.ink.900'),
            '--tw-prose-links': theme('colors.ink.900'),
            '--tw-prose-code': theme('colors.ink.800'),
            '--tw-prose-quotes': theme('colors.ink.700'),
            maxWidth: 'none',
            lineHeight: '1.8',
            fontSize: '1.0625rem',
            h1: { fontFamily: theme('fontFamily.serif').join(','), fontWeight: '700', letterSpacing: '-0.02em' },
            h2: { fontFamily: theme('fontFamily.serif').join(','), fontWeight: '600', letterSpacing: '-0.01em' },
            h3: { fontFamily: theme('fontFamily.serif').join(','), fontWeight: '600' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: { backgroundColor: theme('colors.ink.100'), padding: '0.15em 0.4em', borderRadius: '0.3em', fontWeight: '400' },
            blockquote: { borderLeftColor: theme('colors.ink.300'), fontStyle: 'italic', color: theme('colors.ink.600') },
            a: { textDecoration: 'underline', textDecorationColor: theme('colors.ink.300'), textUnderlineOffset: '3px', transition: 'text-decoration-color 0.2s', '&:hover': { textDecorationColor: theme('colors.ink.800') } },
          }
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.ink.200'),
            '--tw-prose-headings': theme('colors.ink.50'),
            '--tw-prose-links': theme('colors.ink.100'),
            '--tw-prose-code': theme('colors.ink.200'),
            code: { backgroundColor: theme('colors.ink.800') },
          }
        }
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
