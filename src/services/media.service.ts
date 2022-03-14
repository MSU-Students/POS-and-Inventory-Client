import { MediaDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class SupplierService extends DefaultApi {
  async getPicture(id: number): Promise<MediaDto> {
    const response = await posApiService.getMedia(id);
    return response.data;
  }

  async uploadPicture(file: File[]): Promise<MediaDto> {
    const response = await posApiService.uploadMedia(file);
    return response.data;
  }
}

const supplierService = new SupplierService();
export default supplierService;
