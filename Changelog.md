# Changelog: openapi3-ts

## Version 3.2.0

- PR [#94](https://github.com/metadevpro/openapi3-ts/pull/94) Export type `SchemaObjectType`.
- PR [#95](https://github.com/metadevpro/openapi3-ts/pull/95) Export type `SchemaObjectFormat`. Both contributed by @beautyfree

## Version 3.1.2

2022.11.19

- PR [#91](https://github.com/metadevpro/openapi3-ts/pull/91) Fix `addPath` to include merge semantics. Contributed by @MaurerKrisztian

## Version 3.1.1

2022.10.10

- PR [#89](https://github.com/metadevpro/openapi3-ts/pull/89) Make Webhooks optional (not supportet in OPenAPI 3.0). Contributed by @samchungy

## Version 3.1.0

2022.10.06

- PR [#88](https://github.com/metadevpro/openapi3-ts/pull/88) Added support to Webhooks. Contributed by @samchungy

## Version 3.0.3

2022.10.06

- PR [#87](https://github.com/metadevpro/openapi3-ts/pull/87) Enable type array for schema object on OpenAPI 3.1. contributed by @samchungy

## Version 3.0.2

2022.08.29

- PR [#85](https://github.com/metadevpro/openapi3-ts/pull/85) Enable support for version 3.0.1 and 3.1.0 (Lax typing for `exclusiveMinimum` and `exclusiveMaximum`). contributed by @RobinTail

## Version 3.0.1

2022.08.16

- PR [#82](https://github.com/metadevpro/openapi3-ts/pull/82) Emit helpers for the CJS build. contributed by @RobinTail

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
