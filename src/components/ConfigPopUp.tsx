// Context
import { useConfig } from '../contexts/ConfigContext';
import type { ConfigContextType } from '../contexts/ConfigContext';

export default function ConfigPopUp({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { config, setConfig } = useConfig();

    if (!isOpen) return null;

    // Cierra el popup si se hace click fuera del contenido
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="absolute inset-0 z-50 cursor-pointer flex flex-col justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <dialog open={isOpen} className="flex-none cursor-default mx-auto max-w-96 bg-white text-black rounded-lg shadow-lg p-4 animate-fade-in">
                <h2 className="text-lg font-semibold mb-2">Configuration</h2>
                <p className="text-sm mb-4">This is a placeholder for the configuration popup. You can add settings here to customize the search behavior.</p>
                {Object.keys(config).map(key => {
                    let displayKey = key as keyof ConfigContextType;
                    return (
                        <div key={key} className="flex items-center justify-between mb-2">
                            <span className="capitalize">{key}</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={config[displayKey]!.enabled}
                                    onChange={() => {
                                        setConfig(prevConfig => ({
                                            ...prevConfig,
                                            [displayKey]: {
                                                ...prevConfig[displayKey],
                                                enabled: !prevConfig[displayKey]!.enabled,
                                            },
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </dialog>
        </div>
    );
}