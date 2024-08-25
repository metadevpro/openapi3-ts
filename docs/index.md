# OpenAPI3-TS Documentation

OpenAPI3-TS is a library implemented in TypeScript to help creating documents following the [**OpenAPI Specifications**](https://spec.openapis.org/oas/latest.html) to describe REST APIs in a machine & humam processable format.

## Use Cases

1. Create a OAS document from scratch and export it to JSON or YAML.

The builder pattern, the TS compiler & the code-completion will guide you to add the correct data.

- I can be used in TypeScript or Javascript projects working with NodeJS or Deno (in the backend).
- But also on the browser as the libraries has not dependencies on other libs.

## Basic Example

Minimal example to generate a 3.1 OAS compliant document:

```typescript
import { OpenApiBuilder } from 'openapi3-ts/oas31'; // Pick `openapi3-ts/oas31` for 3.1.x (x)or pick `openapi3-ts/oas30` for 3.0.x

function buildOas() {
    const builder = OpenApiBuilder
        .create()
        .addOpenApiVersion('3.1.0')
        .addInfo({
          title: 'app',
          version: 'version'
        })
        .addLicense({
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        })
        .addTitle('my title')
        .addPath('pet/{petId}', {
          get: {
            tags: ["pet"],
            summary: "Find pet by ID",
            description: "Returns a single pet",
            operationId: "getPetById"            
          }
        })
        .addResponse('Created', {
          description: 'Object created'
        })
        .addSchema('Email', {
          type: 'string',
          format: 'email'
        })
        .addParameter('id',  {
          name: 'id',
          in: 'header',
          schema: {
            $ref: '#/components/schemas/id'
          }
        });
    //...keep building

    const doc = builder.getSpec();
    const docJson = builder.getSpecAsJson();
    const docYaml = builder.getSpecAsYaml();
}

```

## Dependencies

The unique dependency in runtime is `yaml` to provide the YAML from/to conversions features.

## Code Organization

- `src` contains the production code.
  - `dsl` provides the API of the library following the [intenal DSL style](https://martinfowler.com/bliki/InternalDslStyle.html) (or _fluent interface_) with two flavours: 3.0.x & 3.1.x to allow conformance with both versions of the spec.
  - `model` provides a DOM (Document Object Model) describing the concepts defined in the OpenAPI spec. Again in two flavours: 3.0.x and 3.1.x.
  - Finally `oas30.ts` & `oas31.ts` expose the types as separate namespaces.
- `test` constains the unit tests.

## License

Licensed under the MIT License.
