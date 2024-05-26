import { createInventoryContainer, createItemSlots } from "./inventoryUtils/createInventoryContainer.js";
import itemContextMenu from "./inventoryUtils/inventoryItemContextMenu.js";
//import customEmitter from '../../../../main.js';
import customEmitter from '../../globalUtils/emitter.js';

export default class Inventory {
  constructor(scene) {

    scene.add.existing(this);
    this.items = [];
    this.inventoryContainer = [];
    this.activeItemBar = [];

  }

/*
  itemSplitPopup(scene, item) {
//maybe make this part of the context menu class that opens a further menu upon or popup on drop/discards
//to make the rest of the inventory inactive during the time of popup, maybe add a temporary rectangle
//on top of the inventory container so something non interactive is on top blocking input
//and then just destroy the rectangle or container after, probably pause or sleep activeScene too
  }
*/


  addItem(scene, item) {


    //add to this.items first
    const existingItemIndex = this.items.findIndex(existingItem => existingItem.name === item.name);
    if (existingItemIndex !== -1 && item.stackable) { // Item is stackable and already exists
    //  this.items[existingItemIndex].quantity += item.quantity; //make it later so can add multiple items at once without having to call multiple times
    this.items[existingItemIndex].quantity++; //currently increases the quantity by 1 for each time called
    } else {
      this.items.push(item);
    }


    //then add to inventoryContainer
    const itemIconContainers = scene.inventoryContainer.itemIconContainers;
    const items = scene.inventory.items;

    if (scene.inventoryContainer.containerSprites.includes(item) && item.stackable === true) {
      console.log('this item is already in inventory. now adding to container, is it stackable?');
     scene.inventoryContainer.sprites.forEach((sprite) => {
      console.log(sprite);
      console.log(item);
      if (sprite.textureKey === item.textureKey) {
        console.log(`if sprite === item ::::::::::::::::::::::::`)
        console.log(item);
        console.log(sprite);
        const existingItemIndex = this.items.findIndex(existingItem => existingItem.name === item.name);
        sprite.quantity = this.items[existingItemIndex].quantity;
        console.log(sprite.quantity);
       // sprite.itemQuant._text = sprite.quantity;
        sprite.itemQuant.setText(sprite.quantity);
       // sprite.itemQuant.setText(5);
       console.log(scene.inventoryContainer.sprites);
       
      } else {
        //existingitem doesnt have quantity property or max count is full?
      }

     });
      //increase the item quant counter by amount
    } else {
      console.log('this item aint in your inventory container or aint stackable, add new one');

    for (let i = 0; i < itemIconContainers.length; i++) {

      //if (itemIconContainers[i].dropZone.isEmpty === false) {
      if (itemIconContainers[i].isEmpty === false) {
        // const itemIcon = scene.add.sprite(0, 0, 'emptySlotSprite');
        console.log('this itemIconContainer is filled, trying next one'); //can delete these 3 lines after testing
      }
      else { //check if slot is empty
        
        console.log('creatingnewinventorysprite::::::::')
        const itemSprite = scene.add.sprite(0, 0, item.textureKey); //add sprite
        //itemSpriteContainers[i].itemSprite = itemSprite;
        // itemSprite.setDepth(100);

        // Add properties of sourceObject to sprite
        itemSprite.name = item.name;
        itemSprite.textureKey = item.textureKey;
        itemSprite.quantity = item.quantity; // Adjust to desired quantity if stacking is enabled
        itemSprite.description = item.description;
        itemSprite.flavorText = item.flavorText;
        itemSprite.stackable = item.stackable;
        itemSprite.consumable = item.consumable;
        itemSprite.onUse = item.onUse;
        itemSprite.onConsume = item.onConsume;

        itemSprite.setScale(.7);
    
        let lastClickTime = 0;
        let doubleClickDelay = 4000; // Adjust this value as needed
        itemSprite.ContextMenu;
  
        const itemQuant = scene.add.text(itemSprite.x - 20, itemSprite.y + 12, `${itemSprite.quantity}`);
        itemQuant.setOrigin(0, 0);
        itemQuant.fontSize = "12px";
        itemQuant.fill = "#ffffff";
        itemQuant.setDepth(1000);

      


        const itemIcon = scene.add.container(0, 0);
        itemIcon.sprite = itemSprite;
        itemIcon.sprite.itemQuant = itemQuant;
        itemIcon.setSize(64, 64);
        itemIcon.add(itemIcon.sprite);
        itemIcon.add(itemIcon.sprite.itemQuant);
        
        itemIcon.setInteractive({ draggable: true });

        scene.input.setDraggable(itemIcon);
        this.setDragEvents(itemIcon, scene);

        itemIconContainers[i].add(itemIcon); //add the icon as child of first available iconContainer
        itemIconContainers[i].isEmpty = false; //change slot to not empty

      //  scene.inventoryContainer.containerItems.push(item);
        scene.inventoryContainer.containerSprites.push(item);
        scene.inventoryContainer.sprites.push(itemIcon.sprite);
        //  console.log(itemIcon);

        return;

      }
    }
  }
  }

