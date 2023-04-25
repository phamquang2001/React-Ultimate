export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOG_OUT = 'LOG_OUT';

export const CHECK_LOGIN_SUCCESS = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
};

export const CHECK_LOG_OUT = (data) => {
    return {
        type: LOG_OUT,
        payload: data
    };
};