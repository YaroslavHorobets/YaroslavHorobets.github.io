export default class ApiService {
  constructor(apiBase) {
    this._apiBase = apiBase  
  }
   getResource = async (url, query, method = 'GET', body, headers = {}) => {
    const absUrl = new URL(`${this._apiBase}${url}`);
    if (query) {
      Object.keys(query).forEach((key) => absUrl.searchParams.append(key, query[key]));
    }

    if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
    }
   

    const res = await fetch(absUrl, {
      method,
      body,
      headers: {
        ...headers
      }
    });
    const resData = await res.json();

     if (!res.ok) {
        throw new Error('Something went wrong!');
      }else{
        return resData
      }

  };
  getAll = async () => this.getResource('', null, 'GET', null);
}