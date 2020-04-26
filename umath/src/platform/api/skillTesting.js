import Connection from '../services/connection';

const controller = 'testing';

class SkillTestingController {

  static CheckStatus = async id => {
    const request = await Connection.GET(controller, 'check', { topicId: id });
    return request;
  };

  static Start = async id => {
    const request = await Connection.GET(controller, 'start', { topicId: id });
    
    return JSON.parse(request).body;
  }

  static Resume = async id => {
    const request = await Connection.GET(controller, 'start', { topicId: id });
    
    return JSON.parse(request).body;
  };

  static SaveProgress = async (answers, topicId) => {
    const correctAnswers = [];
    const wrongAnswers = [];

    answers.forEach(answer => {
      if (answer.isRight) {
        correctAnswers.push(answer.uid);
      }
      else {
        wrongAnswers.push(answer.uid);
      }
    });

    Connection.POST(
      controller,
      "saveProgress",
      {
        correctAnswers,
        wrongAnswers,
        isFinished: true
      },
      {
        topicId
      }
    );
  };
};

export default SkillTestingController;