
//import customEmitter from '../../../../../../main.js';
import customEmitter from '../../../../globalUtils/emitter.js';
import Item from '../itemsClass.js';

const manaPotionWeak = new Item(
    'Mana Potion', //name
    'manaPotionWeak', //texture key
    1, //quantity
    'Restores 10 HP. Consumable.', // use description
    'It looks slightly worn out, but probably still good', // flavor text 
    true, //stackable
    true, //consumable
    () => { //onUse method
        console.log('manaPotion on use method');
    },

    () => { //onConsume method
        console.log('manaPotion on consume method');
        //customEmitter.emit('manaChange', 30);
        //add mana bar
    }
    );

    export default manaPotionWeak;