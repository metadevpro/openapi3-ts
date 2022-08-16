/* eslint-disable @typescript-eslint/no-explicit-any */
// Typed interfaces for OpenAPI 3.0.0 and 3.1.0
// see https://github.com/OAI/OpenAPI-Specification/tree/main/versions

import { ISpecificationExtension, SpecificationExtension } from './SpecificationExtension.js';

export function getExtension(obj: ISpecificationExtension, extensionName: string): any {
    if (SpecificationExtension.isValidExtension(extensionName)) {
        return obj[extensionName];
    }
    return undefined;
}
export function addExtension(
    obj: ISpecificationExtension,
    extensionName: string,
    extension: any
): void {
    if (SpecificationExtension.isValidExtension(extensionName)) {
        obj[extensionName] = extension;
    }
}

export type OpenAPIVersion = `3.0.${number}` | `3.1.${number}`;

export interface OpenAPIObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    openapi: V;
    info: InfoObject;
    servers?: ServerObject[];
    paths: PathsObject<V>;
    components?: ComponentsObject<V>;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;
}
export interface InfoObject extends ISpecificationExtension {
    title: string;
    description?: string;
    termsOfService?: string;
    contact?: ContactObject;
    license?: LicenseObject;
    version: string;
}
export interface ContactObject extends ISpecificationExtension {
    name?: string;
    url?: string;
    email?: string;
}
export interface LicenseObject extends ISpecificationExtension {
    name: string;
    url?: string;
}
export interface ServerObject extends ISpecificationExtension {
    url: string;
    description?: string;
    variables?: { [v: string]: ServerVariableObject };
}
export interface ServerVariableObject extends ISpecificationExtension {
    enum?: string[] | boolean[] | number[];
    default: string | boolean | number;
    description?: string;
}
export interface ComponentsObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    schemas?: { [schema: string]: SchemaObject<V> | ReferenceObject };
    responses?: { [response: string]: ResponseObject<V> | ReferenceObject };
    parameters?: { [parameter: string]: ParameterObject<V> | ReferenceObject };
    examples?: { [example: string]: ExampleObject | ReferenceObject };
    requestBodies?: { [request: string]: RequestBodyObject<V> | ReferenceObject };
    headers?: { [header: string]: HeaderObject<V> | ReferenceObject };
    securitySchemes?: { [securityScheme: string]: SecuritySchemeObject | ReferenceObject };
    links?: { [link: string]: LinkObject | ReferenceObject };
    callbacks?: { [callback: string]: CallbackObject<V> | ReferenceObject };
}

export interface PathsObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    // [path: string]: PathItemObject;
    [path: string]: PathItemObject<V> | any; // Hack for allowing ISpecificationExtension
}

/**
 * @deprecated
 * Create a type alias for backward compatibility
 */
export type PathObject<V extends OpenAPIVersion> = PathsObject<V>;

export function getPath<V extends OpenAPIVersion = OpenAPIVersion>(
    pathsObject: PathsObject<V>,
    path: string
): PathItemObject<V> | undefined {
    if (SpecificationExtension.isValidExtension(path)) {
        return undefined;
    }
    return pathsObject[path] as PathItemObject<V>;
}

export interface PathItemObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    $ref?: string;
    summary?: string;
    description?: string;
    get?: OperationObject<V>;
    put?: OperationObject<V>;
    post?: OperationObject<V>;
    delete?: OperationObject<V>;
    options?: OperationObject<V>;
    head?: OperationObject<V>;
    patch?: OperationObject<V>;
    trace?: OperationObject<V>;
    servers?: ServerObject[];
    parameters?: (ParameterObject<V> | ReferenceObject)[];
}
export interface OperationObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    operationId?: string;
    parameters?: (ParameterObject<V> | ReferenceObject)[];
    requestBody?: RequestBodyObject<V> | ReferenceObject;
    responses: ResponsesObject<V>;
    callbacks?: CallbacksObject<V>;
    deprecated?: boolean;
    security?: SecurityRequirementObject[];
    servers?: ServerObject[];
}
export interface ExternalDocumentationObject extends ISpecificationExtension {
    description?: string;
    url: string;
}

/**
 * The location of a parameter.
 * Possible values are "query", "header", "path" or "cookie".
 * Specification:
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameter-locations
 */
export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie';

/**
 * The style of a parameter.
 * Describes how the parameter value will be serialized.
 * (serialization is not implemented yet)
 * Specification:
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#style-values
 */
export type ParameterStyle =
    | 'matrix'
    | 'label'
    | 'form'
    | 'simple'
    | 'spaceDelimited'
    | 'pipeDelimited'
    | 'deepObject';

export interface BaseParameterObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;

    style?: ParameterStyle; // "matrix" | "label" | "form" | "simple" | "spaceDelimited" | "pipeDelimited" | "deepObject";
    explode?: boolean;
    allowReserved?: boolean;
    schema?: SchemaObject<V> | ReferenceObject;
    examples?: { [param: string]: ExampleObject | ReferenceObject };
    example?: any;
    content?: ContentObject<V>;
}

