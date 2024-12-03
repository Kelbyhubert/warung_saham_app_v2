import React from "react"

export const useDebounce = (input: string, delay : number) => {
    const [value , setValue] = React.useState<any>(input);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setValue(input);
        },delay);
        
        return () => clearTimeout(handler);
    },[input,delay]);

    return value;
}