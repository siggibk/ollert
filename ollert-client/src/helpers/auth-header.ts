export function authHeader() {
    // return authorization header with jwt token if it exists
    const token: string | null = localStorage.getItem('jwt-tkn')
    console.log(token)
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}