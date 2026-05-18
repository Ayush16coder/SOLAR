"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let MarketplaceService = class MarketplaceService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async listPlugins() {
        const { data } = await this.supabase.client.from('Plugin').select('*');
        return data;
    }
    async installPlugin(workspaceId, pluginId, config) {
        const { data } = await this.supabase.client
            .from('PluginInstallation')
            .insert({
            workspaceId,
            pluginId,
            config,
            status: 'ENABLED',
        })
            .select()
            .single();
        return data;
    }
    async getInstalledPlugins(workspaceId) {
        const { data } = await this.supabase.client
            .from('PluginInstallation')
            .select('*, plugin:Plugin(*)')
            .eq('workspaceId', workspaceId);
        return data;
    }
    async updatePluginConfig(workspaceId, pluginId, config) {
        const { data } = await this.supabase.client
            .from('PluginInstallation')
            .update({ config })
            .match({ workspaceId, pluginId })
            .select()
            .single();
        return data;
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map