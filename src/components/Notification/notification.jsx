import { notification } from "antd";

export const openNotification = (type = 'sucess', message = 'Sucess', description = '') => {
    return notification[type]({ message: message, description: description });
}