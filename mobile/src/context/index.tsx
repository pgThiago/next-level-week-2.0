import React, { createContext, useState } from 'react';

export const ReloadContext = createContext({});

export function FavoriteProvider({ children }){

    const [ fav, setFav ] = useState(false);

    function handleToggle(fav: boolean){
        if (fav){
            setFav(false);
        }
        else{
            setFav(true);
        }
    }

    return (
        <ReloadContext.Provider value={{ handleToggle, fav }}>
            { children }
        </ReloadContext.Provider>
    )
}
