const assert = require('node:assert');
const { oas32 } = require('openapi3-ts');
const { OpenApiBuilder } = require('openapi3-ts/oas32');

const builder1 = new oas32.OpenApiBuilder();
assert.ok(typeof builder1.rootDoc === 'object');
const builder2 = new OpenApiBuilder();
assert.ok(typeof builder2.rootDoc === 'object');
