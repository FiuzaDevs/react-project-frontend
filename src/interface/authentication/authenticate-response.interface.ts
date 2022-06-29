export interface AuthenticateResponseInterface {
    email: string;
    token: JwtToken;
}

interface JwtToken {
    accessToken: string;
}