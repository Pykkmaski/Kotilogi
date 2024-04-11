import { useInputData, useInputFiles } from 'kotilogi-app/hooks/useInputFiles';
import { useState } from 'react';

export type StatusType = 'idle' | 'loading' | 'error' | 'success';

export function useStatus(initialState: StatusType) {
    const [status, setStatus] = useState<StatusType>(initialState);
    return [status, setStatus] as const;
}

export function useAddModal<T extends Function>(initialData: {}, submitMethod: T) {
    const { data, updateData } = useInputData(initialData);
    const { files, updateFiles } = useInputFiles();

    const onSubmit = e => {
        console.log(files);

        return submitMethod(data, files);
    };

    return { updateData, updateFiles, onSubmit };
}