  removeItem(scene, item) {
      
    //make remove take stackCount into consideration
    console.log(item);

  
  const existingItemIndex = this.items.findIndex(existingItem => existingItem.name === item.sprite.name);
    console.log(this.items[existingItemIndex]);
  
    //make sure to reduce amount in this.items and scene.inventoryContainer sprites
  if (existingItemIndex !== -1 && item.sprite.stackable && this.items[existingItemIndex].quantity > 1 && item.sprite.quantity > 1) { // Item is stackable and already exists
      //this.items[existingItemIndex].quantity += item.quantity; //make it later so can add multiple items at once without having to call multiple times
      this.items[existingItemIndex].quantity--; //currently increases the quantity by 1 for each time called
     item.sprite.quantity--;
      item.sprite.itemQuant.setText(this.items[existingItemIndex].quantity);
    } 
      else {
          // otherwise continue with the removal logic
    console.log('attemptingtoremoveItem from inventory.removeItem');
    const itemIconContainers = scene.inventoryContainer.itemIconContainers;
    const index = this.items.indexOf(item);
    console.log(index);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

    itemIconContainers.forEach((container) => {
      console.log(container);
      if (container.list.length !== 0) {
      //console.log(container.first);
      //console.log(container.first.texture.key);
      let firstContainer = container.getAll().find(child => child instanceof Phaser.GameObjects.Container);
      let firstSprite = firstContainer.getAll().find(child => child instanceof Phaser.GameObjects.Sprite);
      
    //  if (item.list.length !== 0) {
    //  let checkItem = item.getAll().find(child => child instanceof Phaser.GameObjects.Sprite);
  //  }
    
    

      console.log(firstContainer);
      console.log(firstSprite);
      console.log(item);

      if (firstContainer.sprite.textureKey === item.sprite.textureKey) { //later switch with container.first.texture or .textureKey
       // container.remove(container.first);
       //firstContainer.destroy();
       console.log('fixing for a switching');
     // firstSprite.destroy();
     console.log(firstContainer);
     firstContainer.destroy();
    // firstSprite.destroy();
        container.isEmpty = true;
      } else {
        //console.log('wrong container');
      }
    } else {
      console.log('emptyContainer');
    }
    });
    console.log(this.items);
    console.log(itemIconContainers);
  }
  console.log(this.items);
  }

dropItem(scene, item) {
  console.log(`should be dropping a new trackkkk`)
  const activeScene = scene.activeScene;
  let dropItem = item.sprite;
  console.log(scene);
  console.log(item);
  console.log(dropItem);
  console.log(activeScene.player);

  let randomInteger = Phaser.Math.Between(1, 12);
  let dropX = this.player.x + 20 + randomInteger;
  let dropY = this.player.y + 20 + randomInteger;

  //const droppedItem = activeScene.add.sprite(this.player.x + 20 + randomInteger, this.player.y + 30  + randomInteger, item.textureKey);
  const droppedItem = activeScene.add.sprite(dropX, dropY, item.textureKey);
 //const droppedItem = activeScene.add.sprite(activeScene.player.x + 30, activeScene.player.x + 30, dropItem.textureKey);
  droppedItem.setScrollFactor(1, 1);
  droppedItem.setScale(.4);
  droppedItem.setInteractive();
  droppedItem.on('pointerdown', function (pointer, localX, localY, event) {
      console.log('readding the item to inventory container');
      scene.inventory.addItem(dropItem);
     // scene.inventory.addItemToContainer(dropItem);
    });
  console.log(item);
}


