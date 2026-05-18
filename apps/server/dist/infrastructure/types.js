"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceStatus = exports.CloudProviderType = void 0;
var CloudProviderType;
(function (CloudProviderType) {
    CloudProviderType["AWS"] = "AWS";
    CloudProviderType["GCP"] = "GCP";
    CloudProviderType["AZURE"] = "AZURE";
    CloudProviderType["CLOUDFLARE"] = "CLOUDFLARE";
})(CloudProviderType || (exports.CloudProviderType = CloudProviderType = {}));
var ResourceStatus;
(function (ResourceStatus) {
    ResourceStatus["PROVISIONING"] = "PROVISIONING";
    ResourceStatus["ACTIVE"] = "ACTIVE";
    ResourceStatus["DELETING"] = "DELETING";
    ResourceStatus["FAILED"] = "FAILED";
})(ResourceStatus || (exports.ResourceStatus = ResourceStatus = {}));
//# sourceMappingURL=types.js.map