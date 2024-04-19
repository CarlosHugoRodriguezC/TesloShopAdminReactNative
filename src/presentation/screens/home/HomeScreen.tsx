import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {getProductsByPage} from '../../../actions/products/';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoader, FAB} from '../../components/ui';
import {ProductList} from '../../components/products/ProductList';
import {RootStackParams} from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const queryClient = useQueryClient();
  const {data, isLoading, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: async ({pageParam}) => await getProductsByPage(pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <>
      <MainLayout
        title="Teslo Shop - Products "
        subtitle="Management Application">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            products={data?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
            refresh={() =>
              queryClient.invalidateQueries({
                queryKey: ['products', 'infinite'],
              })
            }
          />
        )}
      </MainLayout>
      <FAB
        style={{position: 'absolute', bottom: 30, right: 20}}
        onPress={() => navigation.navigate('ProductScreen', {id: 'new'})}
      />
    </>
  );
};
