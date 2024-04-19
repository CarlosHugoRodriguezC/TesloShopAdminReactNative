import {AxiosError} from 'axios';
import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/entities/product';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.response';

export const updateCreateProduct = async (
  product: Partial<Product>,
): Promise<Product> => {
  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    const {id, images = [], ...rest} = product;
    const checkedImages = await prepareImages(images);

    const {data} = await tesloApi.patch<TesloProduct>(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return ProductMapper.tesloProductToProduct(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    } else {
      console.log('Error updating product', error);
    }
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    const {id, images = [], ...rest} = product;
    const chkedImages = await prepareImages(images);

    const {data} = await tesloApi.post<TesloProduct>('/products', {
      images: chkedImages,
      ...rest,
    });

    return ProductMapper.tesloProductToProduct(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    } else {
      console.log('Error updating product', error);
    }
    throw new Error('Error updating product');
  }
};

const prepareImages = async (images: string[]) => {
  const fileImages = images.filter(image => image.startsWith('file://'));
  const currentImages = images.filter(image => !image.startsWith('file://'));

  if (fileImages.length) {
    const uploadedPromises = fileImages.map(uploadImage);
    const uploadedImages = await Promise.all(uploadedPromises);

    currentImages.push(...uploadedImages);
  }

  return currentImages.map(image => image.split('/').pop());
};

const uploadImage = async (image: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });

  const {data} = await tesloApi.post<{image: string}>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data.image;
};
