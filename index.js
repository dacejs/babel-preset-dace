var values = envs => envs
  .map(item => {
    if (item === 'production') {
      return 'and "' + item + '"';
    }
    return '"' + item + '"';
  })
  .join(", ");

var envs = ['local', 'development', 'beta', 'production'];

var env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (envs.indexOf(env) === -1) {
  throw new Error(
    'Using `babel-preset-dace` requires that you specify `NODE_ENV` or ' +
      '`BABEL_ENV` environment variables. Valid values are ' + values(envs) +
      '. Instead, received: ' + JSON.stringify(env) + '.'
  );
}

var preset = {
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-react')
  ],
  plugins: [
    require.resolve('loadable-components/babel'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-class-properties'),
    [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
    process.env.NODE_ENV === 'local' && require.resolve('babel-plugin-transform-react-jsx-source'),

    // 支持 import() 语法
    require.resolve('babel-plugin-syntax-dynamic-import'),
    require.resolve('babel-plugin-transform-runtime'),
    process.env.NODE_ENV === 'production' && require.resolve('babel-plugin-transform-react-remove-prop-types')
  ].filter(Boolean)
};

module.exports = preset;
