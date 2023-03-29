import * as dsl from './dsl/index';
import * as model from './model/index';

const oas30 = { ...model.oas30, ...dsl.oas30 };
const oas31 = { ...model.oas31, ...dsl.oas31 };

export default {
    oas30,
    oas31,
    Server: model.Server,
    ServerVariable: model.ServerVariable
};
