const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'autoprefixer': {
      // Automatically add vendor prefixes based on browserslist
      flexbox: 'no-2009', // Disable old flexbox spec
      grid: 'autoplace', // Enable CSS Grid autoprefixing
    },
    'postcss-preset-env': {
      // Enable modern CSS features with fallbacks
      stage: 2, // Use stage 2 features (stable)
      features: {
        'custom-properties': {
          // Enable CSS custom properties with fallbacks
          preserve: true, // Keep original custom properties
        },
        'nesting-rules': true, // Enable CSS nesting
        'custom-media-queries': true, // Enable custom media queries
        'media-query-ranges': true, // Enable media query ranges
        'logical-properties-and-values': true, // Enable logical properties
        'color-functional-notation': true, // Enable modern color syntax
        'hexadecimal-alpha-notation': true, // Enable 8-digit hex colors
      },
      autoprefixer: {
        // Autoprefixer is included in preset-env, but we can configure it
        flexbox: 'no-2009',
        grid: 'autoplace',
      }
    },
    'postcss-custom-properties': {
      // Additional custom properties processing
      preserve: true, // Keep original custom properties
    }
  },
};

export default config;
