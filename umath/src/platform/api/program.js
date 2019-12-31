import Connection from '../services/connection';

const controller = 'program';

class ProgramController {

  static List = () => {
    const request = Connection.GET(controller, '');
    return request;
  }
};

export default ProgramController;