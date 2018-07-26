var preset = {
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-class-properties'),
    [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],

    // 支持 import() 语法
    require.resolve('babel-plugin-syntax-dynamic-import'),
    require.resolve('babel-plugin-transform-runtime'),
    process.env.NODE_ENV === 'production' && require.resolve('babel-plugin-transform-react-remove-prop-types')
  ].filter(Boolean)
};

module.exports = preset;
