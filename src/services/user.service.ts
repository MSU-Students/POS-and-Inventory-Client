import { UserDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class UserService extends DefaultApi {
  async create(payload: UserDto): Promise<UserDto> {
    const response = await posApiService.addUser(payload);
    return response.data;
  }

  async getAll(): Promise<UserDto> {
    const response = await posApiService.getUsers();
    return response.data;
  }

  async getOne(id: number): Promise<UserDto> {
    const response = await posApiService.getUser(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateUser(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deleteUser(id);
    return response.data;
  }

  async getUserProfile() {
    const response = await posApiService.getProfile();
    return response.data;
  }
}

const userService = new UserService();
export default userService;
