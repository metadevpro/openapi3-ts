# Changelog: openapi3-ts

## Version 4.1.2

2023.04.25

- Fix [#113](https://github.com/metadevpro/openapi3-ts/pull/113) Fix nullable on 3.0 types by @samchungy
- Fix [#116](https://github.com/metadevpro/openapi3-ts/pull/116) Export with .mjs extension by @koooge
- Fix [#117](https://github.com/metadevpro/openapi3-ts/pull/117) Support subpath for tsc with moduleResolutin node by @koooge
- Fix [#118](https://github.com/metadevpro/openapi3-ts/pull/118) Bump yaml from 2.2.1 to 2.2.2 
- Update dependencies to latest.

## Version 4.1.1

2023.04.15

- Fix [#112](https://github.com/metadevpro/openapi3-ts/pull/112) Remove `nullable` & deprecate `example` in OAS 3.1 by @samchungy.

## Version 4.1.0

2023.04.14

- [#111](https://github.com/metadevpro/openapi3-ts/pull/111) Improved exports by @koooge

## Version 4.0.4

2023.04.10

- [#108](https://github.com/metadevpro/openapi3-ts/pull/108) Bug fix: Remove any type from `paths` by @samchungy.
- [#109](https://github.com/metadevpro/openapi3-ts/pull/109) Bug fix: Fixup types `example` & `prefixItems`  by @samchungy.

## Version 4.0.3

2023.03.30

- Bug fix. Stricter TS compilation. Fix issue [#105](https://github.com/metadevpro/openapi3-ts/issues/105)

## Version 4.0.2

2023.03.30

- PR [#104](https://github.com/metadevpro/openapi3-ts/pull/104) Fix export for cjs by @RobinTail

## Version 4.0.1

2023.03.29

- Added instructions to README for consuing the library for v. 3.1.0 vs 3.0.0
- PR [#100](https://github.com/metadevpro/openapi3-ts/pull/99) Fix typo by @RobinTail
- PR [#99](https://github.com/metadevpro/openapi3-ts/pull/99) Fix typo by @RobinTail
- PR [#97](https://github.com/metadevpro/openapi3-ts/pull/97) Export type `SchemaObjectType` by @RobinTail
- PR [#96](https://github.com/metadevpro/openapi3-ts/pull/96) Support prefixItems by @samchungy

## Version 4.0.0  

2023.03.27

- Breaking change. Adds explicit support for OAS 3.0 and OAS 3.1 as separate implementations.

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
