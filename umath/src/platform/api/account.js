import Connection from '../services/connection';

const controller = 'account';

class AccountController {
  static Details = () => {
    const request = Connection.GET(controller, '');
    return request;
  };

  static FAQ = () => {
    const request = Connection.GET(controller, 'FAQ');
    return request;
  };

  static Help = ({ name, telephone, school, email, text }) => {
    return Connection.POST(controller, 'help', {
      name,
      text,
      email,
      school,
      telephone,
    });
  };
}

export default AccountController;
