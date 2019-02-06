function mapLetters(someString) {

  var charMap = {};

  for (var i = 0; i < someString.length; i++) {
    if (someString[i] !== " ") {

      if (!charMap[someString[i]]) {
        charMap[someString[i]] = [];
      }
      charMap[someString[i]].push(i);
    }
  }
  return charMap;
}

console.log(mapLetters("lighthouse in the house"));