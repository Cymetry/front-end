import Connection from '../services/connection';

const controller = 'skill';

class SkillController {

  static List = id => {
    const request = Connection.GET(controller, '', { topicId: id });
    return request;
  }

};

export default SkillController;