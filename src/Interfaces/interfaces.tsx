export interface RootState {
    isLogged: boolean,
    posts: Array<any>,
    isSpinnerInPosts: boolean,
    profileUser: any,
    isSpinnerInUserPage: boolean,
    comments: Array<any>,
    isSpinnerInComments: boolean,
    GoogleTokenId: string,
    sessionUser: any,
    media: Array<any>,
    isSpinnerInMedia: boolean,
    mediaToUpload: any,
    friends: Array<any>,
    isSpinnerInFriends: boolean,
    invites: Array<any>,
    isSpinnerInInvites: boolean
}

export interface PostAreaProps {
    userId: number,
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