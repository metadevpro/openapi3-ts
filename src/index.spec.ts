import { describe, expect, it } from 'vitest';
import lib from './index';

describe('Top barrel', () => {
    it('OpenApiBuilder v. 3.0 is exported', () => {
        const sut = lib.oas30.OpenApiBuilder.create();
        expect(sut).not.toBeNull;
    });
    it('OpenApiBuilder v. 3.1 is exported', () => {
        const sut = lib.oas31.OpenApiBuilder.create();
        expect(sut).not.toBeNull;
    });
    it('Server is exported', () => {
        const sut = new lib.Server('a', 'b');
        expect(sut).not.toBeNull;
    });
    it('ServerVariable is exported', () => {
        const sut = new lib.ServerVariable('a', ['b'], 'c');
        expect(sut).not.toBeNull;
    });
});
