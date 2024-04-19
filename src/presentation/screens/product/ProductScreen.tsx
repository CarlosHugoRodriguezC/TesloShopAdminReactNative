import {useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Formik} from 'formik';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import {MainLayout} from '../../layouts/MainLayout';
import {RootStackParams} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/';
import {CustomIcon, FullScreenLoader, NotFound} from '../../components/ui';
import {Product} from '../../../domain/entities/product';
import {updateCreateProduct} from '../../../actions/products/update-create-product';
import {ProductImages} from '../../components/products';
import {GENDERS, SIZES} from '../../../config/constants';
import {CameraAdapter} from '../../../config/adapters/camera-adapter';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.id);
  const queryClient = useQueryClient();
  const theme = useTheme();

  const {data: product, isLoading} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationKey: ['updateProduct'],
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess: (data, variables, context) => {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', productIdRef.current],
      });
    },
  });

  if (isLoading) return <FullScreenLoader />;

  if (!product) return <NotFound />;

  return (
    <Formik initialValues={product} onSubmit={mutation.mutate}>
      {({values, errors, setFieldValue, handleChange, handleSubmit}) => (
        <MainLayout
          title={values.title}
          subtitle={`Price: $${values.price}`}
          rightAction={async () => {
            const photos = await CameraAdapter.getPicturesFromLibrary();
            setFieldValue('images', [...values.images, ...photos]);
          }}
          rightActionIcon="image-outline">
          <ScrollView style={{flex: 1}}>
            {/* Images */}
            <Layout style={styles.imagesSection}>
              <ProductImages images={values.images} />
            </Layout>
            {/* Form */}
            <Layout style={styles.columnSection}>
              {/* Title */}
              <Input
                label="Title"
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange('title')}
              />
              {/* Slug */}
              <Input
                label="Slug"
                placeholder="Slug"
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
              {/* Description */}
              <Input
                label="Description"
                placeholder="Description"
                multiline
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange('description')}
              />
            </Layout>

            <Layout style={styles.rowSection}>
              {/* Price */}
              <Input
                label="Price"
                placeholder="Price"
                keyboardType="number-pad"
                style={styles.input}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
              />
              {/* Stock */}
              <Input
                label="Stock"
                placeholder="Stock"
                keyboardType="number-pad"
                style={styles.input}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
              />
            </Layout>

            {/* Selectables */}
            {/* Sizes */}
            <ButtonGroup
              size="small"
              appearance="outline"
              style={styles.selectButtonGroup}>
              {SIZES.map(size => (
                <Button
                  key={size}
                  style={[
                    styles.selectButton,
                    {
                      backgroundColor: values.sizes.includes(size)
                        ? theme['color-primary-200']
                        : undefined,
                    },
                  ]}
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }>
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            {/* Genders */}
            <ButtonGroup
              size="small"
              appearance="outline"
              style={styles.selectButtonGroup}>
              {GENDERS.map(gender => (
                <Button
                  key={gender}
                  style={[
                    styles.selectButton,
                    {
                      backgroundColor: values.gender.startsWith(gender)
                        ? theme['color-primary-200']
                        : undefined,
                    },
                  ]}
                  onPress={() => setFieldValue('gender', gender)}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            {/* Save button */}
            <Button
              accessoryLeft={<CustomIcon name="save-outline" white />}
              style={{margin: 15}}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}>
              Save
            </Button>

            <Layout style={{height: 200}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  imagesSection: {justifyContent: 'center', alignItems: 'center'},
  columnSection: {
    marginHorizontal: 15,
    marginVertical: 5,
    gap: 10,
  },
  rowSection: {
    marginHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
  },
  selectButtonGroup: {
    margin: 2,
    marginTop: 30,
    marginHorizontal: 15,
  },
  selectButton: {
    flex: 1,
  },
  input: {
    flex: 1,
  },
});
