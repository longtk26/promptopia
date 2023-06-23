import { useState, useEffect } from "react";

const useDebounce = (value) => {
    const [result, setResult] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setResult(value);
        }, 300);

        return () => {
            clearTimeout(id);
        };
    }, [value]);

    return result;
};

export default useDebounce;
