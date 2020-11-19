import axios from 'axios';
import routes from '../routes';

const sendMessage = (values, channelId) => axios.post(
  routes.channelMessagesPath(channelId),
  {
    data: {
      attributes: {
        ...values,
      },
    },
  },
);

const sendChannel = (values) => axios.post(
  routes.channelsPath(),
  {
    data: {
      attributes: {
        ...values,
      },
    },
  },
);

const renameChannel = (name, channelId) => axios.patch(
  routes.channelPath(channelId),
  {
    data: {
      attributes: {
        name,
      },
    },
  },
);

export {
  sendMessage as apiSendMessage,
  sendChannel as apiSendChannel,
  renameChannel as apiRenameChannel,
};
