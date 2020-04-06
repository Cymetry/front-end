import Connection from '../services/connection';

const controller = 'auth';

class AuthController {
  static ForgotEmail = form => {
    const request = Connection.GET(controller, 'reset', form);
    return request;
  }

  static ResetPass = form => {
    const request = Connection.POST(controller, 'reset', form);
    return request;
  }

  static Login = form => {
    const request = Connection.POST(controller, 'login', form);
    return request;
  }
};

export default AuthController;