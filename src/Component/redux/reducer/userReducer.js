import { LOGIN_SUCCESS, LOG_OUT } from "../action/userAction";

const INITIAL_STATE = {
    account :{
        access_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthen: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    // console.log({state});

    console.log(action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, 
                account :{
                    access_token: action.payload.DT.access_token,
                    username: action.payload.DT.username,
                    image: action.payload.DT.image,
                    role: action.payload.DT.role
                },
                isAuthen: true
            };

        case LOG_OUT:
            return {
                ...state,
                account :{
                    access_token: '',
                    username: '',
                    image: '',
                    role: ''
                },
                isAuthen: false
            };
        default: return state;
    }
};

export default userReducer;