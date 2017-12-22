'use strict';

const path = require('path');

const fs = require('fs-extra');
const getGitHubSlug = require('github-slugid');
const highlightJs = require('highlight.js');
const markdownIt = require('markdown-it');

const gitHubCssFilePath = require.resolve('github-markdown-css');
const highlightCssFilePath = require.resolve('highlight.js/styles/github.css');

const srcDirectoryPath = __dirname;
const faviconFilename = 'favicon.ico';
const indexHtmlFilename = 'index.html';

const permalinkIcon = String(
  // eslint-disable-next-line no-sync
  fs.readFileSync(path.join(__dirname, 'permalink.svg'))
);

const changelogPlugin = (md, {h1TitleCb}) => {
  md.core.ruler.push('h1Title', state => {
    const {tokens} = state;
    const h1OpeningTagIndex = tokens.findIndex(
      ({tag, type}) => type === 'heading_open' && tag === 'h1'
    );
    h1TitleCb(
      h1OpeningTagIndex >= 0
        ? tokens[h1OpeningTagIndex + 1].content
        : 'Missing <h1> title'
    );
  });

  md.core.ruler.push('permalinks', state => {
    const breadcrumbs = [];
    const replacements = [];
    const {Token, tokens} = state;

    const replaceTokenWithOthers = ({replacementTokens, tokenToReplace}) => {
      const tokenToReplaceIndex = tokens.indexOf(tokenToReplace);
      if (replacementTokens.length === 0) {
        return;
      }
      const [firstToken, ...otherTokens] = replacementTokens;
      tokens.splice(tokenToReplaceIndex, 1, firstToken);
      otherTokens.forEach((token, index) => {
        tokens.splice(tokenToReplaceIndex + index + 1, 0, token);
      });
    };

    tokens.forEach(token => {
      // We discard <h1> title because according to http://keepachangelog.com/en/1.0.0,
      // there should be only one of these and it's the main title.
      if (token.type !== 'heading_open' || token.tag === 'h1') {
        return;
      }

      const indexInBreadcrumbs = Number(token.tag.substring(1)) - 2;
      const indexOfTitleToken = tokens.indexOf(token) + 1;
      const titleToken = tokens[indexOfTitleToken];
      const title =
        indexInBreadcrumbs === 0
          ? // <h2> titles are release titles.
            // We only keep the release name and discard the release date.
            titleToken.content.match(/\[([^\\]+)\]/)[1]
          : titleToken.content;

      breadcrumbs.length = indexInBreadcrumbs;
      breadcrumbs[indexInBreadcrumbs] = title;

      const slug = getGitHubSlug(breadcrumbs.join('-').replace(/\./g, '-'));
      const linkOpenToken = new Token('link_open', 'a', 1);
      linkOpenToken.attrSet('id', slug);
      linkOpenToken.attrSet('href', `#${slug}`);
      linkOpenToken.attrSet('class', 'anchor');

      const permalinkToken = new Token('html_inline', '', 0);
      permalinkToken.content = permalinkIcon;

      replacements.push({
        replacementTokens: [
          linkOpenToken,
          permalinkToken,
          new Token('link_close', 'a', -1),
          titleToken,
        ],
        tokenToReplace: titleToken,
      });
    });

    replacements.forEach(replaceTokenWithOthers);
  });
};

const createMarkdownRenderer = h1TitleCb => {
  const markdownRenderer = markdownIt({
    highlight: (code, language) =>
      `<pre class="hljs"><code>${
        language && highlightJs.getLanguage(language)
          ? highlightJs.highlight(language, code, true).value
          : markdownRenderer.utils.escapeHtml(code)
      }</code></pre>`,
    typographer: true,
  }).use(changelogPlugin, {h1TitleCb});
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
      replacements.content = createMarkdownRenderer(h1Title => {
        replacements.title = h1Title;
      }).render(markdown);
      return Object.keys(replacements).reduce(
        (html, key) => html.replace(`<!-- ${key} -->`, replacements[key]),
        htmlTemplate
      );
    })
    .then(html =>
      fs.outputFile(path.join(outputDirectoryPath, indexHtmlFilename), html)
    );

module.exports = {convertChangelog};
