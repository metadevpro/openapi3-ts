import { describe, expect, it } from 'vitest';
import * as oa from '../model/openapi32';
import { OpenApiBuilder } from './openapi-builder32';

describe('OpenApiBuilder 3.2', () => {
    it('Build empty Spec', () => {
        expect(OpenApiBuilder.create().getSpec()).eql({
            openapi: '3.2.0',
            info: {
                title: 'app',
                version: 'version'
            },
            paths: {},
            components: {
                schemas: {},
                responses: {},
                parameters: {},
                examples: {},
                requestBodies: {},
                headers: {},
                securitySchemes: {},
                links: {},
                callbacks: {}
            },
            tags: [],
            servers: []
        });
    });
    it('Build with custom object', () => {
        const obj: oa.OpenAPIObject = {
            openapi: '3.2.0',
            $self: 'https://example.com/openapi.json',
            info: {
                title: 'app1',
                version: 'version2'
            },
            paths: {},
            components: {},
            tags: [],
            servers: []
        };
        expect(OpenApiBuilder.create(obj).getSpec()).eql(obj);
    });
    it('addOpenApiVersion 3.2', () => {
        const sut = OpenApiBuilder.create().addOpenApiVersion('3.2.0').rootDoc;
        expect(sut.openapi).eql('3.2.0');
    });
    it('addTitle', () => {
        const sut = OpenApiBuilder.create().addTitle('app7').rootDoc;
        expect(sut.info.title).eql('app7');
    });
    it('addServer with name', () => {
        const sut = OpenApiBuilder.create().addServer({
            url: 'https://api.example.com',
            name: 'production'
        }).rootDoc;
        expect(sut.servers?.[0]).eql({ url: 'https://api.example.com', name: 'production' });
    });
    it('addSchema', () => {
        const sut = OpenApiBuilder.create().addSchema('Pet', { type: 'object' }).rootDoc;
        expect(sut.components?.schemas?.Pet).eql({ type: 'object' });
    });
    it('addResponse', () => {
        const sut = OpenApiBuilder.create().addResponse('Created', { summary: 'Created' }).rootDoc;
        expect(sut.components?.responses?.Created).eql({ summary: 'Created' });
    });
    it('addTag with hierarchy', () => {
        const sut = OpenApiBuilder.create().addTag({
            name: 'partner',
            summary: 'Partner',
            parent: 'external',
            kind: 'audience'
        }).rootDoc;
        expect(sut.tags?.[0]).eql({
            name: 'partner',
            summary: 'Partner',
            parent: 'external',
            kind: 'audience'
        });
    });
    it('getSpecAsJson / getSpecAsYaml', () => {
        const sut = OpenApiBuilder.create().addTitle('app').rootDoc;
        const json = OpenApiBuilder.create(sut).getSpecAsJson();
        expect(JSON.parse(json).openapi).eql('3.2.0');
        const yaml = OpenApiBuilder.create(sut).getSpecAsYaml();
        expect(yaml).contains('openapi: 3.2.0');
    });

    // Exercises the OAS 3.2 document-structure additions through a realistic document.
    // This is primarily a compile-time type check (the object is typed as OpenAPIObject),
    // round-tripped through the builder to confirm the fields survive serialization.
    it('accepts a document exercising the OAS 3.2 additions', () => {
        const doc: oa.OpenAPIObject = {
            openapi: '3.2.0',
            $self: 'https://example.com/openapi.json', // root $self
            jsonSchemaDialect: 'https://spec.openapis.org/oas/3.1/dialect/base',
            info: { title: 'app', summary: 'A short summary', version: '1.0.0' },
            servers: [{ url: 'https://api.example.com', name: 'production' }], // Server.name
            tags: [
                { name: 'external', summary: 'External', kind: 'audience' },
                { name: 'partner', summary: 'Partner', parent: 'external', kind: 'audience' } // Tag hierarchy
            ],
            components: {
                // reusable Media Type bucket with streaming itemSchema
                mediaTypes: {
                    EventStream: {
                        itemSchema: { $ref: '#/components/schemas/AgentSSEEvent' }
                    }
                },
                schemas: {
                    Shape: {
                        oneOf: [{ $ref: '#/components/schemas/Cat' }],
                        discriminator: {
                            propertyName: 'kind',
                            mapping: { cat: '#/components/schemas/Cat' },
                            defaultMapping: '#/components/schemas/Unknown' // Discriminator.defaultMapping
                        },
                        xml: { nodeType: 'element', name: 'shape' } // XML.nodeType
                    }
                },
                securitySchemes: {
                    oauthDevice: {
                        type: 'oauth2',
                        oauth2MetadataUrl:
                            'https://example.com/.well-known/oauth-authorization-server',
                        deprecated: false,
                        flows: {
                            deviceAuthorization: {
                                deviceAuthorizationUrl: 'https://example.com/device',
                                tokenUrl: 'https://example.com/token',
                                scopes: { 'read:data': 'Read data' }
                            }
                        }
                    },
                    mtls: { type: 'mutualTLS' }
                }
            },
            paths: {
                '/items': {
                    query: { responses: {} }, // QUERY method
                    additionalOperations: { LOCK: { responses: {} } }, // additionalOperations
                    parameters: [
                        // querystring location + content
                        {
                            name: 'qs',
                            in: 'querystring',
                            content: { 'application/x-www-form-urlencoded': {} }
                        },
                        { name: 'session', in: 'cookie', style: 'cookie' } // cookie style
                    ],
                    post: {
                        requestBody: {
                            content: {
                                // content map value as a Reference Object (3.2)
                                'text/event-stream': { $ref: '#/components/mediaTypes/EventStream' }
                            }
                        },
                        responses: {
                            // Response with summary and no description (description optional in 3.2)
                            '201': {
                                summary: 'Created',
                                content: {
                                    'application/json': {
                                        examples: {
                                            sample: {
                                                dataValue: { id: 1 }, // Example.dataValue
                                                serializedValue: 'id=1' // Example.serializedValue
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const json = OpenApiBuilder.create(doc).getSpecAsJson();
        const parsed = JSON.parse(json);
        expect(parsed.$self).eql('https://example.com/openapi.json');
        expect(parsed.paths['/items'].query).toBeDefined();
        expect(parsed.paths['/items'].additionalOperations.LOCK).toBeDefined();
        expect(parsed.components.mediaTypes.EventStream.itemSchema.$ref).eql(
            '#/components/schemas/AgentSSEEvent'
        );
        expect(parsed.components.schemas.Shape.discriminator.defaultMapping).eql(
            '#/components/schemas/Unknown'
        );
        expect(
            parsed.components.securitySchemes.oauthDevice.flows.deviceAuthorization
                .deviceAuthorizationUrl
        ).eql('https://example.com/device');
        expect(parsed.paths['/items'].post.responses['201'].summary).eql('Created');
    });
});
