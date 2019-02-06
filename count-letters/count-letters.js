function countLetters(someString) {

  someString = someString.split(" ").join("");

  var charCount = {};

  for (var i of someString) {
    if (!charCount[i]) {
      charCount[i] = 0;
    }
    charCount[i] += 1;
  }

  return charCount;
}

console.log(countLetters("lighthouse in the house"));