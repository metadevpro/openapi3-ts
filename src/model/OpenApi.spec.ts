import {
    addExtension,
    isSchemaObject,
    isReferenceObject,
    SchemaObject,
    ReferenceObject
} from './OpenApi';
import { IExtensionName, IExtensionType } from './SpecificationExtension';

describe('type-guards unit tests', () => {
    describe('isSchemaObject()', () => {
        it('returns true for a schema object', () => {
            const schemaObject = new TestSchemaObject();
            expect(isSchemaObject(schemaObject)).to.equal(true);
        });

        it('returns false for a reference object', () => {
            const referenceObject = new TestReferenceObject();
            expect(isSchemaObject(referenceObject)).to.equal(false);
        });
    });

    describe('isReferenceObject()', () => {
        it('returns true for a reference object', () => {
            const referenceObject = new TestReferenceObject();
            expect(isReferenceObject(referenceObject)).to.equal(true);
        });

        it('returns false for a schema object', () => {
            const schemaObject = new TestSchemaObject();
            expect(isReferenceObject(schemaObject)).to.equal(false);
        });
    });
});

describe('addExtension()', () => {
    it('valid extension', () => {
        const subject = {};
        addExtension(subject, 'x-extension1', 'myvalue');
        expect(subject['x-extension1']).to.equal('myvalue');
    });
    it('invalid extension', () => {
        const subject = {};
        addExtension(subject, 'ZZ-extension1', 'myvalue');
        expect(subject['ZZ-extension1']).not.to.equal('myvalue');
    });
});

class TestSchemaObject implements SchemaObject {
    [k: IExtensionName]: IExtensionType;
    // empty schema
}

class TestReferenceObject implements ReferenceObject {
    $ref = 'test';
}