  displayFullInventory() {
    console.log('Inventory:');
    this.items.forEach(item => {
      console.log(item);
    });
  }

  createInventoryContainer(scene) {
    console.log('call the import funct w/ method of same name');
    createInventoryContainer(scene);
    //createInventoryZones(scene);
    createItemSlots(scene);
  }


  getRelativePos(object, parentContainer) {
    let x = object.x;
    let y = object.y;
    let currentContainer = object.parentContainer;

    // Traverse up the hierarchy until the specified parentContainer is reached
    while (currentContainer && currentContainer !== parentContainer) {
      x -= currentContainer.x;
      y -= currentContainer.y;
      currentContainer = currentContainer.parentContainer;
    }

    // If the specified parentContainer is found, return the relative position
    if (currentContainer === parentContainer) {
      return { x, y };
    } else {
      // If the specified parentContainer is not found, return null or handle the error accordingly
      return null;
    }
  }



  setDragEvents(itemIcon, scene) {

    let dragXTotal = 0;
    let dragYTotal = 0;
    //  console.log(`set drag events being called;`);
    this.itemDragStart(itemIcon, scene);
    this.itemDragEnd(itemIcon, scene);
    this.itemDrag(itemIcon, scene);

  }


  itemDrag(itemIcon, scene) {

    itemIcon.on('drag', function (pointer, dragX, dragY) {
      //   console.log('drag');
      if (scene.inventoryContainer.allowDrag) {
        this.setAlpha(.5);
        this.x = dragX;
        this.y = dragY;
      } else {
        console.log(`cant drag now, resetting allowDrag to true`);
        scene.inventoryContainer.allowDrag = true;
        //return false;
      }
    });
  }


  itemDragStart(itemIcon, scene) {

    itemIcon.on('dragstart', function (pointer, dragX, dragY) {
      console.log('dragStart');
      this.setAlpha(0.5);
      let lastClickTime = 0;
      let doubleClickDelay = 4000;
      scene.inventoryContainer.allowDrag = true;

      scene.inventoryContainer.dragStartTime = this.scene.time.now; //deleted this by try isntead?
      let lastDragEndTime = scene.inventoryContainer.lastDragEndTime;
      let timeSinceLastDrag = scene.inventoryContainer.dragStartTime - lastDragEndTime;
      console.log('REAL time since last drag should be: ' + timeSinceLastDrag);

      if (timeSinceLastDrag < 100) { //also make sure its dropped on same container
        console.log(`Double Clicked on item`);
        //event.stopImmediatePropagation();
        console.log(itemIcon);
        // pointer.stopImmediatePropagation();
        //  pointer.stopPropagation();
        scene.inventoryContainer.allowDrag = false;
        if (!itemIcon.contextMenu) {
          console.log('startmakingcontextmenu');
          // Create context menu if it doesn't exist
          itemIcon.contextMenu = new itemContextMenu(scene, pointer.x, pointer.y, itemIcon);
          itemIcon.contextMenu.setPosition(pointer.x, pointer.y);
          itemIcon.contextMenu.setVisible(true);
          //itemIcon.contextMenu = true;
        } else {
          // Update context menu position
          itemIcon.contextMenu.setPosition(pointer.x, pointer.y);
          itemIcon.contextMenu.setVisible(true);
        }
        return false;
      }

      // console.log(pointer);
      // console.log(scene.inventoryContainer.dragStartTime);


      scene.inventoryContainer.dragStartX = itemIcon.getBounds().x;
      scene.inventoryContainer.dragStartY = itemIcon.getBounds().y;
      scene.inventoryContainer.startSpriteState = itemIcon;
      //  console.log(itemIcon.getBounds());
      // console.log(itemIcon);

      scene.inventoryContainer.dragStartParent = itemIcon.parentContainer;
      //  console.log(scene.inventoryContainer.dragStartParent);
      //  console.log(scene.inventoryContainer.dragStartParent.getBounds());
      // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
      // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
      //console.log(itemIcon);

      // scene.inventoryContainer.itemIconContainers[6].add(itemIcon);


    });
  }

