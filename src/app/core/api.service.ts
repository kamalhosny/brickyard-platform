import { environment } from '../../environments/environment';

const ApiBaseUrl: string = environment.ApiBaseUrl;

const fullUrl = (path) => {
  return ApiBaseUrl + path;
};

export { ApiBaseUrl, fullUrl };
