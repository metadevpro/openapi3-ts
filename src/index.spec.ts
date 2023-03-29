import { describe, expect, it } from 'vitest';
import { oas30, oas31, Server, ServerVariable } from '.';

describe('Top barrel', () => {
    it('OpenApiBuilder v. 3.0 is exported', () => {
        const sut = oas30.OpenApiBuilder.create();
        expect(sut).not.toBeNull;
    });
    it('OpenApiBuilder v. 3.1 is exported', () => {
        const sut = oas31.OpenApiBuilder.create();
        expect(sut).not.toBeNull;
    });
    it('Server is exported', () => {
        const sut = new Server('a', 'b');
        expect(sut).not.toBeNull;
    });
    it('ServerVariable is exported', () => {
        const sut = new ServerVariable('a', ['b'], 'c');
        expect(sut).not.toBeNull;
    });
});
