/* eslint-disable @typescript-eslint/no-explicit-any */

import { ISpecificationExtension, SpecificationExtension } from './specification-extension';

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

export function getExtension(obj: ISpecificationExtension | undefined, extensionName: string): any {
    if (!obj) {
        return undefined;
    }
    if (SpecificationExtension.isValidExtension(extensionName)) {
        return obj[extensionName];
    }
    return undefined;
}
export function addExtension(
    obj: ISpecificationExtension | undefined,
    extensionName: string,
    extension: any
): void {
    if (obj && SpecificationExtension.isValidExtension(extensionName)) {
        obj[extensionName] = extension;
    }
}