export interface ParameterObject<V extends OpenAPIVersion> extends BaseParameterObject<V> {
    name: string;
    in: ParameterLocation; // "query" | "header" | "path" | "cookie";
}
export interface RequestBodyObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    description?: string;
    content: ContentObject<V>;
    required?: boolean;
}
export interface ContentObject<V extends OpenAPIVersion> {
    [mediatype: string]: MediaTypeObject<V>;
}
export interface MediaTypeObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    schema?: SchemaObject<V> | ReferenceObject;
    examples?: ExamplesObject;
    example?: any;
    encoding?: EncodingObject<V>;
}
export interface EncodingObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    // [property: string]: EncodingPropertyObject;
    [property: string]: EncodingPropertyObject<V> | any; // Hack for allowing ISpecificationExtension
}
export interface EncodingPropertyObject<V extends OpenAPIVersion> {
    contentType?: string;
    headers?: { [key: string]: HeaderObject<V> | ReferenceObject };
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    [key: string]: any; // (any) = Hack for allowing ISpecificationExtension
}
export interface ResponsesObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    default?: ResponseObject<V> | ReferenceObject;

    // [statuscode: string]: ResponseObject | ReferenceObject;
    [statuscode: string]: ResponseObject<V> | ReferenceObject | any; // (any) = Hack for allowing ISpecificationExtension
}
export interface ResponseObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    description: string;
    headers?: HeadersObject<V>;
    content?: ContentObject<V>;
    links?: LinksObject;
}
export interface CallbacksObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    // [name: string]: CallbackObject | ReferenceObject;
    [name: string]: CallbackObject<V> | ReferenceObject | any; // Hack for allowing ISpecificationExtension
}
export interface CallbackObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    // [name: string]: PathItemObject;
    [name: string]: PathItemObject<V> | any; // Hack for allowing ISpecificationExtension
}
export interface HeadersObject<V extends OpenAPIVersion> {
    [name: string]: HeaderObject<V> | ReferenceObject;
}
export interface ExampleObject {
    summary?: string;
    description?: string;
    value?: any;
    externalValue?: string;
    [property: string]: any; // Hack for allowing ISpecificationExtension
}
export interface LinksObject {
    [name: string]: LinkObject | ReferenceObject;
}
export interface LinkObject extends ISpecificationExtension {
    operationRef?: string;
    operationId?: string;
    parameters?: LinkParametersObject;
    requestBody?: any | string;
    description?: string;
    server?: ServerObject;
    [property: string]: any; // Hack for allowing ISpecificationExtension
}
export interface LinkParametersObject {
    [name: string]: any | string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderObject<V extends OpenAPIVersion> extends BaseParameterObject<V> {
    $ref?: string;
}
export interface TagObject extends ISpecificationExtension {
    name: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    [extension: string]: any; // Hack for allowing ISpecificationExtension
}
export interface ExamplesObject {
    [name: string]: ExampleObject | ReferenceObject;
}

export interface ReferenceObject {
    $ref: string;
}

/**
 * A type guard to check if the given value is a `ReferenceObject`.
 * See https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
 *
 * @param obj The value to check.
 */
export function isReferenceObject(obj: any): obj is ReferenceObject {
    return Object.prototype.hasOwnProperty.call(obj, '$ref');
}

export interface SchemaObject<V extends OpenAPIVersion> extends ISpecificationExtension {
    nullable?: boolean;
    discriminator?: DiscriminatorObject;
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: XmlObject;
    externalDocs?: ExternalDocumentationObject;
    example?: any;
    examples?: any[];
    deprecated?: boolean;

    type?: 'integer' | 'number' | 'string' | 'boolean' | 'object' | 'null' | 'array';
    format?:
        | 'int32'
        | 'int64'
        | 'float'
        | 'double'
        | 'byte'
        | 'binary'
        | 'date'
        | 'date-time'
        | 'password'
        | string;
    allOf?: (SchemaObject<V> | ReferenceObject)[];
    oneOf?: (SchemaObject<V> | ReferenceObject)[];
    anyOf?: (SchemaObject<V> | ReferenceObject)[];
    not?: SchemaObject<V> | ReferenceObject;
    items?: SchemaObject<V> | ReferenceObject;
    properties?: { [propertyName: string]: SchemaObject<V> | ReferenceObject };
    additionalProperties?: SchemaObject<V> | ReferenceObject | boolean;
    description?: string;
    default?: any;

    title?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: V extends `3.1.${number}` ? number : boolean;
    minimum?: number;
    exclusiveMinimum?: V extends `3.1.${number}` ? number : boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    enum?: any[];
}

/**
 * A type guard to check if the given object is a `SchemaObject`.
 * Useful to distinguish from `ReferenceObject` values that can be used
 * in most places where `SchemaObject` is allowed.
 *
 * See https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
 *
 * @param schema The value to check.
 */
export function isSchemaObject<V extends OpenAPIVersion = OpenAPIVersion>(
    schema: SchemaObject<V> | ReferenceObject
): schema is SchemaObject<V> {
    return !Object.prototype.hasOwnProperty.call(schema, '$ref');
}

export interface SchemasObject<V extends OpenAPIVersion> {
    [schema: string]: SchemaObject<V>;
}

export interface DiscriminatorObject {
    propertyName: string;
    mapping?: { [key: string]: string };
}

export interface XmlObject extends ISpecificationExtension {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
}
export type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

export interface SecuritySchemeObject extends ISpecificationExtension {
    type: SecuritySchemeType;
    description?: string;
    name?: string; // required only for apiKey
    in?: string; // required only for apiKey
    scheme?: string; // required only for http
    bearerFormat?: string;
    flows?: OAuthFlowsObject; // required only for oauth2
    openIdConnectUrl?: string; // required only for openIdConnect
}
export interface OAuthFlowsObject extends ISpecificationExtension {
    implicit?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
}
export interface OAuthFlowObject extends ISpecificationExtension {
    authorizationUrl?: string;
    tokenUrl?: string;
    refreshUrl?: string;
    scopes: ScopesObject;
}
export interface ScopesObject extends ISpecificationExtension {
    [scope: string]: any; // Hack for allowing ISpecificationExtension
}
export interface SecurityRequirementObject {
    [name: string]: string[];
}
