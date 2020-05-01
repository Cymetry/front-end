import Connection from '../services/connection';

const controller = 'user';

class UserController {

  static Create = form => {
    const request = Connection.POST(controller, '', form);
    return request;
  }

  static Edit = (form) => {
    const request = Connection.PATCH(controller, '', form)
    return request
  }
};

export default UserController;