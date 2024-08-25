export interface CountryResponse {
    name: {
        common: string;
    };
    idd: {
        root: string;
        suffixes: Array<string>;
    };
    cca2: string;
    flag: any;
}