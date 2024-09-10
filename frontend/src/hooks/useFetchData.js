import { useEffect, useState } from 'react';
import { setLoading } from '~/redux/Loading/Action';

export const useFetchData = (callback) => {
    const [isFetched, setIsFetched] = useState(false);
    useEffect(() => {
        setLoading(true);
        callback().then(() => {
            setIsFetched(true);
            setLoading(false);
        });
    }, []);
    return isFetched;
};
