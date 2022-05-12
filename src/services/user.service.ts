import { UserDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class UserService extends DefaultApi {
  async create(payload: UserDto) {
    const response = await posApiService.addUser(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll() {
    const response = await posApiService.getUsers();
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getOne(id: number) {
    const response = await posApiService.getUser(id);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateUser(id, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async delete(id: number) {
    const response = await posApiService.deleteUser(id);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getUserProfile() {
    const response = await posApiService.getProfile();
    return response.data;
  }
}

const userService = new UserService();
export default userService;
