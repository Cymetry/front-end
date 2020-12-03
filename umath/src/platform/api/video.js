import Connection from '../services/connection';

const controller = 'videos';

class VideoController {

  static getVideos = weakSet => {
    return Connection.POST(controller, '', { skills: weakSet });
  }

};

export default VideoController;