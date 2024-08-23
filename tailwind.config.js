/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './hooks/**/*.{js,ts,jsx,tsx,mdx}',
        './contexts/**/*.{js,ts,jsx,tsx,mdx}',
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
                dashboard: {
                    bg: '#F8F9FA',
                    text: '#5b6b79',
                    title: 'rgb(29, 38, 48)',
                    sidebar: {
                        textActive: '#4680ff',
                        hover: 'rgb(243, 245, 247)',
                        bgActive: 'rgba(70, 128, 255, 0.08)',
                        bgActiveHover: 'rgba(70, 128, 255, 0.12)',
                    },
                },
            },
            screens: {
                // added some breakpoints for small devices
                // 320:text-gray 425:text-green ....
                320: '320px',
                375: '375px',
                425: '425px',
                // md < 896px < lg
                896: '896px',
                // lg < 1152px < xl
                1152: '1152px',
            },
            fontFamily: {
                roboto: 'var(--roboto-font)',
            },
        },
    },
    plugins: [],
};
