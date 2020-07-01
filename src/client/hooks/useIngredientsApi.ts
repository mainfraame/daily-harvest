import axios from 'axios';
import { useQuery } from 'react-query';

export default function useIngredientsApi() {
    return useQuery(
        ['ingredients'],
        async () => {
            return (
                await axios({
                    url: '/api/ingredients'
                })
            ).data;
        }, {
            initialData: [],
            initialStale: true,
            refetchOnWindowFocus: false
        }
    );
}
