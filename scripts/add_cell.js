export function addCell(row, type, ...content) {
    const cell = row.insertCell()
    switch(type) {
        case 'count':
            const count = document.createTextNode(content[0])
            cell.classList.add(type)
            cell.appendChild(count)
            break
    
        case 'set':    
            const i = document.createElement("i")
            const set = content[0]
            const rarity = content[1]
            i.classList.add("ss", `ss-${set}`, `ss-${rarity}`)
            i.style.fontSize = "24px"
            cell.classList.add(type)
            cell.appendChild(i)
            break        
        
        case 'names':
            const printed = content[0]
            const oracle = content[1]

            const title = document.createElement("p")     
            
            if (printed != oracle) {
                title.appendChild(document.createTextNode(printed))
                cell.appendChild(title)

                const subtitle = document.createElement("p") 
                subtitle.appendChild(document.createTextNode(oracle))
                subtitle.classList.add("subtitle")
                cell.appendChild(subtitle)
            } else {
                title.appendChild(document.createTextNode(oracle))
                cell.appendChild(title)
            }
            cell.classList.add(type)
            break 

        case 'manasymbols':
            const symbols = Array.from(content[0])
            cell.classList.add(type)
            
            if (symbols.length == 0) {
                cell.appendChild(document.createElement("p"))
                break
            }

            for (let symbol of symbols) {
                const ii = document.createElement("i")
                if (symbol == "t") symbol = "10" 
                ii.classList.add("ms", "ms-cost", `ms-${symbol}`)
                cell.appendChild(ii)
            }
            break        

        case 'language':
            const language = document.createTextNode(content[0])
            cell.classList.add(type)
            cell.appendChild(language)
            break
        
        case 'version':
            const version = document.createTextNode(content[0])
            cell.classList.add(type)
            cell.appendChild(version)
            break
    }
}
    