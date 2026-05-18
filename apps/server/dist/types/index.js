"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLevel = exports.ProviderType = exports.DeploymentStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["OWNER"] = "OWNER";
    Role["ADMIN"] = "ADMIN";
    Role["DEVELOPER"] = "DEVELOPER";
    Role["VIEWER"] = "VIEWER";
})(Role || (exports.Role = Role = {}));
var DeploymentStatus;
(function (DeploymentStatus) {
    DeploymentStatus["QUEUED"] = "QUEUED";
    DeploymentStatus["BUILDING"] = "BUILDING";
    DeploymentStatus["DEPLOYING"] = "DEPLOYING";
    DeploymentStatus["SUCCESS"] = "SUCCESS";
    DeploymentStatus["FAILED"] = "FAILED";
    DeploymentStatus["CANCELLED"] = "CANCELLED";
})(DeploymentStatus || (exports.DeploymentStatus = DeploymentStatus = {}));
var ProviderType;
(function (ProviderType) {
    ProviderType["GITHUB"] = "GITHUB";
    ProviderType["VERCEL"] = "VERCEL";
    ProviderType["AWS"] = "AWS";
    ProviderType["KUBERNETES"] = "KUBERNETES";
    ProviderType["NETLIFY"] = "NETLIFY";
    ProviderType["RAILWAY"] = "RAILWAY";
    ProviderType["GOOGLE_CLOUD"] = "GOOGLE_CLOUD";
    ProviderType["AZURE"] = "AZURE";
})(ProviderType || (exports.ProviderType = ProviderType = {}));
var EventLevel;
(function (EventLevel) {
    EventLevel["INFO"] = "INFO";
    EventLevel["WARN"] = "WARN";
    EventLevel["ERROR"] = "ERROR";
    EventLevel["DEBUG"] = "DEBUG";
    EventLevel["AI_INSIGHT"] = "AI_INSIGHT";
})(EventLevel || (exports.EventLevel = EventLevel = {}));
//# sourceMappingURL=index.js.map