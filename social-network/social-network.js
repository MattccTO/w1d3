var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};

//Function to determine who each user follows and is followed by
var whoFollowsWho = function(userData) {

  var followData = {};

  for (var i in userData) {

    followData[userData[i].name] = {
      follows: [],
      followedBy: []
    };

    for (var j in userData[i].follows) {

      var tempKey = userData[i].follows[j];

      followData[userData[i].name].follows.push(userData[tempKey].name);
    }

    for (var k in userData){

      if(userData[k].follows.includes(i)) {
        followData[userData[i].name].followedBy.push(userData[k].name);
      }
    }
  }

  return followData;
};

//Test whoFollowsWho
// console.log(whoFollowsWho(data));

//Function to see who follows the most people
var theStalker = function(userData) {

  var pointer;
  var numFollowed = 0;

  for (var i in userData) {

    if (userData[i].follows.length > numFollowed) {
      pointer = i;
      numFollowed = userData[i].follows.length;
    }

  }
  return `The stalker is ${userData[pointer].name} following ${numFollowed} people.`;
};
//Test theStalker
// console.log(theStalker(data));

//Function to see who has the most followers - Finds all cases
var captPopular = function(userData) {

  var pointer = [0];
  var numFollower = [0];

  for (var i in userData) {

    var tempNumFollower = 0;

    for (var j in userData) {
      if(userData[j].follows.includes(i)) {
        tempNumFollower++;
      }
    }
    if (tempNumFollower > numFollower[0]) {
      pointer = [];
      numFollower = [];
      pointer.push(i);
      numFollower.push(tempNumFollower);
    } else if (tempNumFollower === numFollower[0]) {
      pointer.push(i);
      numFollower.push(tempNumFollower);
    }
  }

  if (pointer.length === 1) {
    return `${userData[pointer].name} is Captain Popular with ${numFollower} followers!`;
  } else {
    var peopleStr = "";
    for (var i = 0; i < pointer.length; i++) {
      peopleStr += userData[pointer[i]].name + " & ";
    }
    peopleStr = peopleStr.slice(0, peopleStr.length -2);
  }
  return `The Captain Popular title is shared by ${peopleStr}with ${numFollower[0]} followers each!`;
};

//Test captPopular
// console.log(captPopular(data));

//Function to see who has the most followers - Only finds first
var captOldPopular = function(userData) {

  var pointer = [0];
  var numFollower = [0];

  for (var i in userData) {

    var tempNumFollower = 0;

    for (var j in userData) {
      if(userData[j].follows.includes(i) && userData[j].age > 30) {
        tempNumFollower++;
      }
    }
    if (tempNumFollower > numFollower[0]) {
      pointer = [];
      numFollower = [];
      pointer.push(i);
      numFollower.push(tempNumFollower);
    } else if (tempNumFollower === numFollower[0]) {
      pointer.push(i);
      numFollower.push(tempNumFollower);
    }
  }

  if (pointer.length === 1) {
    return `${userData[pointer].name} is Captain Popular with ${numFollower} followers!`;
  } else {
    var peopleStr = "";
    for (var i = 0; i < pointer.length; i++) {
      peopleStr += userData[pointer[i]].name + " & ";
    }
    peopleStr = peopleStr.slice(0, peopleStr.length -2);
  }
  return `The Captain Old Popular title is shared by ${peopleStr}with ${numFollower[0]} followers over 30 each!`;
};

//Test captPopular
// console.log(captOldPopular(data));

//Function to see who follows the most people - Only finds the first person
var theOldieStalker = function(userData) {

  var pointer;
  var numFollowed = 0;

  for (var i in userData) {

    var tempNumFollowed = 0;

    for (var j = 0; j < userData[i].follows.length; j++) {
      var tempUser = userData[i].follows[j];
      // console.log(tempUser);
      if (userData[tempUser].age > 30) {
        tempNumFollowed++;
        // console.log(tempNumFollowed);
      }
    }
    if (tempNumFollowed > numFollowed) {
      pointer = i;
      numFollowed = tempNumFollowed;
    }
    // console.log(pointer);
  }
  return `The oldie stalker is ${userData[pointer].name} following ${numFollowed} oldies.`;
};

//Test theStalker
// console.log(theOldieStalker(data));


//Returns an array of objects that contain pairs of people who follow someone
//without being followed back and who that someone is
var aspirationist = function(userData) {

  var creepers = [];

  for (var i in userData) {

    for (var j = 0; j < userData[i].follows.length; j++) {
      var userPointer = userData[i].follows[j];
      if (!userData[userPointer].follows.includes(i)) {
        var tempPair = {
          follower: userData[i].name,
          notFollowing: userData[userPointer].name
        };
        creepers.push(tempPair);
      }
    }
  }
  return creepers;
};

//Test aspirationist
// console.log(aspirationist(data));

//Find user reach
var reachCalculator = function(userData) {

  for (var i in userData) {
    userData[i].followedBy = [];
    userData[i].reach = 0;
  }
  for (var i in userData) {
    for (var j in userData) {
      for (var k = 0; k < userData[j].follows.length; k++) {
        if (userData[j].follows[k] === i) {
          userData[i].followedBy.push(j);
        }
      }
    }
  }
  for (var i in userData) {
    for (var j = 0; j < userData[i].followedBy.length; j++) {
      var userPointer = userData[i].followedBy[j];
      userData[i].reach += userData[userPointer].followedBy.length;
    }
    userData[i].reach += userData[i].followedBy.length;
  }
  var reachString = "";
  for (var i in userData) {
    reachString += `${userData[i].name}\'s reach is ${userData[i].reach}.\n`;
  }
  reachString = reachString.slice(0,reachString.length - 1);
  return reachString;
};

//test reachCalculator
// console.log(reachCalculator(data));