const fs = require('fs');
const path = require('path');
const config = require('./config.json');

let styleCache = {};

function getStyle(path) {
  if (
    process.env.NODE_ENV === 'production' &&
    typeof styleCache[path] === 'string'
  ) {
    return styleCache[path];
  }

  try {
    const style = fs.readFileSync(path + '.css', 'utf8');
    styleCache[path] = style;
    return style;
  } catch (error) {
    styleCache[path] = '';
    return '';
  }
}

function renderToString(Page, props, style) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${style}</style>
    <title>What's My IP Address?</title>
  </head>
  <body>
    ${Page(props)}
  </body>
</html>`;
}

const viewsOutputDir = path.join(process.cwd(), config.distDir);
const appFilename = '_app';

function renderFile(filePath, options, callback) {
  const appFilePath = path.resolve(viewsOutputDir, appFilename);
  let App = require(appFilePath);
  App = App.default || App;
  const appStyle = getStyle(appFilePath);

  const pageFilePath = path.resolve(
    viewsOutputDir,
    path.basename(filePath, '.jsx')
  );
  let Page = require(pageFilePath);
  Page = Page.default || Page;
  const pageStyle = getStyle(pageFilePath);

  const { settings, cache, _locals, ...props } = options;
  const style = appStyle + pageStyle;

  try {
    return callback(
      null,
      renderToString(App, { Component: Page, pageProps: props }, style)
    );
  } finally {
    if (process.env.NODE_ENV !== 'production') {
      delete require.cache[appFilePath + '.js'];
      delete require.cache[pageFilePath + '.js'];
    }
  }
}

module.exports = renderFile;
