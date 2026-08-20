/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                base: '#050505',
                surface: '#0A0A0A',
                cardbg: '#111111',
                lime: '#CAFF00',
                neon: '#00F0FF',
                muted: '#9CA3AF',
            },
            fontFamily: {
                display: ['"Cabinet Grotesk"', 'sans-serif'],
                tech: ['"JetBrains Mono"', 'monospace'],
                body: ['Outfit', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pulse-orb': {
                    '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.15)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-orb': 'pulse-orb 8s ease-in-out infinite'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
