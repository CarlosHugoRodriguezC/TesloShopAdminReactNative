import React from 'react';
import {FlatList, Image} from 'react-native';
import {FadeInImage} from '../ui';

interface Props {
  images: string[];
}

export const ProductImages = ({images}: Props) => {
  return (
    <>
      {images.length ? (
        <FlatList
          data={images}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <FadeInImage
              uri={item}
              style={{height: 300, width: 300, marginHorizontal: 7}}
            />
          )}
          horizontal
          snapToStart
          showsHorizontalScrollIndicator={false}
          snapToInterval={100}
        />
      ) : (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{height: 300, width: 300, marginHorizontal: 7}}
        />
      )}
    </>
  );
};
