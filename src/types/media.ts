export interface User {
    id: number,
    name: string,
}

export interface Album {
    id: number,
    title: string,
    userId: number,
}

export interface UserState {
    list: Array<User>,
    isLoading: boolean,
    error: {},
}