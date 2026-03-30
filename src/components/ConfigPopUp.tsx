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
                <h2 className="text-lg text-center font-semibold mb-2">Search Scoring Configuration</h2>
                <p className="text-sm mb-4">You can edit the scoring configuration to customize the search behavior.</p>
                <div className="w-fit mx-auto flex flex-col items-end gap-2">
                    {Object.keys(config).map(key => {
                        let displayKey = key as keyof ConfigContextType;
                        return (
                            <div key={key} className="w-fit flex items-center justify-end gap-4">
                                <span className="capitalize flex-none truncate text-right">{key}:</span>
                                <select
                                    className="w-10 flex-none"
                                    value={config[displayKey]!.weight}
                                    onChange={(e) => {
                                        const newWeight = parseInt(e.target.value, 10);
                                        setConfig(prevConfig => ({
                                            ...prevConfig,
                                            [displayKey]: {
                                                ...prevConfig[displayKey],
                                                weight: newWeight,
                                            },
                                        }));
                                    }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(weight => (
                                        <option key={weight} value={weight}>{weight}</option>
                                    ))}
                                </select>
                                <input
                                    className='flex-none'
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
                        );
                    })}
                </div>
            </dialog>
        </div>
    );
}