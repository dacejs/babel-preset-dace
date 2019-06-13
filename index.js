var utils = require("@babel/helper-plugin-utils");
var declare =  utils.declare;

module.exports = declare((api, opts) => {
  api.assertVersion(7);

  return {
    presets: [
      [require.resolve('@babel/preset-env'), { modules: false }],
      require.resolve('@babel/preset-react')
    ],
    plugins: [
      require.resolve('@loadable/babel-plugin'),
      require.resolve('babel-plugin-add-module-exports'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-transform-modules-commonjs'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: false }],
      [require.resolve('@babel/plugin-syntax-object-rest-spread'), { useBuiltIns: true }],
      process.env.NODE_ENV === 'local' && require.resolve('@babel/plugin-transform-react-jsx-source'),

      // 支持 import() 语法
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-transform-runtime'),
      process.env.NODE_ENV === 'production' && require.resolve('babel-plugin-transform-react-remove-prop-types')
    ].filter(Boolean)
  };
});
