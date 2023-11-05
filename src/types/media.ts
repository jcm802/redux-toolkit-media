export interface User {
    id: number,
    name: string,
}

export interface UserState {
    list: Array<User>,
    isLoading: boolean,
    error: {},
}