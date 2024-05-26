export function sensorMapSet(scene, map) {
  const sensorLayer1 = map.getObjectLayer('Sensor Layer 1');

  sensorLayer1.objects.forEach(object => {
    // Log object properties to check if it has the customID property
    const customIDProperty = object.properties.find(prop => prop.name === 'customID');
    const customID = customIDProperty ? customIDProperty.value : null;
    console.log('Object Custom IDfromhandler:', customID);

    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;
    const width = object.width;
    const height = object.height;

    // Create the rectangle sensor body
    const sensor = scene.matter.add.rectangle(centerX, centerY, width, height, {
      isSensor: true, // Set to true to make it a sensor
      customID: customID,
      render: {
        fillStyle: 'transparent', // Optional: make the sensor invisible
        strokeStyle: 'red' // Optional: set a stroke color for debugging
      }
    });
  });

}


export function createCollisionObjects(scene, map) {
  const collisionObjects = [];

  const objectLayer = map.getObjectLayer('Collision Layer 1');

  objectLayer.objects.forEach(object => {
    const centerX = object.x + object.width / 2;
    const centerY = object.y + object.height / 2;

    if (object.polygon) {
      // Handle polygons
      const polygonVertices = object.polygon.map(vertex => {
        return { x: object.x + vertex.x, y: object.y + vertex.y };
      });

      // Adjust the centroid of the polygon
      const centroid = calculateCentroid(polygonVertices);
      const adjustedVertices = polygonVertices.map(vertex => {
        return {
          x: vertex.x - centroid.x + centerX,
          y: vertex.y - centroid.y + centerY
        };
      });

      const collisionObject = scene.matter.add.fromVertices(centerX, centerY, adjustedVertices, { isStatic: true });
      collisionObjects.push(collisionObject);
    } else if (object.ellipse) {
      // Handle circles
      const radiusX = object.width / 2;
      const radiusY = object.height / 2;
      const collisionObject = scene.matter.add.circle(centerX, centerY, Math.max(radiusX, radiusY), { isStatic: true });
      collisionObjects.push(collisionObject);
    } else {
      // Handle rectangles
      const collisionObject = scene.matter.add.rectangle(centerX, centerY, object.width, object.height, { isStatic: true });
      collisionObjects.push(collisionObject);
    }
  });

  return collisionObjects;
}


// Function to calculate centroid of a polygon
function calculateCentroid(vertices) {
  let centroidX = 0;
  let centroidY = 0;
  const vertexCount = vertices.length;

  for (let i = 0; i < vertexCount; i++) {
    const vertex = vertices[i];
    centroidX += vertex.x;
    centroidY += vertex.y;
  }

  centroidX /= vertexCount;
  centroidY /= vertexCount;

  return { x: centroidX, y: centroidY };
}
