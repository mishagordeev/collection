import {Collection} from './Collection.js'
import {View} from './View.js'



firebase.database().ref().on('value', function(snapshot) {
    const data = snapshot.val()
    const collection = new Collection(data)

    const view = new View(collection)
    view.init()
    view.draw(data, "cards")

})