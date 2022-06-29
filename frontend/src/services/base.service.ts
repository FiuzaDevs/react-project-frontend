import axios from 'axios';
import { ResponseErrorInterface } from '../interface/response-error.interface';
import { StorageKeys } from '../interface/storage-keys.enum';

export abstract class BaseService {
  protected apiAccessControl = axios.create({
    baseURL:'http://localhost:4000/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });


  protected async authorizedHeader() {
    const jwt = await localStorage.getItem(StorageKeys.JWT);   
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    };
  }

  protected extractData<T>(response: any): T {
    return response.data.data || {};
  }


  static extractErrorResponse(error: any): ResponseErrorInterface {
    let responseError: ResponseErrorInterface = {
      statusCode: 0,
      errors: [],
    };

    if (error.response) {
      if (error.response.status === 401) {
        responseError.statusCode = 401;
        responseError.errors.push('unauthorized');
      } else if (error.response.status === 400) {
        responseError.statusCode = 400;
        responseError.errors = error.response.data.errors;
      } else {
        responseError.statusCode = 500;
        responseError.errors.push('error processing request');
      }
    } else {
      responseError.statusCode = 500;
      responseError.errors.push(error.message);
    }

    return responseError;
  }
}