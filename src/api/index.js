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

const removeChannel = (channelId) => axios.delete(
  routes.channelPath(channelId),
);

export {
  sendMessage as apiSendMessage,
  sendChannel as apiSendChannel,
  removeChannel as apiRemoveChannel,
};
