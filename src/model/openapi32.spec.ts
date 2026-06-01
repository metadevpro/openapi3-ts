import { describe, expect, it } from 'vitest';
import {
    ReferenceObject,
    SchemaObject,
    SchemaObjectValue,
    addExtension,
    isReferenceObject,
    isSchemaObject
} from './openapi32';
import { IExtensionName, IExtensionType } from './specification-extension';

describe('type-guards unit tests', () => {
    describe('isSchemaObject()', () => {
        it('returns true for a schema object', () => {
            const schemaObject = new TestSchemaObject();
            expect(isSchemaObject(schemaObject)).toBe(true);
        });

        it('returns false for a reference object', () => {
            const referenceObject = new TestReferenceObject();
            expect(isSchemaObject(referenceObject)).toBe(false);
        });
    });

    describe('isReferenceObject()', () => {
        it('returns true for a reference object', () => {
            const referenceObject = new TestReferenceObject();
            expect(isReferenceObject(referenceObject)).toBe(true);
        });

        it('returns false for a schema object', () => {
            const schemaObject = new TestSchemaObject();
            expect(isReferenceObject(schemaObject)).toBe(false);
        });
    });
});

describe('addExtension()', () => {
    it('valid extension', () => {
        const subject = {};
        addExtension(subject, 'x-extension1', 'myvalue');
        expect(subject['x-extension1']).toBe('myvalue');
    });
    it('invalid extension', () => {
        const subject = {};
        addExtension(subject, 'ZZ-extension1', 'myvalue');
        expect(subject['ZZ-extension1']).not.toBe('myvalue');
    });
});

describe('SchemaObject', () => {
    it('accepts boolean schemas and JSON Schema 2020-12 vocabulary keywords', () => {
        const alwaysValid: SchemaObject = true;
        const schema: SchemaObjectValue = {
            $schema: 'https://json-schema.org/draft/2020-12/schema',
            $id: 'https://example.com/schemas/node',
            $dynamicAnchor: 'node',
            type: 'object',
            properties: {
                id: { type: 'string' },
                child: { $dynamicRef: '#node' },
                metadata: true
            },
            if: { required: ['kind'] },
            then: { properties: { kind: { const: 'node' } } },
            unevaluatedProperties: false,
            customVocabularyKeyword: { enabled: true }
        };

        expect(isSchemaObject(alwaysValid)).toBe(true);
        expect(schema.$dynamicAnchor).toBe('node');
        expect(schema.unevaluatedProperties).toBe(false);
        expect(schema.customVocabularyKeyword).toEqual({ enabled: true });
    });
});

class TestSchemaObject implements SchemaObjectValue {
    [keyword: string]: unknown;
    [k: IExtensionName]: IExtensionType;
    // empty schema
}

class TestReferenceObject implements ReferenceObject {
    $ref = 'test';
}
