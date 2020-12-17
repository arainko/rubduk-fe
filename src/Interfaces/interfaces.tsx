export interface RootState {
    isLogged: Boolean,
    posts: Array<any>,
    isSpinnerInPosts: Boolean,
    profileUser: any,
    isSpinnerInUserPage: Boolean,
    comments: Array<any>,
    isSpinnerInComments: Boolean,
    GoogleTokenId: string,
    sessionUser: any
}

export interface PostAreaProps {
    userId?: number,
    userName?: string,
    userLastName?: string,
    isInFeed: boolean
}

export interface PostProps {
    postId: number,
    userId: number,
    userName: string,
    userLastName: string,
    contents: string,
    dateAdded: Date,
    isInFeed: boolean
}

export interface PostProps {
    postId: number,
    userId: number,
    userName: string,
    userLastName: string,
    contents: string,
    dateAdded: Date
}