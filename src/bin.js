#!/usr/bin/env node
'use strict';

const {argv} = require('yargs').options({
  faviconPath: {
    describe:
      'The path to the favicon file to use in the static site. If no path is specified, the http://keepachangelog.com favicon will be used as a fallback.',
  },
  markdownChangelogPath: {
    default: 'CHANGELOG.md',
    describe: 'The path to the changelog file formatted in Markdown.',
  },
  outputDirectoryPath: {
    default: 'changelog-dist',
    describe:
      'The path of the directory where the static site assets will be created.',
  },
});

const {convertChangelog} = require('.');

convertChangelog(argv);
