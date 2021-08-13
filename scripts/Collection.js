export class Collection { 
    filters = {
        color: [],
        special: [],
        rarity: [],
    }

    searchString = ""
    filteredData = []

    constructor(data) {
        this.data = data
        this.filteredData = this.data
    }

    search(string) {
        this.searchString = string
        this.filter()
    }

    addFilter(filter, filterType) {
        this.filters[filterType].push(filter)
        this.filter()
    }

    removeFilter(filter, filterType) {
        const i = this.filters[filterType].indexOf(filter)
        this.filters[filterType].splice(i, 1)
        this.filter()
    }

    isActive(filter) {
        return this.filters[filter].length != 0 ? true : false
    }

    filter() {

        let data = this.data
        let filtered = []
    
        for (let filter in this.filters) {
            filtered = []
            if (this.isActive(filter)) {                
                for (let item of data) {
                    if (filter != "special") {if (this.filters[filter].includes(item[filter])) filtered.push(item)} else {if (item["version"].includes(this.filters[filter])) filtered.push(item)}
                }
            } else filtered = data
            data = filtered
        }



        this.filteredData = filtered.filter((item) => item["printed"].toLowerCase().includes(this.searchString.toLowerCase()) || item["oracle"].toLowerCase().includes(this.searchString.toLowerCase()) || item["russian"].toLowerCase().includes(this.searchString.toLowerCase()))
    }
}