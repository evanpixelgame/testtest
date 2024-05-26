// If a sensor is supposed to be more of an overlap property rather than just an on collision
// Then make sure to give it a on collisionend switch case that reverses the effect after the collisionstart
//instead of using if else maybe just use the once  event listeners to start the scenes for first time
//so they only run once and then do sleep/wake from then on
//test out switching laumch pause and resume with sleep and wake 
//maybe try making the collision handlers and other interaction handlers classes that i can make new isntances of
//see if i can make the switch cases easier to set up if made as a class

import OpenWorld from '../../scenes/OpenWorld.js';
import NewScene from '../../scenes/NewScene.js';
import OverlayScene from '../../OverlayScene.js';
//import customEmitter from '../../../main.js';
import customEmitter from '../globalUtils/emitter.js';



export function sensorHandler(scene, map, player, transitionSensors) {
 
  //add the scene early so event emitter works right?
  scene.scene.add('NewScene', NewScene);

  player.scene.matter.world.on('collisionstart', (eventData) => {
    // Loop through pairs of colliding bodies
    eventData.pairs.forEach(pair => {
      // Check if the player is one of the bodies involved in the collision
      if (pair.bodyA === player.body || pair.bodyB === player.body) {
        // Get the other body involved in the collision
        const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
        const isCustom = otherBody.isSensor == true;

        // let healthBarReductionZone = null;
        
        if (isCustom) {
          switch (otherBody.customID) {
              
           case 'OpenWorldToInsideRoom':
    // Check if 'NewScene' is already active
    const newScene = scene.scene.get('NewScene');
    if (scene.NewSceneLaunched == true) {
      console.log('You hit the door sensor again!');
        // If 'NewScene' is already active, resume it
        scene.scene.pause('OpenWorld');
        scene.scene.resume('NewScene');
        scene.scene.bringToTop('NewScene'); 
      customEmitter.emit('activeSceneChanged', 'NewScene');
    } else {
      console.log('youve hit the door sensor for the first time');
      console.log('x position: ' + scene.player.x + '  y position: ' + scene.player.y);
      scene.player.setPosition(560, 685);
      console.log('x position: ' + scene.player.x + '  y position: ' + scene.player.y);
       
      scene.NewSceneLaunched = true;
      // If 'NewScene' is not active, launch it
        scene.scene.pause('OpenWorld');
        scene.scene.launch('NewScene', {
            player: scene.player,
            engine: scene.matter.world,
            world: scene.world,
        });
        customEmitter.emit('activeSceneChanged', 'NewScene');
    }
    break;
              
               case 'fastZone':  //Make sure to reverse the velocityChange in the collisionend case so that it acts as an overlap sensor
              console.log('cue sirens, +2 speed');
              scene.velocityChange += 2; 
              break;


              case 'slowZone': 
              console.log('testing health bar');
             scene.healthBarReductionZone = scene.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    // Function to execute continuously
                    console.log('Function executed continuously during overlap');
                    customEmitter.emit('healthChange', -5); //right now need to do +2 in order to subtract 2 health
                },
                callbackScope: scene
            });
          //  healthBarReductionZone();

              break;

              case 'teleportZone': 
              console.log('testing health bar');
             scene.healthBarIncreaseZone = scene.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    // Function to execute continuously
                    console.log('THIS IS A HOSPITAL AND TITI IS THE MOST GORGEOUS HUMAN WHO EVER LIVED');
                    customEmitter.emit('healthChange', 5);
                },
                callbackScope: scene
            });
          //  healthBarReductionZone();

              break;
//TITI IS GORGEOUS

            // Add more cases for other sensor names as needed
            default:
              console.log(otherBody.customID);
              // Handle other sensor names that don't have switch cases yet
              break;
          }
        } else {
          console.log('Collision detected with non-sensor object ID:', otherBody.id);
        }
      }
    });
  });
  
//****************************************************************************************************************************************
//********************************COLLISION END SWITCH CASES******************************************************************************
  
  player.scene.matter.world.on('collisionend', (eventData) => {
    eventData.pairs.forEach(pair => {
      if (pair.bodyA === player.body || pair.bodyB === player.body) {
        const otherBody = pair.bodyA === player.body ? pair.bodyB : pair.bodyA;
        const isCustom = otherBody.isSensor == true;
          
        if (isCustom) {
          switch (otherBody.customID) {
              
            case 'fastZone': //reverses the velocity change made in the collisionstart fastZone switch case
              console.log('whee woo, collision overlap over, -2 speed');
              scene.velocityChange -= 2; 
              break;


              case 'slowZone': //reverses the velocity change made in the collisionstart fastZone switch case
              console.log('remove health reduction tween');
              scene.healthBarReductionZone.remove(); 
              break;
              
              case 'teleportZone': //reverses the velocity change made in the collisionstart fastZone switch case
              console.log('remove health increase tween');
              scene.healthBarIncreaseZone.remove(); 
              break;

            // Add more cases for other sensor names as needed
            default:
              console.log('Ended collision with ' + otherBody.customID);
              // Handle other sensor names that don't have switch cases yet
              break;
          }
        } else {
          console.log('Ended Collision detected with non-sensor object ID:', otherBody.id);
        }
      }
    });
  });
    
}