  itemDragEnd(itemIcon, scene) {

    itemIcon.on('dragend', function (pointer, dragX, dragY) {
      // console.log('dragEnd');
      //  console.log(pointer);

      let prevTime = scene.inventoryContainer.dragStartTime;
      scene.inventoryContainer.lastDragEndTime = this.scene.time.now;
      let dragDur = scene.inventoryContainer.lastDragEndTime - prevTime;
      console.log('dragend: drag duration should be: ' + dragDur);


      /*
            //also add check to make sure it was dropped in same container it started
            if (dragDur < 500 && scene.inventoryContainer.quickClicks === 0) {
              console.log('dragEnd DoubleClick listen, first click');
              scene.inventoryContainer.quickClicks = 1;
            } else {
              console.log('too slow for doubleclick, first click');
            }
      
            if (dragDur > 500) {
              scene.inventoryContainer.quickClicks = 0;
            }
      
            if (dragDur < 500 && scene.inventoryContainer.quickClicks === 1) {
              console.log('dragEnd DoubleClick listen, second click');
             // scene.inventoryContainer.quickClicks = 0;
            } else {
              console.log('too slow for doubleclick, second click');
            }
      */




      this.setAlpha(1);

      const itemIconContainers = scene.inventoryContainer.itemIconContainers;
      const itemParent = itemIcon.parentContainer;

      let isValidDropZone = Phaser.Geom.Rectangle.Overlaps(scene.inventoryContainer.getBounds(), itemIcon.getBounds());

      if (isValidDropZone) {

        // The draggable item is overlapping with the drop target
        //  console.log("Dragged onto drop target");


        let maxOverlap = 0;
        let bestDropZoneIndex = -1;
        let slotID = 0;

        for (let i = 0; i < scene.inventoryContainer.itemSlotContainers.length; i++) {
          let dropZone = scene.inventoryContainer.itemSlotContainers[i];
          let overlapArea = Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).width * Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).height;

          if (overlapArea > maxOverlap) {
            maxOverlap = overlapArea;
            bestDropZoneIndex = i;
            slotID = i + 1;
          }
        }

        if (bestDropZoneIndex !== -1) {
          //  console.log(`Dropped in Zone ${bestDropZoneIndex}, slot number: ${bestDropZoneIndex + 1}`);
          if (itemIconContainers[bestDropZoneIndex].isEmpty === true) {
            //   console.log(`add icon to new empty slot and switch parent container`);
            itemIconContainers[bestDropZoneIndex].isEmpty = false;
            itemIconContainers[bestDropZoneIndex].add(itemIcon);
            itemParent.isEmpty = true;
            //    console.log(itemIcon);
            const endXY = scene.inventory.getRelativePos(itemIcon, scene);
            itemIcon.setPosition(endXY);
          } else {
            console.log(`swap icon spots`);
            //console.log(itemIconContainers[bestDropZoneIndex].first);
            let otherSprite = itemIconContainers[bestDropZoneIndex].getAll().find(child => child instanceof Phaser.GameObjects.Container);
           // const otherIcon = itemIconContainers[bestDropZoneIndex].first;
            itemParent.add(otherSprite);
            itemIconContainers[bestDropZoneIndex].add(itemIcon);
            const endXY = scene.inventory.getRelativePos(itemIcon, scene);
            itemIcon.setPosition(endXY);
            const endXYotherIcon = scene.inventory.getRelativePos(otherSprite, scene);
            otherSprite.setPosition(endXYotherIcon);

          }
        } else {
          console.log("No drop zone detected == Too little of sprite in dropZone");
          const startX = scene.inventoryContainer.dragStartX;
          const startY = scene.inventoryContainer.dragStartY;

          //  console.log(itemIcon);
          const endXY = scene.inventory.getRelativePos({ x: startX, y: startY }, scene);
          itemIcon.setPosition(endXY);
        }


      }

      else {
        const startX = scene.inventoryContainer.dragStartX;
        const startY = scene.inventoryContainer.dragStartY;

        //  console.log(itemIcon);
        const endXY = scene.inventory.getRelativePos({ x: startX, y: startY }, scene);
        itemIcon.setPosition(endXY);

        /*
        const tween = scene.tweens.add({
          targets: itemIcon,
          x: endXY.x,
          y: endXY.y,
          ease: 'Power2', // Adjust easing for desired movement
          duration: 300, // Adjust duration for animation speed
      });
       */
      }


    });
  }


}