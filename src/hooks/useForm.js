import { useState } from "react";

export const useForm = (initialState = { name: '' }) => {
    const [input, setInput] = useState(initialState);
    const [name, setName] = useState(initialState.name);

    const onInputChange = ({ target }) => {
        setInput({
            ...input,
            [target.name]: target.value
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (input.name.trim().length <= 0) return;
        setName(input.name); 
        setInput(initialState);
    };

    return {
        ...input,
        name,
        input,
        onInputChange,
        onSubmit
    };
};
