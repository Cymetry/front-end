import Connection from '../services/connection';

const controller = 'skillLearning';

class SkillLearningController {

  static Start = id => {
    const request = Connection.GET(controller, 'start', { skillId: id });
    return request;
  }
};

export default SkillLearningController;