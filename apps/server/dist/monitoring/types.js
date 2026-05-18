"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSource = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var LogSource;
(function (LogSource) {
    LogSource["DEPLOYMENT"] = "DEPLOYMENT";
    LogSource["RUNTIME"] = "RUNTIME";
    LogSource["BUILD"] = "BUILD";
    LogSource["SYSTEM"] = "SYSTEM";
})(LogSource || (exports.LogSource = LogSource = {}));
//# sourceMappingURL=types.js.map