import Connection from '../services/connection';

const controller = 'testing';

class SkillTestingController {

  static Start = async id => {
    const request = await Connection.GET(controller, 'start', { topicId: id });
    
    return JSON.parse(request).body;
  }

};

export default SkillTestingController;