import {tesloApi} from '../../config/api/tesloApi';
import {Gender, Product} from '../../domain/entities/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

const emptyProduct: Product = {
  id: '',
  title: '',
  slug: '',
  description: '',
  price: 0,
  images: [],
  stock: 0,
  sizes: [],
  gender: Gender.Unisex,
  tags: [],
};

export const getProductById = async (id: string) => {
  if (id === 'new') return emptyProduct;

  try {
    const {data} = await tesloApi.get<TesloProduct>(`/products/${id}`);

    return ProductMapper.tesloProductToProduct(data);
  } catch (error) {
    console.log('Error', error);
    return null;
  }
};
