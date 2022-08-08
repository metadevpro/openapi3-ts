import * as oa from './OpenApi';
import { IExtensionName, IExtensionType } from './SpecificationExtension.js';

// Server & Server Variable
export class Server implements oa.ServerObject {
    url: string;
    description?: string;
    variables: { [v: string]: ServerVariable };
    [k: IExtensionName]: IExtensionType;

    constructor(url: string, desc?: string) {
        this.url = url;
        this.description = desc;
        this.variables = {};
    }
    addVariable(name: string, variable: ServerVariable): void {
        this.variables[name] = variable;
    }
}

export class ServerVariable implements oa.ServerVariableObject {
    enum?: string[] | boolean[] | number[];
    default: string | boolean | number;
    description?: string;
    [k: IExtensionName]: IExtensionType;

    constructor(
        defaultValue: string | boolean | number,
        enums?: string[] | boolean[] | number[],
        description?: string
    ) {
        this.default = defaultValue;
        this.enum = enums;
        this.description = description;
    }
}
