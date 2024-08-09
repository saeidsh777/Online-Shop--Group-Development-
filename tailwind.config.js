/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'green-c-100': '#C0E5D9',
                'red-c-100': '#E76767',
                'beige-c-100': '#F7DCB3',
            },
            screens: {
                // added some breakpoints for small devices
                // 320:text-gray 425:text-green ....
                320: '320px',
                375: '375px',
                425: '425px',
            },
        },
    },
    plugins: [],
};
