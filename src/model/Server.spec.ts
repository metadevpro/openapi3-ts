import { Server, ServerVariable } from './Server';

describe('Server', () => {
    it('create server', () => {
        const v1 = new ServerVariable('dev', ['dev', 'qa', 'prod'], 'environment');
        const sut = new Server('http://api.qa.machine.org', 'qa maquine');
        sut.addVariable('environment', v1);

        expect(sut.url).eql('http://api.qa.machine.org');
        expect(sut.description).eql('qa maquine');
        expect(sut.variables.environment.default).eql('dev');
    });
});

describe('ServerVariable', () => {
    it('server var', () => {
        const sut = new ServerVariable('dev', ['dev', 'qa', 'prod'], 'environment');

        expect(sut.default).eql('dev');
        expect(sut.description).eql('environment');
        expect(sut.enum).eql(['dev', 'qa', 'prod']);
    });
});
