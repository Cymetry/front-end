import Connection from '../services/connection';

const controller = 'account';

class AccountController {

  static Details = () => {
    const request = Connection.GET(controller, '');
    return request;
  }

  static FAQ = () => {
    const request = Connection.GET(controller, 'FAQ');
    return request;
  }
};

export default AccountController;