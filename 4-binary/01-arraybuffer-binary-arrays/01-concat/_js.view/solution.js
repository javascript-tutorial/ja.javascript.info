function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

<<<<<<< HEAD
  if (!arrays.length) return null;

  let result = new Uint8Array(totalLength);
=======
  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;
>>>>>>> 2901e0c64590a67d8a2bde1ea76a514d96f80469

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
