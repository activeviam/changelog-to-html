# Test Changelog

## [Unreleased]

### Added

* Showcase `code block`, _italic_, **bold** and ~~strikethrough~~.
* URLs are auto linked: https://example.com.
* Also supports syntax highlighting:

  ```javascript
  const sum = (a, b) => a + b;
  console.log(sum(1, 1));
  ```

### Changed

* The HTML subset allowed by GitHub can be used here too:
* Keyboard inputs can be represented: <kbd>Ctrl + Z</kbd>.
* <details><summary>Details work too.</summary><p>More technical information.</p></details>
* But scripts are escaped. <script>alert('Nope.')</script>
* And custom styles too. <style>body {color: pink !important}</style>

## [0.1.0] - 2001-01-01

### Added

* Tables are also supported:

  | First Column | Second Column |
  | ------------ | ------------- |
  | first cell   | second cell   |
  | third cell   | fourth cell   |
  | fifth cell   | sixth cell    |

### Changed

* And diffs too:

  ```diff
  --- old.md	2013-11-20 13:15:34.000000000 -0800
  +++ new.md	2013-11-20 13:15:31.000000000 -0800
  @@ -1,6 +1,6 @@
  -#### A Example for markdown-diff
  +#### An Example for Markdown-Diff

  -* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veinam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  +* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  ```

[unreleased]: https://example.com/#HEAD
[0.1.0]: https://example.com/#1.0.0
