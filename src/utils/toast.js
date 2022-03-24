import {
    message
} from 'antd';

// 信息提示
export const successToast = (val) => {
    message.success(val);
};

export const errorToast = (val) => {
    message.error(val);
};

export const warningToast = (val) => {
    message.warning(val);
};