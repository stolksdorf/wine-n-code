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

The format is `var [name of variable] = [value]`. You can change what's stored in the bucket as many times as you like. There are two main types of variables: 'atomic' and 'collection' types.


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

##### Objects (dictionaries)
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

### Bonus! Nesting Collections
So collections variables can group values together, however you may have noticed that collections _themselves_ are values, meaning we can put collections within collections! Let's try replicate our examples from the intro.

```js
var students = [
    {
        id : 12768795,
        name : 'Scott Tolksdorf',
        email : 'scott.tolksdorf@gmail.com',
        avg : 85.3
    },
    {
        id : 12748305,
        name : 'Katie McCann',
        email : 'kt.da.realest@coolgirlz.biz',
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
Functions are stored chunks of code that can be run. Functions take inputs (aka parameters or arguments), and they return a value. Functions can also be stored into variables.

```js
var sum = (numberOne, numberTwo)=>{
    var result = numberOne + numberTwo;
    return result;
}

var seven = sum(3, 4);
```

In this example we have a function that takes two inputs, adds them together, and then returns the result. We can now use this `sum` function many times throughout our project!

Functions are incredibly powerful and the cornerstone of programming. A good analogy for them is recipe cards. Every recipe has a list of ingredients (inputs), series of steps (the code in the function), and a delicious result (the return value).


### Bonus! Nesting Functions
Functions get real powerful when you call other functions from inside them.

_to be continued..._





## Data Flow
Now that we know how to structure our data, we now want to actually _do things_ with it. The following concepts take data and change it or come to conclusions about it in some way.

#### Conditionals


#### Map
Given a collection of values and a function, `map` will "apply" that function to each value, and return a new collection with those results, _whew_. Let's see it in action.

```js
var double = (number)=>{
    return number * 2;
};

var numbers = [1,2,3,4];

var doubledNumbers = numbers.map(double);
```

What's happening here is that map is looking at each value in the array, eg. `2`, taking it and putting it through the `double` function. Taking the result (`4`), and adding it to a brand new array. When it's done, it will return back the new array.

```
   List      double(n)       Result
[
    1  -->   double(1)   -->  2
    2  -->   double(2)   -->  4
    3  -->   double(3)   -->  6
    4  -->   double(4)   -->  8
]
```

Map is useful when the result you want is always the same size as the starting list. So it's great if given a list of student information you just want everyone's first name, but it wouldn't be useful for getting your favourite songs from a list.

```js
var listOfStudents = [
    {
        id : 12768795,
        name : 'Scott Tolksdorf',
        email : 'scott.tolksdorf@gmail.com',
        avg : 85.3
    },
    {
        id : 12748305,
        name : 'Katie McCann',
        email : 'kt.da.realest@coolgirlz.biz',
        avg : 97.4
    }
];

var getStudentEmails = (students)=>{
    var getEmailFromStudent = (student)=>{
        return student.email;
    }
    return students.map(getEmailFromStudent)
};

var studentEmails = getStudentEmails(listOfStudents);
```

#### Reduce


#### Sort

### Examples
