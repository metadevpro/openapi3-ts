import { describe, expect, it } from 'vitest';
import { OpenApiBuilder, Server, ServerVariable } from '.';

describe('Top barrel', () => {
    it('OpenApiBuilder is exported', () => {
        const sut = OpenApiBuilder.create();
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
