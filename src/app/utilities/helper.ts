export class Helpers {
    public static isNullOrEmpty(inpt: string | Array<any>): boolean {
        if (inpt === null || inpt === undefined) {
            return true;
        }

        if (typeof inpt === 'string') {
            return inpt === '';
        } else {
            return inpt.length === 0;
        }
    }

    public static isNullOrUndefined(obj: any | Array<any>): boolean {
        if (Array.isArray(obj)) {
            for (const item of obj) {
                if (item !== null || item !== undefined) {
                    return false;
                }
            }
            return true;
        }

        return obj === null || obj === undefined;
    }

    public static isNotNullOrUndefined(obj: any | Array<any>): boolean {
        if (Array.isArray(obj)) {
            for (const item of obj) {
                if (item === null || item === undefined) {
                    return false;
                }
            }
            return true;
        }

        return obj !== null && obj !== undefined;
    }

}
