import { Transform, plainToInstance } from 'class-transformer';

export const ToJsonArrayOf = <T>(Cls: new () => T) =>
    Transform(({ value }) => {
        if (value === undefined || value === null || value === '') return undefined;


        const raw = Array.isArray(value) ? value[0] : value;

        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;


        const arr = Array.isArray(parsed) ? parsed : [];


        return plainToInstance(Cls, arr);
    }, { toClassOnly: true });


export const ToJsonValue = () =>
    Transform(({ value }) => {
        if (value === undefined || value === null || value === '') return undefined;

        const raw = Array.isArray(value) ? value[0] : value;
        if (typeof raw === 'string') return JSON.parse(raw);

        return raw;
    }, { toClassOnly: true });