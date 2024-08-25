import { Injectable } from "@angular/core";
import { CountryResponse } from "../../../app/models/shared/country-response.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class CountriesService {

    constructor(private _http: HttpClient) {}

    sortByCountryName(countriesList: Array<CountryResponse>): Array<CountryResponse> {
        return countriesList.sort((a: CountryResponse, b: CountryResponse) => {
            if (a.name.common < b.name.common) {
                return -1;
            }
            if (a.name.common > b.name.common) {
                return 1;
            }
            return 0;
        });
    }
    
    getCountries(): Observable<Array<CountryResponse>> {
        return this._http.get<Array<CountryResponse>>('https://restcountries.com/v3.1/all?fields=name,cca2,flag,idd');
    }
    
    getAreaCodesForCountry(countries: Array<CountryResponse>, selectedCountry: string): Array<string> {
        const callingCodes: Array<string> = [];

        if (countries) {
            countries.forEach((country) => {
                if (country.cca2 === selectedCountry) {
                    let callingCode = country.idd.root;
                    callingCodes.push(callingCode);

                    country.idd.suffixes.forEach((suffix) => {
                        callingCode = callingCode + suffix;
                        callingCodes.push(callingCode);
                        callingCode = country.idd.root;
                    });
                }
            });
        }

        return callingCodes;
    }   
}
