import { gruopInfoInterface } from "../interface/gruopInfo.interface";
import { ResponseInterface } from "../interface/response.interface";
import { BaseService } from "./base.service";

class UserDataService extends BaseService {
  async getUserInfo(): Promise<{ email: string; name: string }> {
    const response = await this.apiAccessControl.get<ResponseInterface>(
      "user/userInfos",
      await this.authorizedHeader()
    );

    return this.extractData<{ email: string; name: string }>(response);
  }

  async getGroupInfo(): Promise<gruopInfoInterface[]> {
    const response = await this.apiAccessControl.get<ResponseInterface>(
      "user/listGroup",
      await this.authorizedHeader()
    );

    return this.extractData<gruopInfoInterface[]>(response);
  }

  async removeById(id: string): Promise<gruopInfoInterface[]> {
    const response = await this.apiAccessControl.delete<ResponseInterface>(
      "user/removeUserGroup/" + id,
      await this.authorizedHeader()
    );

    return this.extractData<gruopInfoInterface[]>(response);
  }

  async registerGroup(req: gruopInfoInterface): Promise<gruopInfoInterface[]> {
    const response = await this.apiAccessControl.post<ResponseInterface>(
      "user/registerGroup",
      req,
      await this.authorizedHeader()
    );

    return this.extractData<gruopInfoInterface[]>(response);
  }

  async updateGroup(req: gruopInfoInterface): Promise<gruopInfoInterface[]> {
    const response = await this.apiAccessControl.put<ResponseInterface>(
      "user/updateGroup",
      req,
      await this.authorizedHeader()
    );

    return this.extractData<gruopInfoInterface[]>(response);
  }

}
const userDataService = new UserDataService();
export default userDataService;
