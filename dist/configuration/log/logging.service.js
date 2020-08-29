"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
let LoggingService = class LoggingService {
    log(message, context) {
        console.log(message, context);
    }
    error(message, trace, context) {
        console.log(message, context, trace);
    }
    warn(message, context) {
        console.log(message, context);
    }
    debug(message, context) {
        console.log(message, context);
    }
    verbose(message, context) {
        console.log(message, context);
    }
};
LoggingService = __decorate([
    common_1.Injectable()
], LoggingService);
exports.LoggingService = LoggingService;
//# sourceMappingURL=logging.service.js.map