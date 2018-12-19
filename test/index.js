const fs = require('fs');
const path = require('path');
const glob = require('glob');
const babel = require('@babel/core');

describe('babel-preset-dace', () => {
  const { TEST_ONLY } = process.env;
  const cwd = path.resolve(__dirname, 'fixtures');
  let directories = fs.readdirSync(cwd);

  if (TEST_ONLY) {
    directories = directories.filter(d => d === TEST_ONLY);
  }

  directories.forEach(dirname => {
    it(dirname, () => {
      const folder = path.resolve(cwd, dirname);
      const input = path.resolve(folder, 'input.js');
      const exec = path.resolve(folder, 'exec.js');
      const options = path.resolve(folder, 'options.json');
      let babelOptions = null;
      if (fs.existsSync(options)) {
        babelOptions = {
          configFile: options
        };
        babelOptions = {
          ...babelOptions,
          babelrc: false
        }
      }
      if (fs.existsSync(input)) {
        const outputFilename = input.replace('input', 'output');
        // 有些浏览器会自动在文件末尾插入空行，需要把这种空行删掉
        // 否则会影响测试结果
        const expectCode = fs.readFileSync(outputFilename, 'utf8').replace(/\n$/, '');
        const b = babel.transformFileSync(input, babelOptions);
        expectCode.should.equal(b.code);
      }

      if (fs.existsSync(exec)) {
        require('@babel/register')(babelOptions);
        require(exec);
      }
    });
  });
});
