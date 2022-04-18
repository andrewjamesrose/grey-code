//TS now supports maps (hashmaps)

// Instantiate a map via:
let myMap = new Map<string, number>();
//  Note that the types of key and value are set here in the definition

// it is also possible to assign key:value pairs to the map at instatiation
// eg
let myOtherMap = new Map<string, string>([
["key1", "value1"],
["key2", "value2"],
["key3", "value3"]
]);

// ### Map Methods ###
//  set
//  map.set(key, value) 
//      adds a new entry in the Map.

myMap.set("Cat", 12);
myMap.set("Dog", 99);
myMap.set("Fish", 61);

//  get
//  map.get(key) 
//      retrieves the value for a given key from the Map.
//      eg
console.log(myMap.get("Dog")) //prints 99

//  has
//  map.has(key) 
//      checks if a key is present in the Map. Returns true or false.
//      eg
console.log(myMap.has("Dog")) //prints true
console.log(myMap.has("Dolphin")) //prints false
//
//  size
//  map.size 
//      returns the count of entries in the Map.
console.log(myMap.size) //prints 3
//
//  delete 
//  map.delete(key)
//      deletes a key-value pair using its key. 
//      If key is found and deleted, it returns true, else returns false.
console.log(myMap.delete("Dolphin")) //prints false
console.log(myMap.delete("Dog"))    //returns true
//   
//  clear
//  map.clear()
//      deletes all entries from the Map.

//add dog back:
myMap.set("Dog", 99);


//  ### Map Iteration ###
//      Map entries iterate in the insertion order

//  keys 
//  map.keys()
//      iterates over map keys
for (let key of myMap.keys()) {
    console.log(key);       //"Cat", "Fish", "Dog"
}

//  values
//  map.values() 
//      iterates over map values
for (let value of myMap.values()) {
    console.log(value);       //12, 61, 99
}

//  entries
//  map.entries()
//      to iterate over map entries
for (let entry of myMap.entries()) {
    console.log(entry[0], entry[1]);    //"Cat" 12, "Fish" 61, "Dog" 99
}

//  map
//  uses object destructuring to iterate over map entries
// (pretty much an extension of the above)
for (let [key, value] of myMap) {
    console.log(key, value);            //"Cat" 12, "Fish" 61, "Dog" 99
}