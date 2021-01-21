const invitesSpinner = (state = true, action: any) => {
    switch(action.type) {
        case 'INVITES_LOADED':
            return false;
        case 'INVITES_NOT_LOADED':
            return true;
        default:
            return state;
    }
};

export default invitesSpinner