import { SimpleChanges } from '@angular/core';

export class Utils {
    public static isNumber(val: any): boolean {
        return !Array.isArray(val as any) && (val - parseFloat(val as string) + 1) >= 0;
    }

    public static isChangedObject(changes: SimpleChanges, prop: string): boolean {
        return changes[prop] && changes[prop].currentValue;
    }

    public static isChangedArray(changes: SimpleChanges, prop: string): boolean {
        return changes[prop] && changes[prop].currentValue && changes[prop].currentValue.length;
    }

    public static convertStringToColor(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash * 32) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            // tslint:disable-next-line
            let value = hash >> i * 8 & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    public static round(num: number, decimals: number) {
        return Math.round(num * decimals) / decimals;
    }
}
