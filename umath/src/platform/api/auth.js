import Connection from '../services/connection';

const controller = 'auth';

class AuthController {

  static Login = form => {
    const request = Connection.POST(controller, 'login', form);
    return request;
  }
};

export default AuthController;