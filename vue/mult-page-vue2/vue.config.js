const glob = require("glob");

const dirs = glob.sync('./src/pages/*', {});
const pages = {};

dirs.forEach((dir) => {
  const dirname = dir.slice(dir.lastIndexOf('/')+1);
  pages[dirname] = {
    entry: `${dir}/main.js`,
    template: `public/${dirname}.html`,
    filename: `${dirname}.html`,
    chunks: ['chunk-vendors', 'chunk-common', dirname]
  };
});

module.exports = {
  pages,
  devServer: {
    port: 7300,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};