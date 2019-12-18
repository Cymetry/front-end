import Connection from '../services/connection';

const controller = 'topic';

class TopicController {

  static List = id => {
    const request = Connection.GET(controller, '', { curriculumId: id });
    return request;
  }
};

export default TopicController;