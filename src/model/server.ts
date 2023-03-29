import { ServerObject, ServerVariableObject } from './oas-common';
import { IExtensionName, IExtensionType } from './specification-extension';

// Server & Server Variable
export class Server implements ServerObject {
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

export class ServerVariable implements ServerVariableObject {
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
