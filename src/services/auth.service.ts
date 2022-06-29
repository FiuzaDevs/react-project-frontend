import { AuthenticateRequestInterface } from "../interface/authentication/authenticate-request.interface";
import { AuthenticateResponseInterface } from "../interface/authentication/authenticate-response.interface";
import { ResponseInterface } from "../interface/response.interface";
import { BaseService } from "./base.service";

class AuthenticationService extends BaseService {
  async authenticate(
    req: AuthenticateRequestInterface
  ): Promise<AuthenticateResponseInterface> {
    const response = await this.apiAccessControl.post<ResponseInterface>(
      '/authentication/authenticate',
      req
    );

    return this.extractData<AuthenticateResponseInterface>(response);
  }
  async authenticateByToken(): Promise<{ isValid: boolean; email: string }> {
    const response = await this.apiAccessControl.post<ResponseInterface>(
      '/authentication/authenticate/token',
      {},
      await this.authorizedHeader()
    );

    return this.extractData<{ isValid: boolean; email: string }>(response);
  }
}
const authenticationService = new AuthenticationService();
export default authenticationService;
