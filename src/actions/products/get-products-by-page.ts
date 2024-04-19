import {AxiosError} from 'axios';
import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 20,
): Promise<Product[]> => {
  try {
    const {data, request} = await tesloApi.get<TesloProduct[]>('/products', {
      params: {offset: page * limit, limit},
    });

    return data.map(tesloProduct =>
      ProductMapper.tesloProductToProduct(tesloProduct),
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('Error response', error.response?.data);
    } else {
      console.log('Error', error);
    }
    throw new Error('Error fetching products by page');
  }
};
