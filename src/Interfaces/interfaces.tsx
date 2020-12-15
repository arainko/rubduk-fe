export interface RootState {
    isLogged: Boolean,
    posts: Array<any>,
    isSpinnerInProfilePosts: Boolean,
    profileUser: any,
    isSpinnerInUserPage: Boolean,
    comments: Array<any>,
    isSpinnerInComments: Boolean,
    GoogleTokenId: String,
    sessionUser: any
}