import React, {useState} from 'react';
import {Product} from '../../../domain/entities/product';
import {Layout, List} from '@ui-kitten/components';
import {ProductCard} from './ProductCard';
import {RefreshControl} from 'react-native-gesture-handler';

interface Props {
  products: Product[];
  fetchNextPage?: () => void;
  refresh?: () => void;
}

export const ProductList = ({products, fetchNextPage, refresh}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    refresh && (await refresh());
    setIsRefreshing(false);
  };
  return (
    <List
      style={{height: '100%'}}
      data={products}
      numColumns={2}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
