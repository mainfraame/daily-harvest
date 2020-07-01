import axios from 'axios';
import { useQuery } from 'react-query';
import qs from 'qs';

axios.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true
    });
};

export default function useProductsApi(ingredient?: number[]) {
    return useQuery(
        ['product', ingredient],
        async (key, ingredient) => {
            return (
                await axios({
                    url: '/api/products',
                    params: {
                        ingredient
                    }
                })
            ).data;
        }, {
            initialData: [],
            initialStale: true,
            refetchOnWindowFocus: false
        }
    );
}
