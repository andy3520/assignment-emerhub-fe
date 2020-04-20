const purgecss = require('@fullhuman/postcss-purgecss')({

  // Specify the paths to all of the template files in your project 
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './public/index.html'
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
  whitelistPatternsChildren: [/^tooltip/, /^v--modal/]
})

module.exports = {
  "plugins": [
    require('tailwindcss')('tailwind.js'),
    require('autoprefixer')(),
    // purgecss
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}