const fullVariant = ['responsive', 'group-hover', 'first', 'last', 'odd', 'even', 'hover', 'focus', 'active', 'visited', 'disabled']
module.exports = {
  important: true,
  theme: {
    extend: {
      minWidth: theme => theme('maxWidth')
    },
  },
  variants: {
    backgroundColor: fullVariant,
    padding: fullVariant
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
}
