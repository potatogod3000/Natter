function compare(a, b) {
    if(a.name.common < b.name.common) {
        return -1
    }
    if(a.name.common > b.name.common) {
        return 1
    }
    return 0
}

export async function getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag,idd", { method: "GET" })
    if(response.ok) {
        const countriesList = await response.json()
        let sortedCountriesList = countriesList.sort(compare)
        return sortedCountriesList
    }
    else {
        return null
    }
}

export function getAreaCodes(countries, selectedCountry) {
    const callingCodes = []
    if(countries){

        countries.forEach(country => {
            if(country.cca2 === selectedCountry) {
                let callingCode = country.idd.root
                callingCodes.push(callingCode)
                country.idd.suffixes.forEach(suffix => {
                    callingCode += suffix
                    callingCodes.push(callingCode)
                    callingCode = country.idd.root
                })
                
            }
        })

    }
    return callingCodes
}