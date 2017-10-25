# What is Programming

For this session we are going to start with the basics. I want to get a base foundation of thinking and terminology that we can build on. If this isn't new to you, you can read ahead and blitz through, maybe help out someone that is having a hard time. If this is new to you, you don't have to 'get' everything immediately. This shit is hard, it's like learning a brand new language, it takes time and practice. In future session we'll be exploring more advanced topics, and you'll be directing what we cover.


Programming or writing code, is simply writing out instructions for a machine to follow. A really great analogy for getting your head around it is to think of programming like writing out cooking recipes. Each recipe has a series of ingredients, detailed list of steps, and produces a delicious outcome.

Programming is all about Data and the Flow of that Data.

*Data* are things like, a list of students in a class with names, ids, and averages or a list of your favourite songs and information about them, or a list of all of your friends and how they should be paired for a secret santa.

*Flow* is taking that data and doing things like, getting the student ids for the top three students in class, or making a playlist that's exactly 50min for a run, or finding the optimal pairings of people for a secret santa so everyone is happy.


First we'll learn how to structure that data.



## Variables
Variables are ways to store named values. Think of them like a bucket with a name-tag on them. They are defined like so:

```js
var a = 6;

a = 7;

var helloMessage = 'Why hello there';
```

The format is `var [name of variable] = [value]`. There are two main types of variables: 'atomic' and 'collection' types.


### Atomic Types
Atomic variables are the simplest kind of variable. They hold a basic value. They come in 4 flavours.

##### Numbers
```js
var accuracy = 0.98;

var numberOfPlayers = 6;

var newPlayerCount = numberOfPlayers + 3;
```

Numbers are just that, numbers. You have your basic math operations with them, `+, -, *, /`.


##### Strings
```js
var name = 'Scott ' + 'Tolksdorf';

var greeting = 'Hello, ' + name;
```
Strings are just text. There are always wrapped in quotes, or the program would confused what is code and what is a message. Strings can be added (aka concatenated) together.


##### Booleans
```js
var isInactive = true;
var hasPermission = false;
var isAdmin = false;

var canVote = (!isInactive && hasPermission) || isAdmin;

if(canVote == true) vote();
```
Can either be `true` or `false`. Useful to represent statuses. The two main operations with them are `AND` (`&&`), `OR` (`||`), `NOT` (`!`) and `COMPARE` (`==`).


##### Null (or nil, or undefined)
```js
var nothing;

console.log(nothing);
```
This just represents 'nothing'. Used for when a variable has been deleted or never defined with a value.




### Collections
Collections _collect_ multiple values into a group. They come in two flavours:

##### Arrays (lists)
```js
var scores = [34, 17, 67, 56];

var friends = ['katie', 'rebaybay'];

friends.push('nikki');
```
Arrays are a _list_ of values where order is important or the values can't be named. A sequence of steps, or a list of recorded scores.

Arrays can be added to `friends.push('erin')`, referenced by 'index' `friends[0]`, get the size of `friends.length`.

```js
//For example: Calculating the total score
var totalScore = scores[0] + scores[1] + scores[2] + scores[3];
```

##### Objects (maps)
```js
var song = {
    title : 'Shake It Off',
    artist : 'TayTay Swifty',
    duration : 242,
    playCount : 2307,
    isFav : true
};

var numMinutes = song.duration / 60;
```
Objects are a way of storing information that's named, but have no order. Instead of accessing that value by using an index, we use its name. This is used for storing _properties_ about a concept, like a user or a song.

```js
//Increment the playcount
song.playCount = song.playCount + 1;
```

### Putting it together: Nesting Collections
So collections variables can group values together, however you may have noticed that collections _themselves_ are values, meaning we can put collections within collections! Let's try replicate our examples from the intro.

```js
var students = [
    {
        id : 12768795,
        name : 'Scott Tolksdorf',
        avg : 85.3
    },
    {
        id : 12748305,
        name : 'Katie McCann',
        avg : 97.4
    }
];

var secretSanta = {
    rebecca : {
        friends : ['scott', 'katie'],
        spouse : 'dave',
        matchedWithLastYear : 'simon',
        enemies : []
    },
    //...
};
secretSanta.rebecca.friends[1]; //'katie'
```

Figuring out how to represent your data in programming is very difficult and you may not get it right the first time. Sometimes it changes depending on what you are doing with that data.


### Functions

_To be continued..._






## Data Flow

#### Conditionals

#### Map

#### Reduce

#### Sort

### Examples
