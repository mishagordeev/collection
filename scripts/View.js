import { addCell } from "./add_cell.js"

export class View {
    inactiveOpacity = 0.35
    viewType = "cards"

    constructor(collection) {
        this.collection = collection
    }

    init() {
        const header = document.createElement("div")
        header.classList.add("header")
        document.body.appendChild(header)
        
        const inputPlaceholder = document.createElement("div")
        inputPlaceholder.classList.add("placeholder")
        header.appendChild(inputPlaceholder)

        const input = document.createElement("input")
        input.classList.add("search")
        input.oninput = () => {
            this.collection.search(input.value)
            this.draw(this.collection.filteredData, this.viewType)
        }
        inputPlaceholder.appendChild(input)

        const switcher = document.createElement("span")
        switcher.classList.add("switcher")
        switcher.textContent = "Таблица"
        switcher.onclick = () => {
            if (this.viewType == "cards") {
                this.viewType = "table"
                switcher.textContent = "Карты"
            } else {
                this.viewType = "cards"
                switcher.textContent = "Таблица"
            }
            this.draw(this.collection.filteredData, this.viewType)
        }
        inputPlaceholder.appendChild(switcher)

        const filtersPlaceholder = document.createElement("div")
        filtersPlaceholder.classList.add("placeholder")
        header.appendChild(filtersPlaceholder)

        const wrapper = document.createElement("div")
        wrapper.style = "display: flex"
        filtersPlaceholder.appendChild(wrapper)

        const filters = {
            color: ["red", "green", "white", "blue", "black", "multicolor", "artifact", "land"],
            special: ["Foil"],
            rarity: ["common", "uncommon", "rare", "mythic"]
        }

        const filtersImageColor = {
            "red": "r",
            "green": "g",
            "white": "w",
            "blue": "u",
            "black": "b",
            "artifact": "artifact",
            "land": "land"
        }

        const filtersRarityColor = {
            "common": "#ffffff",
            "uncommon": "#C4C4C4",
            "rare": "#A58E4A",
            "mythic": "#BF4427"
        }

        for (let filterType in filters) {
            for (let filter of filters[filterType]) {

                const filterButton = document.createElement("button")
                filterButton.classList.add("filter_button")

                let filterImage
                
                if (filterType == "color") {
                    if (filter != "multicolor") {
                        filterImage = document.createElement("i")
                        filterImage.classList.add("ms", "ms-cost", `ms-${filtersImageColor[filter]}`)   
                    } else {
                        filterImage = document.createElement("img")
                        filterImage.src = "./images/m.svg"
                        filterImage.width = 24
                    }
                }

                if (filterType == "special") {
                    if (filter == "Foil") {
                        filterImage = document.createElement("img")
                        filterImage.src = "./images/foil_button.png"
                        filterImage.width = 24
                    }
                }

                if (filterType == "rarity") {
                    filterImage = document.createElement("div")
                    filterImage.classList.add("rarity_filter")
                    filterImage.style.opacity = this.inactiveOpacity
                    filterImage.style.background = filtersRarityColor[filter]
                }

                filterImage.style.opacity = this.inactiveOpacity
                filterImage.id = filter

                filterButton.onclick = () => {
                    if (filterImage.style.opacity == this.inactiveOpacity) {
                        filterImage.style.opacity = 1
                        this.collection.addFilter(filter, filterType)
                        this.draw(this.collection.filteredData, this.viewType)
                    } else {
                        filterImage.style.opacity = this.inactiveOpacity
                        this.collection.removeFilter(filter, filterType)
                        this.draw(this.collection.filteredData, this.viewType)
                    }
                }

                filterButton.appendChild(filterImage)
                wrapper.appendChild(filterButton)
            }

            if (filterType == "special") {
                const filterDivider = document.createElement("div")
                filterDivider.classList.add("filter_divider")
                wrapper.appendChild(filterDivider)
            }
        }

        const table = document.createElement("table")
        document.body.appendChild(table)
        
        const cards = document.createElement("div")
        cards.classList.add("cards")
        cards.id = "cards"
        document.body.appendChild(cards)
    }
    
    draw(data, viewType) {
        const table = document.querySelector("table")
        const cards = document.getElementById("cards")

        if (viewType == "table") {
            table.style.display = "block"
            cards.style.display = "none"
            table.innerHTML = ""
            for (let item of data) {
                let row = table.insertRow();
                addCell(row, "count", item["count"])
                addCell(row, "set", item["set"], item["rarity"])
                addCell(row, "names", item["printed"], item["oracle"])
                addCell(row, "manasymbols", item["manacost"])
                addCell(row, "language", item["language"])
                addCell(row, "version", item["version"])
            }
        }

        if (viewType =="cards") {
            cards.style.display = "flex"
            table.style.display = "none"
            cards.innerHTML = "" 
            for (let item of data) {
                const card = document.createElement("div")
                let img = document.createElement("img")

                img.src = item["image"] 
                img.width = 265
                img.height = 368
                img.style.borderRadius = "15px"
                card.classList.add("card")
                card.appendChild(img)
                if (item["version"].includes("Promo")) {
                    let promo = document.createElement("img")
                    promo.src = "./images/promo.png"
                    promo.style.position = "absolute"
                    promo.style.right = "0px"
                    card.appendChild(promo)                    
                }

                const promo2021 = ["mh2", "afr"]
                if (promo2021.includes(item["set"]) && item["version"].includes("Prerelease")) {
                    let promo = document.createElement("img")
                    promo.src = "./images/2021.png"
                    promo.style.position = "absolute"
                    promo.style.right = "0px"
                    card.appendChild(promo)  
                }
                if (item["version"].includes("Foil")) {
                    let foil = document.createElement("img")
                    foil.src = "./images/foil.png"
                    foil.style.position = "absolute"
                    foil.style.right = "0px"
                    foil.style.borderRadius = "15px"
                    card.appendChild(foil)                    
                }
                if (item["count"] > 1) {
                    const count = document.createElement("p")
                    count.textContent = item["count"]
                    count.classList.add("count")
                    card.appendChild(count)
                }
                
                cards.appendChild(card)
            }
        }
    }
}