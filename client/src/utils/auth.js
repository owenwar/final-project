import decode from 'jwt-decode';

class AuthService {
    get profile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    login(token) {
        localStorage.setItem('token', token);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }
}

export default new AuthService();