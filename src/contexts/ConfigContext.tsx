import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { User } from '../types/User';

interface ConfigField {
    enabled: boolean,
    weight: number,
}

export type ConfigContextType = {
    [K in keyof User]: ConfigField;
};

interface ConfigContextValue {
    config: ConfigContextType,
    setConfig: Dispatch<SetStateAction<ConfigContextType>>,
}

const defaultConfig: ConfigContextType = {
    fullName: { enabled: true, weight: 5 },
    id: { enabled: true, weight: 4 },
    email: { enabled: true, weight: 3 },
    img: { enabled: false, weight: 1 },
    jobArea: { enabled: true, weight: 2 },
    jobType: { enabled: true, weight: 2 },
    bio: { enabled: true, weight: 1 },
};

const ConfigContext = createContext<ConfigContextValue>({ config: defaultConfig, setConfig: () => {} });

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<ConfigContextType>(defaultConfig);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}


export const useConfig = () => useContext(ConfigContext);