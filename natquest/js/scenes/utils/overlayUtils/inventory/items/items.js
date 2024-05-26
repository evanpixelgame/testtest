import Item from './itemsClass.js';
import healthPotionWeak from './potions/healthPotionWeak.js';
import poisonPotionWeak from './potions/poisonPotionWeak.js';
import manaPotionWeak from './potions/manaPotionWeak.js';
import wealthPotion from './potions/wealthPotion.js';
import emeraldRing from './equipment/rings/emeraldRing.js';
import itemNull from './itemNull.js';

/*
const wealthPotion = new Item(
    'Wealth Potion', //name
    'wealthPotionTexture', //texture key
    'wealthPotionTexture', //icon key, will be replaced with texture so delete after 
    1, //quantity
    'Restores 10 coins. Consumable.', // use description
    'It looks slightly worn out, but probably still good', // flavor text 
    true, //stackable
    true, //consumable
    () => { //onUse method
        console.log('wealthPotion on use method');
    },

    () => { //onConsume method
        console.log('wealthPotion on consume method');
    }
    );
    */

const itemsListFull = {

itemNull,
healthPotionWeak,
poisonPotionWeak,
manaPotionWeak,
emeraldRing,
wealthPotion,

};

export default itemsListFull;