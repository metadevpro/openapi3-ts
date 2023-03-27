import { describe, expect, it } from 'vitest';
import { Server, ServerVariable } from './server';

describe('Server', () => {
    it('create server', () => {
        const v1 = new ServerVariable('dev', ['dev', 'qa', 'prod'], 'environment');
        const sut = new Server('http://api.qa.machine.org', 'qa maquine');
        sut.addVariable('environment', v1);

        expect(sut.url).toBe('http://api.qa.machine.org');
        expect(sut.description).toBe('qa maquine');
        expect(sut.variables.environment.default).toBe('dev');
    });
});

describe('ServerVariable', () => {
    it('server var', () => {
        const sut = new ServerVariable('dev', ['dev', 'qa', 'prod'], 'environment');

        expect(sut.default).toBe('dev');
        expect(sut.description).toBe('environment');
        expect(sut.enum).toStrictEqual(['dev', 'qa', 'prod']);
    });
});
