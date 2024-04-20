import { useMutation, useQueryClient } from "react-query";
import { useGlobalState } from "./globaleState";
import { useNavigate } from 'react-router-dom'
const UseMutationCustom = (fc, success, error, refetch, someTodo, pathNavigate) => {
    const { globalState, setGlobalState } = useGlobalState();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation(fc, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(refetch)
            // someTodo()
            // someTodo(data)
            console.log(data)
            if (data.statusCode === 404) {
                setGlobalState({ message: error, success: false, handle: true });
            }
            else {
                someTodo(data)
                setGlobalState({ message: success, success: true, handle: true });
                setTimeout(() => {
                    setGlobalState({ message: '', success: false, handle: false });
                    if (pathNavigate !== null) {
                        navigate(pathNavigate)
                    }
                });
            }
        },
        onError: (data) => {
            setGlobalState({ message: error, success: false, handle: true });
            setTimeout(() => {
                setGlobalState({ message: '', success: false, handle: false });
            });
        }
    });
};

export default UseMutationCustom;
