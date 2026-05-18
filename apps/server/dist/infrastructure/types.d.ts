export declare enum CloudProviderType {
    AWS = "AWS",
    GCP = "GCP",
    AZURE = "AZURE",
    CLOUDFLARE = "CLOUDFLARE"
}
export declare enum ResourceStatus {
    PROVISIONING = "PROVISIONING",
    ACTIVE = "ACTIVE",
    DELETING = "DELETING",
    FAILED = "FAILED"
}
export interface CloudResource {
    id: string;
    type: string;
    provider: CloudProviderType;
    status: ResourceStatus;
    metadata?: any;
}
export interface IaCConfig {
    type: 'terraform' | 'k8s' | 'docker-compose';
    content: string;
}
export interface CloudProviderAdapter {
    type: CloudProviderType;
    provisionResource(config: any): Promise<CloudResource>;
    listResources(): Promise<CloudResource[]>;
    deleteResource(id: string): Promise<void>;
}
