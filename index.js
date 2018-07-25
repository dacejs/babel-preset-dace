var preset = {
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-class-properties'),
    [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
    require.resolve('babel-plugin-transform-runtime'),
    process.env.NODE_ENV === 'production' && require('babel-plugin-transform-react-remove-prop-types')
  ].filter(Boolean)
};

module.exports = preset;
