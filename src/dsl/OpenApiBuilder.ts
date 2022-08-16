import * as yaml from 'yaml';
import * as oa from '../model/index.js';

// Internal DSL for building an OpenAPI 3.0.x contract
// using a fluent interface

const defaultOpenAPIVersion: oa.OpenAPIVersion = '3.0.0';

export class OpenApiBuilder<V extends oa.OpenAPIVersion = typeof defaultOpenAPIVersion> {
    rootDoc: oa.OpenAPIObject<V>;

    static create<T extends oa.OpenAPIVersion>(doc?: oa.OpenAPIObject<T>): OpenApiBuilder<T> {
        return new OpenApiBuilder(doc);
    }

    constructor(doc?: oa.OpenAPIObject<V>) {
        this.rootDoc = doc || {
            openapi: defaultOpenAPIVersion as V,
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
        };
    }

    getSpec(): oa.OpenAPIObject<V> {
        return this.rootDoc;
    }

    getSpecAsJson(
        replacer?: (key: string, value: unknown) => unknown,
        space?: string | number
    ): string {
        return JSON.stringify(this.rootDoc, replacer, space);
    }
    getSpecAsYaml(): string {
        return yaml.stringify(this.rootDoc);
    }

    private static isValidOpenApiVersion(v: string): boolean {
        v = v || '';
        const match = /(\d+)\.(\d+).(\d+)/.exec(v);
        if (match) {
            const major = parseInt(match[1], 10);
            if (major >= 3) {
                return true;
            }
        }
        return false;
    }

    addOpenApiVersion(openApiVersion: V): OpenApiBuilder<V> {
        if (!OpenApiBuilder.isValidOpenApiVersion(openApiVersion)) {
            throw new Error(
                'Invalid OpenApi version: ' + openApiVersion + '. Follow convention: 3.x.y'
            );
        }
        this.rootDoc.openapi = openApiVersion;
        return this;
    }
    addInfo(info: oa.InfoObject): OpenApiBuilder<V> {
        this.rootDoc.info = info;
        return this;
    }
    addContact(contact: oa.ContactObject): OpenApiBuilder<V> {
        this.rootDoc.info.contact = contact;
        return this;
    }
    addLicense(license: oa.LicenseObject): OpenApiBuilder<V> {
        this.rootDoc.info.license = license;
        return this;
    }
    addTitle(title: string): OpenApiBuilder<V> {
        this.rootDoc.info.title = title;
        return this;
    }
    addDescription(description: string): OpenApiBuilder<V> {
        this.rootDoc.info.description = description;
        return this;
    }
    addTermsOfService(termsOfService: string): OpenApiBuilder<V> {
        this.rootDoc.info.termsOfService = termsOfService;
        return this;
    }
    addVersion(version: string): OpenApiBuilder<V> {
        this.rootDoc.info.version = version;
        return this;
    }
    addPath(path: string, pathItem: oa.PathItemObject<V>): OpenApiBuilder<V> {
        this.rootDoc.paths[path] = pathItem;
        return this;
    }
    addSchema(name: string, schema: oa.SchemaObject<V> | oa.ReferenceObject): OpenApiBuilder<V> {
        this.rootDoc.components.schemas[name] = schema;
        return this;
    }
    addResponse(
        name: string,
        response: oa.ResponseObject<V> | oa.ReferenceObject
    ): OpenApiBuilder<V> {
        this.rootDoc.components.responses[name] = response;
        return this;
    }
    addParameter(
        name: string,
        parameter: oa.ParameterObject<V> | oa.ReferenceObject
    ): OpenApiBuilder<V> {
        this.rootDoc.components.parameters[name] = parameter;
        return this;
    }
    addExample(name: string, example: oa.ExampleObject | oa.ReferenceObject): OpenApiBuilder<V> {
        this.rootDoc.components.examples[name] = example;
        return this;
    }
    addRequestBody(
        name: string,
        reqBody: oa.RequestBodyObject<V> | oa.ReferenceObject
    ): OpenApiBuilder<V> {
        this.rootDoc.components.requestBodies[name] = reqBody;
        return this;
    }
    addHeader(name: string, header: oa.HeaderObject<V> | oa.ReferenceObject): OpenApiBuilder<V> {
        this.rootDoc.components.headers[name] = header;
        return this;
    }
    addSecurityScheme(
        name: string,
        secScheme: oa.SecuritySchemeObject | oa.ReferenceObject
    ): OpenApiBuilder<V> {
        this.rootDoc.components.securitySchemes[name] = secScheme;
        return this;
    }
    addLink(name: string, link: oa.LinkObject | oa.ReferenceObject): OpenApiBuilder<V> {
        this.rootDoc.components.links[name] = link;
        return this;
    }
    addCallback(
        name: string,
        callback: oa.CallbackObject<V> | oa.ReferenceObject
    ): OpenApiBuilder<V> {
        this.rootDoc.components.callbacks[name] = callback;
        return this;
    }
    addServer(server: oa.ServerObject): OpenApiBuilder<V> {
        this.rootDoc.servers.push(server);
        return this;
    }
    addTag(tag: oa.TagObject): OpenApiBuilder<V> {
        this.rootDoc.tags.push(tag);
        return this;
    }
    addExternalDocs(extDoc: oa.ExternalDocumentationObject): OpenApiBuilder<V> {
        this.rootDoc.externalDocs = extDoc;
        return this;
    }
}
