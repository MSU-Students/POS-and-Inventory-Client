import { MediaDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class MediaService extends DefaultApi {
  async getPicture(id: number): Promise<MediaDto> {
    const response = await posApiService.getMedia(id);
    return response.data;
  }

  async uploadPicture(file: File[]) {
    const response = await posApiService.uploadMedia(file);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }
}

const mediaService = new MediaService();
export default mediaService;
