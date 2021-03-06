'use strict';

const sanitizeHtml = require('sanitize-html');

// Taken from https://github.com/jch/html-pipeline/blob/cdb943678efc905ec542487f33413e0ba0d322f3/lib/html/pipeline/sanitization_filter.rb#L41-L72.
// See https://github.com/github/markup/issues/245
/* eslint-disable id-length, sort-keys */
const gitHubOptions = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'h7',
    'h8',
    'br',
    'b',
    'i',
    'strong',
    'em',
    'a',
    'pre',
    'code',
    'img',
    'tt',
    'div',
    'ins',
    'del',
    'sup',
    'sub',
    'p',
    'ol',
    'ul',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'blockquote',
    'dl',
    'dt',
    'dd',
    'kbd',
    'q',
    'samp',
    'var',
    'hr',
    'ruby',
    'rt',
    'rp',
    'li',
    'tr',
    'td',
    'th',
    's',
    'strike',
    'summary',
    'details',
    // Some more custom tags for the permalink icons and GitHub syntax highlighting.
    'path',
    'span',
    'svg',
  ],
  allowedAttributes: {
    a: [
      'class', // For GitHub styling
      'href',
      'id', // For anchors
    ],
    img: ['src', 'longdesc'],
    div: ['itemscope', 'itemtype'],
    blockquote: ['cite'],
    del: ['cite'],
    ins: ['cite'],
    q: ['cite'],
    '*': [
      'abbr',
      'accept',
      'accept-charset',
      'accesskey',
      'action',
      'align',
      'alt',
      'axis',
      'border',
      'cellpadding',
      'cellspacing',
      'char',
      'charoff',
      'charset',
      'checked',
      'clear',
      'cols',
      'colspan',
      'color',
      'compact',
      'coords',
      'datetime',
      'dir',
      'disabled',
      'enctype',
      'for',
      'frame',
      'headers',
      'height',
      'hreflang',
      'hspace',
      'ismap',
      'label',
      'lang',
      'maxlength',
      'media',
      'method',
      'multiple',
      'name',
      'nohref',
      'noshade',
      'nowrap',
      'open',
      'prompt',
      'readonly',
      'rel',
      'rev',
      'rows',
      'rowspan',
      'rules',
      'scope',
      'selected',
      'shape',
      'size',
      'span',
      'start',
      'summary',
      'tabindex',
      'target',
      'title',
      'type',
      'usemap',
      'valign',
      'value',
      'vspace',
      'width',
      'itemprop',
    ],
    // Some more custom attributes for the permalink icons and GitHub syntax highlighting.
    path: ['d'],
    pre: ['class'],
    span: ['class'],
    svg: ['aria-hidden', 'class', 'height', 'version', 'viewbox', 'width'],
  },
};
/* eslint-enable id-length, sort-keys */

const sanitizeHtmlLikeGitHub = html => sanitizeHtml(html, gitHubOptions);

module.exports = {sanitizeHtmlLikeGitHub};
