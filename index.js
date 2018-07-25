var preset = {
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-class-properties'),

    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      {
        useBuiltIns: true,
      },
    ],
    // Adds syntax support for import()
    // require.resolve('babel-plugin-syntax-dynamic-import'),
    // Add support for async/await
    require.resolve('babel-plugin-transform-runtime'),
  ],
};

module.exports = preset;
