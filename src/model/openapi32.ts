/* eslint-disable @typescript-eslint/no-explicit-any */

// Typed interfaces for OpenAPI 3.2.0
// see https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md

import { ServerVariableObject } from './oas-common';
import { ISpecificationExtension, SpecificationExtension } from './specification-extension';

export { getExtension, addExtension } from './oas-common';
export type { ServerVariableObject } from './oas-common';
export type { ISpecificationExtension, SpecificationExtension } from './specification-extension';

/**
 * Server Object.
 *
 * Defined here (rather than re-exported from `oas-common`) because OAS 3.2 adds the
 * `name` field, which is not part of the shared 3.0/3.1 Server Object.
 * @see https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#server-object
 */
export interface ServerObject extends ISpecificationExtension {
    url: string;
    description?: string;
    /** @since OAS 3.2 An optional unique string to refer to the host designated by the URL. */
    name?: string;
    variables?: { [v: string]: ServerVariableObject };
}

export interface OpenAPIObject extends ISpecificationExtension {
    openapi: string;
    /**
     * @since OAS 3.2 The self-assigned URI of this document (RFC3986 URI-reference),
     * which also serves as its base URI for resolving relative references.
     */
    $self?: string;
    info: InfoObject;
    /** The default value for the `$schema` keyword within Schema Objects in this document (URI). */
    jsonSchemaDialect?: string;
    servers?: ServerObject[];
    paths?: PathsObject;
    components?: ComponentsObject;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;
    /** Webhooks added in v. 3.1.0 */
    webhooks?: PathsObject;
}
export interface InfoObject extends ISpecificationExtension {
    title: string;
    /** A short summary of the API. */
    summary?: string;
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
    identifier?: string;
    url?: string;
}

export interface ComponentsObject extends ISpecificationExtension {
    schemas?: { [schema: string]: SchemaObject | ReferenceObject };
    responses?: { [response: string]: ResponseObject | ReferenceObject };
    parameters?: { [parameter: string]: ParameterObject | ReferenceObject };
    examples?: { [example: string]: ExampleObject | ReferenceObject };
    requestBodies?: { [request: string]: RequestBodyObject | ReferenceObject };
    headers?: { [header: string]: HeaderObject | ReferenceObject };
    securitySchemes?: { [securityScheme: string]: SecuritySchemeObject | ReferenceObject };
    links?: { [link: string]: LinkObject | ReferenceObject };
    callbacks?: { [callback: string]: CallbackObject | ReferenceObject };
    pathItems?: { [pathItem: string]: PathItemObject | ReferenceObject };
    /** @since OAS 3.2 An object to hold reusable Media Type Objects. */
    mediaTypes?: { [mediaType: string]: MediaTypeObject | ReferenceObject };
}

/**
 * Rename it to Paths Object to be consistent with the spec
 * See https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#paths-object
 */
export interface PathsObject extends ISpecificationExtension {
    // [path: string]: PathItemObject;
    [path: string]: PathItemObject;
}

/**
 * @deprecated
 * Create a type alias for backward compatibility
 */
export type PathObject = PathsObject;

export function getPath(
    pathsObject: PathsObject | undefined,
    path: string
): PathItemObject | undefined {
    if (SpecificationExtension.isValidExtension(path)) {
        return undefined;
    }
    return pathsObject ? (pathsObject[path] as PathItemObject) : undefined;
}

