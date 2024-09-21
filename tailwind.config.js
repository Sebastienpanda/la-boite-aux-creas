/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/inertia_layout.edge',
    './inertia/pages/home.vue',
    './inertia/pages/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line unicorn/prefer-module
  plugins: [require('@tailwindcss/forms')],
}
