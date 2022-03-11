import { posApiService } from './pos-inventory-api.service';

class LoginService {
  async loginUser(username: string, password: string, type: string) {
    const response = await posApiService.login(username, password, type);
    if (response.status == 201) {
      sessionStorage.setItem(
        'access-token',
        response.data.accessToken || 'none'
      );
      sessionStorage.setItem(
        'refresh-token',
        String(response.data.refreshToken)
      );
      return (await posApiService.getProfile()).data;
    } else {
      return response;
    }
  }

  async logoutUser() {
    const response = await posApiService.logout();
    localStorage.removeItem('access-token');
    return response;
  }
}

const loginService = new LoginService();
export default loginService;