export interface PathItemObject extends ISpecificationExtension {
    $ref?: string;
    summary?: string;
    description?: string;
    get?: OperationObject;
    put?: OperationObject;
    post?: OperationObject;
    delete?: OperationObject;
    options?: OperationObject;
    head?: OperationObject;
    patch?: OperationObject;
    trace?: OperationObject;
    /** @since OAS 3.2 A definition of a QUERY operation on this path. */
    query?: OperationObject;
    /**
     * @since OAS 3.2 A map of additional operations on this path. The map key is the
     * HTTP method with the capitalization to be sent in the request. MUST NOT contain
     * an entry for a method that can be defined by a fixed field (e.g. no `POST`).
     */
    additionalOperations?: { [method: string]: OperationObject };
    servers?: ServerObject[];
    parameters?: (ParameterObject | ReferenceObject)[];
}
export interface OperationObject extends ISpecificationExtension {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    operationId?: string;
    parameters?: (ParameterObject | ReferenceObject)[];
    requestBody?: RequestBodyObject | ReferenceObject;
    responses?: ResponsesObject;
    callbacks?: CallbacksObject;
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
 * Possible values are "query", "querystring", "header", "path" or "cookie".
 * The "querystring" location is new in OAS 3.2.
 * Specification:
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#parameter-locations
 */
export type ParameterLocation = 'query' | 'querystring' | 'header' | 'path' | 'cookie';

/**
 * The style of a parameter.
 * Describes how the parameter value will be serialized.
 * (serialization is not implemented yet)
 * The "cookie" style is new in OAS 3.2.
 * Specification:
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.2.0.md#style-values
 */
export type ParameterStyle =
    | 'matrix'
    | 'label'
    | 'form'
    | 'simple'
    | 'spaceDelimited'
    | 'pipeDelimited'
    | 'deepObject'
    | 'cookie';

export interface BaseParameterObject extends ISpecificationExtension {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    /** @deprecated Use of this field is NOT RECOMMENDED in OAS 3.2 and is likely to be removed in a later revision. Valid only for `query` parameters. */
    allowEmptyValue?: boolean;

    style?: ParameterStyle; // "matrix" | "label" | "form" | ... | "deepObject" | "cookie";
    explode?: boolean;
    allowReserved?: boolean;
    schema?: SchemaObject | ReferenceObject;
    examples?: { [param: string]: ExampleObject | ReferenceObject };
    example?: any;
    content?: ContentObject;
}

export interface ParameterObject extends BaseParameterObject {
    name: string;
    in: ParameterLocation; // "query" | "querystring" | "header" | "path" | "cookie";
}
export interface RequestBodyObject extends ISpecificationExtension {
    description?: string;
    content: ContentObject;
    required?: boolean;
}
export interface ContentObject {
    // @since OAS 3.2 content map values may also be Reference Objects, e.g. referencing
    // the new `components.mediaTypes` bucket. In 3.0/3.1 only Media Type Objects were allowed.
    [mediatype: string]: MediaTypeObject | ReferenceObject;
}
export interface MediaTypeObject extends ISpecificationExtension {
    /** A schema describing the complete content of the request, response, parameter, or header. */
    schema?: SchemaObject | ReferenceObject;
    /** @since OAS 3.2 A schema describing each item within a sequential (streaming) media type. */
    itemSchema?: SchemaObject | ReferenceObject;
    examples?: ExamplesObject;
    example?: any;
    /** A map between a property name and its encoding information. MUST NOT be present if `prefixEncoding` or `itemEncoding` are present. */
    encoding?: EncodingObject;
    /**
     * @since OAS 3.2 An array of positional encoding information (analogous to JSON
     * Schema `prefixItems`); `multipart` only. MUST NOT be present if `encoding` is present.
     */
    prefixEncoding?: EncodingPropertyObject[];
    /**
     * @since OAS 3.2 A single Encoding Object applied to all remaining array items
     * (analogous to JSON Schema `items`); `multipart` only. MUST NOT be present if `encoding` is present.
     */
    itemEncoding?: EncodingPropertyObject;
}
export interface EncodingObject extends ISpecificationExtension {
    // [property: string]: EncodingPropertyObject;
    [property: string]: EncodingPropertyObject | any; // Hack for allowing ISpecificationExtension
}
export interface EncodingPropertyObject {
    contentType?: string;
    headers?: { [key: string]: HeaderObject | ReferenceObject };
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    /** @since OAS 3.2 Nested encoding, applied in the same manner as the Media Type Object's `encoding`. */
    encoding?: EncodingObject;
    /** @since OAS 3.2 Nested positional encoding, applied in the same manner as the Media Type Object's `prefixEncoding`. */
    prefixEncoding?: EncodingPropertyObject[];
    /** @since OAS 3.2 Nested item encoding, applied in the same manner as the Media Type Object's `itemEncoding`. */
    itemEncoding?: EncodingPropertyObject;
    [key: string]: any; // (any) = Hack for allowing ISpecificationExtension
}
export interface ResponsesObject extends ISpecificationExtension {
    default?: ResponseObject | ReferenceObject;

