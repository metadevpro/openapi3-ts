import 'mocha';
import { expect } from 'chai';
import { SpecificationExtension } from './SpecificationExtension';

describe('SpecificationExtension', () => {
    it('addExtension() ok', () => {
        const sut = new SpecificationExtension();
        const extensionValue = { payload: 5 };
        sut.addExtension('x-name', extensionValue);

        expect(sut['x-name']).eql(extensionValue);
    });
    it('addExtension() invalid', (done) => {
        const sut = new SpecificationExtension();
        const extensionValue = { payload: 5 };
        try {
            sut.addExtension('y-name', extensionValue);
            done('Must fail. Invalid extension');
        } catch (err) {
            done();
        }
    });
    it('getExtension() ok', () => {
        const sut = new SpecificationExtension();
        const extensionValue1 = { payload: 5 };
        const extensionValue2 = { payload: 6 };
        sut.addExtension('x-name', extensionValue1);
        sut.addExtension('x-load', extensionValue2);

        expect(sut.getExtension('x-name')).eql(extensionValue1);
        expect(sut.getExtension('x-load')).eql(extensionValue2);
    });
    it('getExtension() invalid', (done) => {
        const sut = new SpecificationExtension();
        try {
            sut.getExtension('y-name');
            done('Error. invalid extension');
        } catch (err) {
            done();
        }
    });
    it('getExtension() not found', () => {
        const sut = new SpecificationExtension();
        expect(sut.getExtension('x-resource')).eql(null);
    });
    it('listExtensions()', () => {
        const sut = new SpecificationExtension();
        const extensionValue1 = { payload: 5 };
        const extensionValue2 = { payload: 6 };
        sut.addExtension('x-name', extensionValue1);
        sut.addExtension('x-load', extensionValue2);

        expect(sut.listExtensions()).eql(['x-name', 'x-load']);
    });
});
