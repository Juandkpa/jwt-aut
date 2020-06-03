let accessToken:String = '';

export const setAccessToken = (s:String) => {
    accessToken = s;
}

export const getAccessToken = ():String => {
    return accessToken;
}