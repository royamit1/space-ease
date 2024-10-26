'use client'

import {createStore, StateCreator, StoreApi} from "zustand/vanilla";
import {useStore as useStoreReact} from "zustand/react";
import React from "react";


interface StoreProviderProps {
    children: React.ReactNode
}

function identity<T>(value: T) {
    return value
}

type Selector<T, S> = (state: T) => S

type SetStateInternal<T> = {
    _(partial: T | Partial<T> | {
        _(state: T): T | Partial<T>;
    }['_'], replace?: false): void;
    _(state: T | {
        _(state: T): T;
    }['_'], replace: true): void;
}['_'];

interface Create<T> {
    StoreProvider: React.FC<StoreProviderProps>;
    useStore: () => StoreApi<T>;
    useState: <S>(selector?: Selector<T, S>) => [S, SetStateInternal<T>];
}

export function create<T>(initializer: StateCreator<T, [], []>): Create<T> {
    const storeContext = React.createContext<StoreApi<T> | undefined>(undefined)

    const StoreProvider: React.FC<StoreProviderProps> = ({children}) => {
        const storeRef = React.useRef<StoreApi<T>>();
        if (!storeRef.current) {
            storeRef.current = createStore(initializer);
        }
        return (
            <storeContext.Provider value={storeRef.current}>
                {children}
            </storeContext.Provider>
        )
    }

    function useStore() {
        const store = React.useContext(storeContext)
        if (!store) {
            throw new Error("Zustand/next useStore must be used within StoreProvider")
        }
        return store
    }

    function useState<S>(selector: Selector<T, S> = identity as Selector<T, S>): [S, SetStateInternal<T>] {
        const store = useStore()
        const state = useStoreReact(store, selector);
        return [state, store.setState]
    }

    return {StoreProvider, useStore, useState}
}