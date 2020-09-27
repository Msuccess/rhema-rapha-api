"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultException = exports.Result = void 0;
const common_1 = require("@nestjs/common");
class Result {
    constructor(httpStatus, message, data) {
        if (data) {
            return {
                status: httpStatus,
                message: message,
                data: data,
            };
        }
        else {
            return {
                status: httpStatus,
                message: message,
            };
        }
    }
}
exports.Result = Result;
class ResultException {
    constructor(error, statusCode) {
        throw new common_1.HttpException({ message: error }, statusCode);
    }
}
exports.ResultException = ResultException;
//# sourceMappingURL=result.js.map