export class RefreshTokenDto {
    private refreshToken: string;
    private accessToken: string;

    constructor(refreshToken: string, accessToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
