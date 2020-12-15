export interface RootState {
    isLogged: Boolean,
    posts: Array<any>,
    isSpinnerInPosts: Boolean,
    profileUser: any,
    isSpinnerInUserPage: Boolean,
    comments: Array<any>,
    isSpinnerInComments: Boolean,
    GoogleTokenId: String,
    sessionUser: any
}

export interface PostAreaProps {
    userId?: number,
    userName?: string,
    userLastName?: string,
    isInFeed: Boolean
}

export interface PostProps {
    id: number,
    userId: number,
    userName: string,
    userLastName: string,
    contents: string,
    dateAdded: Date
}