    // [statuscode: string]: ResponseObject | ReferenceObject;
    [statuscode: string]: ResponseObject | ReferenceObject | any; // (any) = Hack for allowing ISpecificationExtension
}
export interface ResponseObject extends ISpecificationExtension {
    /** @since OAS 3.2 A short summary of the meaning of the response. */
    summary?: string;
    /**
     * A description of the response.
     * @since OAS 3.2 this field is optional (it was REQUIRED in OAS 3.0/3.1).
     */
    description?: string;
    headers?: HeadersObject;
    content?: ContentObject;
    links?: LinksObject;
}
export interface CallbacksObject extends ISpecificationExtension {
    // [name: string]: CallbackObject | ReferenceObject;
    [name: string]: CallbackObject | ReferenceObject | any; // Hack for allowing ISpecificationExtension
}
export interface CallbackObject extends ISpecificationExtension {
    // [name: string]: PathItemObject;
    [name: string]: PathItemObject | any; // Hack for allowing ISpecificationExtension
}
export interface HeadersObject {
    [name: string]: HeaderObject | ReferenceObject;
}
export interface ExampleObject {
    summary?: string;
    description?: string;
    /**
     * @since OAS 3.2 An example of the data structure that MUST be valid according to the
     * relevant Schema Object. If present, `value` MUST be absent.
     */
    dataValue?: any;
    /**
     * @since OAS 3.2 An example of the serialized form of the value. If present, `value`
     * and `externalValue` MUST be absent. SHOULD NOT be used when the serialization format is JSON.
     */
    serializedValue?: string;
    /** @deprecated For non-JSON serialization targets, use `dataValue` and/or `serializedValue`. Mutually exclusive with `externalValue`. */
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

export interface HeaderObject extends BaseParameterObject {
    $ref?: string;
}
export interface TagObject extends ISpecificationExtension {
    name: string;
    /** @since OAS 3.2 A short summary of the tag, used for display purposes. */
    summary?: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    /** @since OAS 3.2 The `name` of a tag that this tag is nested under. The named tag MUST exist and circular references MUST NOT be used. */
    parent?: string;
    /**
     * @since OAS 3.2 A machine-readable string to categorize the tag. Any string value
     * can be used; common values are `nav`, `badge`, `audience`. A registry of common
     * values is at https://spec.openapis.org/registry/tag-kind/.
     */
    kind?: string;
    [extension: string]: any; // Hack for allowing ISpecificationExtension
}
export interface ExamplesObject {
    [name: string]: ExampleObject | ReferenceObject;
}

export interface ReferenceObject {
    $ref: string;
    summary?: string;
    description?: string;
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

export type SchemaObjectType =
    'integer' | 'number' | 'string' | 'boolean' | 'object' | 'null' | 'array';

export type SchemaObject = SchemaObjectValue | boolean;

export interface SchemaObjectValue extends ISpecificationExtension {
    [keyword: string]: any;
    $ref?: string;
    $schema?: string;
    $id?: string;
    $anchor?: string;
    $dynamicRef?: string;
    $dynamicAnchor?: string;
    $defs?: { [schema: string]: SchemaObject | ReferenceObject };
    discriminator?: DiscriminatorObject;
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: XmlObject;
    externalDocs?: ExternalDocumentationObject;
    /** @deprecated use examples instead */
    example?: any;
    examples?: any[];
    deprecated?: boolean;

    type?: SchemaObjectType | SchemaObjectType[];
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
    allOf?: (SchemaObject | ReferenceObject)[];
    oneOf?: (SchemaObject | ReferenceObject)[];
    anyOf?: (SchemaObject | ReferenceObject)[];
    not?: SchemaObject | ReferenceObject;
    items?: SchemaObject | ReferenceObject;
    contains?: SchemaObject | ReferenceObject;
    properties?: { [propertyName: string]: SchemaObject | ReferenceObject };
    additionalProperties?: SchemaObject | ReferenceObject | boolean;
    propertyNames?: SchemaObject | ReferenceObject;
    patternProperties?: { [propertyName: string]: SchemaObject | ReferenceObject };
    dependentSchemas?: { [propertyName: string]: SchemaObject | ReferenceObject };
    dependentRequired?: { [propertyName: string]: string[] };
    if?: SchemaObject | ReferenceObject;
    then?: SchemaObject | ReferenceObject;
    else?: SchemaObject | ReferenceObject;
    unevaluatedItems?: SchemaObject | ReferenceObject | boolean;
    unevaluatedProperties?: SchemaObject | ReferenceObject | boolean;
    description?: string;
    default?: any;

