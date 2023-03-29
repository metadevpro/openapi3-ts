import { describe, expect, it } from 'vitest';
import { addExtension } from './oas-common';
import { ReferenceObject, SchemaObject, isReferenceObject, isSchemaObject } from './openapi30';
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

class TestSchemaObject implements SchemaObject {
    [k: IExtensionName]: IExtensionType;
    // empty schema
}

class TestReferenceObject implements ReferenceObject {
    $ref = 'test';
}
