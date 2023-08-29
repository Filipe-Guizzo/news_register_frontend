export const environment = {
    urlApi: 'https://newsregisterbackend-production.up.railway.app',
    authenticated: false,
    setAuthenticated(value: boolean){this.authenticated = value;},
    user: {name: '', photo: ''},
    setUser(value: any){this.user = value;},
}