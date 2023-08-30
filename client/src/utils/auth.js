import decode from 'jwt-decode';

class Auth {
    get profile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    getToken() {
        return localStorage.getItem('jwtToken');
    }

    login(token) {
        localStorage.setItem('jwtToken', token);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('jwtToken'); 
        window.location.reload();
    }
}

const AuthService = new Auth();

export default AuthService;
