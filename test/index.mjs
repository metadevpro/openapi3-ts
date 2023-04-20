import assert from 'node:assert';
import { oas31 } from 'openapi3-ts';
import { OpenApiBuilder } from 'openapi3-ts/oas31';

const builder1 = new oas31.OpenApiBuilder();
assert.ok(typeof builder1.rootDoc === 'object');
const builder2 = new OpenApiBuilder();
assert.ok(typeof builder2.rootDoc === 'object');
