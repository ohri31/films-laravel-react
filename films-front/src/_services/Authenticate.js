export function IsLogged() {
    if(sessionStorage.getItem('auth_token') === null) return false;
    else return true;
}

export function IsNotLogged() {
    if(sessionStorage.getItem('auth_token') === null) return true;
    else return false;
}

export function getAuthToken() {
    return sessionStorage.getItem('auth_token');
}