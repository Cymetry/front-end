import Connection from '../services/connection';

const controller = 'statistics';

class StatisticsController {

  static getStatistics = () => {
    const request = Connection.GET(controller, '');
    return request;
  }

  static createStatistics = () => {
      const request = Connection.POST(controller, 'create');
      return request;
  }

  static updateKnowledge = (correctCount, stepsCount) => {
    const request = Connection.PUT(controller, 'knowledge', {
        correctCount,
        stepsCount,
    },
    {
        correctCount,
        stepsCount,
    });
    return request;
  }

  static updateAccuracy = (mistakeCount, stepsCount) => {
    const request = Connection.PUT(controller, 'accuracy', {
        mistakeCount,
        stepsCount,
    },
    {
        mistakeCount,
        stepsCount,
    });
    return request;
  }

  static updateLogics = (correctAnswers, allAnswers) => {
    const request = Connection.PUT(controller, 'logics', {
        correctAnswers,
        allAnswers,
    },
    {
        correctAnswers,
        allAnswers,
    });
    return request;
  }

  static updateSpeed = (skillsComplete, skillAttempts) => {
    const request = Connection.PUT(controller, 'speed', {
        skillsComplete,
        skillAttempts,
    },
    {
        skillsComplete,
        skillAttempts,
    });
    return request;
  }

};

export default StatisticsController;