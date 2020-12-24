import axios from 'axios';
import routes from '../routes';

export default {
  sendMessage: (values, channelId) => axios.post(
    routes.channelMessagesPath(channelId),
    {
      data: {
        attributes: {
          ...values,
        },
      },
    },
  ),

  sendChannel: (values) => axios.post(
    routes.channelsPath(),
    {
      data: {
        attributes: {
          ...values,
        },
      },
    },
  ),

  renameChannel: (name, channelId) => axios.patch(
    routes.channelPath(channelId),
    {
      data: {
        attributes: {
          name,
        },
      },
    },
  ),

  removeChannel: (channelId) => axios.delete(
    routes.channelPath(channelId),
  ),
};
