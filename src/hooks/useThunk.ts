import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export default function useThunk(thunk: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>({} as Error);
    const dispatch = useDispatch();

    const runThunk = useCallback((arg: any) => {
        setIsLoading(true);
        dispatch(thunk(arg))
        .unwrap()
        .catch((err: Error) => setError(err))
        .finally(() => setIsLoading(false));
    }, [dispatch, thunk]);

    return [
        runThunk,
        isLoading,
        error,
    ];
}