import { globalSettings } from './settings';

export const randomInteger = (min: number, max: number) => {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const logger = (...args: any[]) => {
    if (globalSettings.physics?.arcade?.debug) {
        console.info(...args);
    }
}

export const wait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
