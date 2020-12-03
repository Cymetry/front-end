import Connection from '../services/connection';

const controller = 'curriculum';

class CurriculumController {

  static List = id => {
    const request = Connection.GET(controller, '', { programId: id });
    return request;
  }
};

export default CurriculumController;