    title?: string;
    multipleOf?: number;
    maximum?: number;
    const?: any;
    /** @desc In OpenAPI 3.1: number */
    exclusiveMaximum?: number;
    minimum?: number;
    /** @desc In OpenAPI 3.1: number */
    exclusiveMinimum?: number;
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
    prefixItems?: (SchemaObject | ReferenceObject)[];
    contentSchema?: SchemaObject | ReferenceObject;
    /**
     * @desc JSON Schema compliant Content-Type, optional when specified as a key of ContentObject
     * @example image/png
     */
    contentMediaType?: string;
    /**
     * @desc Specifies the Content-Encoding for the schema, supports all encodings from RFC4648, and "quoted-printable" from RFC2045
     * @override format
     * @see https://datatracker.ietf.org/doc/html/rfc4648
     * @see https://datatracker.ietf.org/doc/html/rfc2045#section-6.7
     * @example base64
     */
    contentEncoding?: string;
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
export function isSchemaObject(schema: SchemaObject | ReferenceObject): schema is SchemaObject {
    return !Object.prototype.hasOwnProperty.call(schema, '$ref');
}

export interface SchemasObject {
    [schema: string]: SchemaObject;
}

export interface DiscriminatorObject {
    propertyName: string;
    mapping?: { [key: string]: string };
    /**
     * @since OAS 3.2 The schema name or URI reference to a schema expected to validate the
     * model when the discriminating property is missing or holds an unmapped value. REQUIRED
     * when the discriminating property is defined as optional.
     */
    defaultMapping?: string;
}

/**
 * The XML node type of a Schema Object, new in OAS 3.2.
 * `none` means the schema produces no node of its own.
 */
export type XmlNodeType = 'element' | 'attribute' | 'text' | 'cdata' | 'none';

export interface XmlObject extends ISpecificationExtension {
    /**
     * @since OAS 3.2 One of `element`, `attribute`, `text`, `cdata`, or `none`. Default is
     * `none` if `$ref`, `$dynamicRef`, or `type: "array"` is present in the containing
     * Schema Object, and `element` otherwise. Supersedes the `attribute`/`wrapped` booleans.
     */
    nodeType?: XmlNodeType;
    name?: string;
    namespace?: string;
    prefix?: string;
    /** @deprecated Use `nodeType: "attribute"` instead. If `nodeType` is present, this field MUST NOT be present. */
    attribute?: boolean;
    /** @deprecated Use `nodeType: "element"` instead. If `nodeType` is present, this field MUST NOT be present. */
    wrapped?: boolean;
}
export type SecuritySchemeType = 'apiKey' | 'http' | 'mutualTLS' | 'oauth2' | 'openIdConnect';

export interface SecuritySchemeObject extends ISpecificationExtension {
    type: SecuritySchemeType;
    description?: string;
    name?: string; // required only for apiKey
    in?: string; // required only for apiKey
    scheme?: string; // required only for http
    bearerFormat?: string;
    flows?: OAuthFlowsObject; // required only for oauth2
    openIdConnectUrl?: string; // required only for openIdConnect
    /** @since OAS 3.2 URL to the OAuth2 Authorization Server Metadata (RFC8414). Used with `type: oauth2`. */
    oauth2MetadataUrl?: string;
    /** @since OAS 3.2 Declares this security scheme to be deprecated. Default value is `false`. */
    deprecated?: boolean;
}
export interface OAuthFlowsObject extends ISpecificationExtension {
    implicit?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
    /** @since OAS 3.2 Configuration for the OAuth 2.0 Device Authorization flow (RFC8628). */
    deviceAuthorization?: OAuthFlowObject;
}
export interface OAuthFlowObject extends ISpecificationExtension {
    authorizationUrl?: string;
    /** @since OAS 3.2 The device authorization endpoint URL (RFC8628 §3.1). REQUIRED for the `deviceAuthorization` flow. */
    deviceAuthorizationUrl?: string;
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
