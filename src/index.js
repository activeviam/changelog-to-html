'use strict';

const path = require('path');

const fs = require('fs-extra');
const highlightJs = require('highlight.js');
const markdownIt = require('markdown-it');

const gitHubCssFilePath = require.resolve('github-markdown-css');
const highlightCssFilePath = require.resolve('highlight.js/styles/github.css');

const {markdownItChangelogPlugin} = require('./markdown-it-changelog-plugin');
const {sanitizeHtmlLikeGitHub} = require('./sanitize-html-like-github');

const srcDirectoryPath = __dirname;
const faviconFilename = 'favicon.ico';
const indexHtmlFilename = 'index.html';

const createMarkdownRenderer = h1TitleCb => {
  const markdownRenderer = markdownIt({
    highlight: (code, language) =>
      `<pre class="hljs"><code>${
        language && highlightJs.getLanguage(language)
          ? highlightJs.highlight(language, code, true).value
          : markdownRenderer.utils.escapeHtml(code)
      }</code></pre>`,
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItChangelogPlugin, {h1TitleCb});
  return markdownRenderer;
};

const convertChangelog = ({
  faviconPath,
  markdownChangelogPath,
  outputDirectoryPath,
}) =>
  Promise.all([
    fs.readFile(markdownChangelogPath),
    fs.readFile(path.join(srcDirectoryPath, indexHtmlFilename)),
    Promise.all(
      [gitHubCssFilePath, highlightCssFilePath].map(cssFilePath =>
        fs.readFile(cssFilePath).then(String)
      )
    )
      .then(cssContents => cssContents.join(`\n\n`))
      .then(cssContent =>
        fs.outputFile(path.join(outputDirectoryPath, 'style.css'), cssContent)
      ),
    fs.copy(
      faviconPath || path.join(srcDirectoryPath, faviconFilename),
      path.join(outputDirectoryPath, faviconFilename)
    ),
  ])
    .then(([markdownBuffer, htmlBuffer]) =>
      [markdownBuffer, htmlBuffer].map(String)
    )
    .then(([markdown, htmlTemplate]) => {
      const replacements = {content: null, title: null};
      replacements.content = sanitizeHtmlLikeGitHub(
        createMarkdownRenderer(h1Title => {
          replacements.title = h1Title;
        }).render(markdown)
      );
      return Object.keys(replacements).reduce(
        (html, key) => html.replace(`<!-- ${key} -->`, replacements[key]),
        htmlTemplate
      );
    })
    .then(html =>
      fs.outputFile(path.join(outputDirectoryPath, indexHtmlFilename), html)
    );

module.exports = {convertChangelog};
