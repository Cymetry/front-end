import { AsyncStorage } from 'react-native';

class Connection {

  static BASE_URL = 'http://68.183.47.174:8080';

  static queryFromObject = obj => {
    const str = [];

    for (const query in obj) {
      if (obj.hasOwnProperty(query) && obj[query]) {
        const string = encodeURIComponent(query) + "=" + encodeURIComponent(obj[query]);
        str.push(string);
      }
    }
  
    return str.join("&");
  }

  static createHeaders = async isUpload => {
    const HEADERS = new Headers();
    const token = await AsyncStorage.getItem('token');
    token && HEADERS.append('auth', token);
    !isUpload && HEADERS.append('Content-Type', 'application/json');
    return HEADERS;
  }

  static responseRestructure = response => {
    if (response.status === 401 || response.status === 403) {
      console.error('Something is wrong with permission or authentication');
    };

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) return response.ok ? response.json() : {};
    else return response.ok ? response.text() : '';
  }

  static stringifyUrlEncoded = obj => {
    let urlEncoded = '';
    for (let key in obj) {
      urlEncoded += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
    }
    return urlEncoded;
  }

  static POST = async (controllerName, actionName, body, queryConfig) => {
    const onlyQuery = !actionName && queryConfig;
    const HEADERS = await Connection.createHeaders();
    window.pendingRequest = true;
    const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: HEADERS,
    });

    window.pendingRequest = false;
    return Connection.responseRestructure(response);
  }

  static PUT = async (controllerName, actionName, body, queryConfig) => {
    const onlyQuery = !actionName && queryConfig;
    const HEADERS = await Connection.createHeaders();
    window.pendingRequest = true;
    const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: HEADERS,
    })

    window.pendingRequest = false;
    return Connection.responseRestructure(response);
  }

  static DELETE = async (controllerName, actionName, queryConfig) => {
    const onlyQuery = !actionName && queryConfig;
    const HEADERS = await Connection.createHeaders();
    window.pendingRequest = true;
    const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
      method: 'DELETE',
      headers: HEADERS,
    });

    window.pendingRequest = false;
    return Connection.responseRestructure(response);
  }

  static GET = async (controllerName, actionName, queryConfig) => {
    const onlyQuery = !actionName && queryConfig;
    const HEADERS = await Connection.createHeaders();
    window.pendingRequest = true;
    const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
      method: 'GET',
      headers: HEADERS,
    });

    window.pendingRequest = false;
    return Connection.responseRestructure(response);
  }

  static UPLOAD = async (controllerName, actionName, body, queryConfig) => {
    const onlyQuery = !actionName && queryConfig;
    const HEADERS = Connection.createHeaders(true);
    window.pendingRequest = true;
    const response = await fetch(`${Connection.BASE_URL}/${controllerName}${!onlyQuery ? '/' : ''}${actionName}${queryConfig ? `?${Connection.queryFromObject(queryConfig)}` : ''}`, {
      body,
      method: 'POST',
      headers: HEADERS,
    });

    window.pendingRequest = false;
    return Connection.responseRestructure(response);
  }
}

export default Connection;