import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(body: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(body: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(body: any): Promise<void>;
}
