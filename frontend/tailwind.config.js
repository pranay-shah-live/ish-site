/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Oswald', 'sans-serif'],
                body: ['Lexend', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#1A56DB',
                    foreground: '#FFFFFF',
                },
                secondary: {
                    DEFAULT: '#FF6B00',
                    foreground: '#000000',
                },
                accent: {
                    DEFAULT: '#FDE047',
                    foreground: '#000000',
                },
                background: '#FFFFFF',
                foreground: '#111827',
                muted: {
                    DEFAULT: '#F3F4F6',
                    foreground: '#4B5563',
                },
                border: '#000000',
                card: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#000000',
                },
                input: '#E5E7EB',
                ring: '#000000',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'marquee': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-left': {
                    '0%': { opacity: '0', transform: 'translateX(-24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'fade-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                'marquee': 'marquee 30s linear infinite',
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
                'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
                'scale-in': 'scale-in 0.5s ease-out forwards',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
