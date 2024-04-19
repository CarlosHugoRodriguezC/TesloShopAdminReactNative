import {Image, Text, View} from 'react-native';
import {Product} from '../../../domain/entities/product';
import {Card} from '@ui-kitten/components';
import {FadeInImage} from '../ui';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props {
  product: Product;
}

export const ProductCard = ({product}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <Card
      style={{flex: 1, backgroundColor: '#f9f9f9', margin: 3}}
      onPress={() => navigation.navigate('ProductScreen', {id: product.id})}>
      {!product.images.length ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{width: '100%', height: 200}}
        />
      ) : (
        <FadeInImage
          uri={product.images.at(0)!}
          style={{flex: 1, height: 200, width: '100%'}}
        />
      )}

      <Text style={{textAlign: 'center'}} numberOfLines={2}>
        {product.title}
      </Text>
    </Card>
  );
};
