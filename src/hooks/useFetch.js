import { useEffect, useState, useCallback } from "react";

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: false,
        error: null
    });

    const fetchData = useCallback(async () => {
        if (!url) return;

        setState({ data: null, isLoading: true, error: null });

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                if (resp.status === 404) {
                    throw new Error("Pokémon no encontrado");
                }
                throw new Error("Error al obtener datos");
            }

            const data = await resp.json();

            // 🌍 Filtramos datos en español (descripción y tipos)
            const speciesResp = await fetch(data.species.url);  //  Obtiene información extendida
            const speciesData = await speciesResp.json();

             // 🌍 Obtiene habilidades en español
            const abilities = await Promise.all(
                data.abilities.map(async (abilityObj) => {
                const abilityResp = await fetch(abilityObj.ability.url);
                const abilityData = await abilityResp.json();
                const abilityNameEs = abilityData.names.find(name => name.language.name === "es")?.name || abilityObj.ability.name;
                return abilityNameEs;
                    })
            );

            // 🔹 Filtramos nombres en español
            const descripcion = speciesData.flavor_text_entries.find(entry => entry.language.name === "es")?.flavor_text || "Sin descripción";

            // 🔹 Filtramos tipos en español
            const types = await Promise.all(
                data.types.map(async (typeObj) => {
                    const typeResp = await fetch(typeObj.type.url);
                    const typeData = await typeResp.json();
                    const typeNameEs = typeData.names.find(name => name.language.name === "es")?.name || typeObj.type.name;
                    return typeNameEs;
                })
            );


            setState({
                data: {
                    id: data.id,
                    name: speciesData.names.find(name => name.language.name === "es")?.name || data.name, // Nombre en español
                    sprites: data.sprites,
                    types,
                    height:data.height,
                    weight:data.weight,
                    stats: data.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    })),
                    abilities,
                    descripcion
                },
                isLoading: false,
                error: null
            });
        } catch (error) {
            console.error("Error en la API:", error.message);
            setState({ data: null, isLoading: false, error: error.message });
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { ...state };
};
