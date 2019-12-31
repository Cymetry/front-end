import Connection from '../services/connection';

const controller = 'skillLearning';

class SkillLearningController {

  static Start = id => {
    const request = Connection.GET(controller, 'start', { skillId: id });
    return request;
  }

  static SaveProgress = body => {
    const request = Connection.PUT(controller, 'saveProgress', body);
    return request;
  }
};

export default SkillLearningController;