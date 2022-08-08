# Changelog: openapi3-ts

## Version 3.0.0

2022.08.07

- PR [#80](https://github.com/metadevpro/openapi3-ts/pull/80) contributed by @jonluca
  - Updated libs
  - Breaking change: Changed build system to output esm as well as cjs (folders `dist/mjs` and `dist/cjs` now respectively, instead of `dist` for cjs previously).
  - Changed test system to use vite
  - Added stricter extension prefix typing

## Version 2.0.2

2022.02.17

- Updated libs

## Version 2.0.1

2020.12.31

- Updated testing libs
- Added ESList + Prettier, removed TSList support
- Refactor to be consistent with ESLint + Prettier code-style rules
- No functional changes in this version: just end of year house-keeping.

## Version 2.0.0

2020.09.18

- Added Yaml Support and the first dependence to `yaml` library. Thanks to @DMavani
- Better typing for `type` and `format` properties. Thanks to @xeptore
- Keeping extensibility on `format`.

## Version 1.4.0

2020.06.06
