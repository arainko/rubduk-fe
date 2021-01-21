const setInvitesReducer = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_INVITES':
            return action.payload;
        case 'RESET_INVITES':
            return action.payload;
        default:
            return state;
    }
};

export default setInvitesReducer