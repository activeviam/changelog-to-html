/* eslint-env jest */

'use strict';

const path = require('path');

const fs = require('fs-extra');

const {convertChangelog} = require('.');

describe('conversion', () => {
  const outputDirectoryPath = path.join(__dirname, 'test-dist');

  beforeEach(() => fs.ensureDir(outputDirectoryPath));
  afterEach(() => fs.remove(outputDirectoryPath));

  test('works as expected', () =>
    convertChangelog({
      faviconPath: null, // Use the default favicon.
      markdownChangelogPath: path.join(__dirname, 'TEST_CHANGELOG.md'),
      outputDirectoryPath,
    }).then(() =>
      fs
        .readFile(path.join(outputDirectoryPath, 'index.html'))
        .then(String)
        .then(html => expect(html).toMatchSnapshot())
    ));
});
