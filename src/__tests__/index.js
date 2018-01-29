/* eslint-env jest */

'use strict';

const path = require('path');

const fs = require('fs-extra');

const {convertChangelog} = require('..');

describe('conversion', () => {
  const outputDirectoryPath = path.join(__dirname, 'tmp');

  beforeEach(() => fs.ensureDir(outputDirectoryPath));
  afterEach(() => fs.remove(outputDirectoryPath));

  test('works as expected', () =>
    convertChangelog({
      faviconPath: null, // Use the default favicon.
      markdownChangelogPath: require.resolve('./CHANGELOG.md'),
      outputDirectoryPath,
    }).then(() =>
      fs
        .readFile(path.join(outputDirectoryPath, 'index.html'))
        .then(String)
        .then(html => expect(html).toMatchSnapshot())
    ));
});
