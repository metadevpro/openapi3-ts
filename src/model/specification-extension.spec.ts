import { describe, expect, it } from 'vitest';
import { SpecificationExtension } from './specification-extension';

describe('SpecificationExtension', () => {
    it('addExtension() ok', () => {
        const sut = new SpecificationExtension();
        const extensionValue = { payload: 5 };
        sut.addExtension('x-name', extensionValue);

        expect(sut['x-name']).eql(extensionValue);
    });
    it('addExtension() invalid', ({ expect }) => {
        const sut = new SpecificationExtension();
        const extensionValue = { payload: 5 };
        expect(() => sut.addExtension('y-name', extensionValue)).toThrow();
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
    it('getExtension() invalid', ({ expect }) => {
        const sut = new SpecificationExtension();
        expect(() => sut.getExtension('y-name')).toThrow();
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
