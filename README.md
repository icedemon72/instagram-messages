# instagram-messages

This is a simple npm package for extracting instagram messages. To actually get your JSON file (`messages.json`) from instagram, you'll need to download
your data, to do so, just click here and login https://www.instagram.com/download/request/

The main goal of this package is actually just writing a (.txt) file with your messages.

# Installation

```js
const ig = require('instagram-messsages')
const json = require('./path-to-your-json-file.json') 
// You'll need json file in order to actually do something with this npm package
```

# How to use it

## .getChats()

Before you start, just `console.log()` this in order to see your chats

```js
ig.getChats(); 
// => result is a multi-dimensional array with your chats, e.g. [["nicolas.cage", "johnny.depp"], ["johnny.depp", "monica.bellucci"]]
```
## .getSortedMessages(jsonFile, [chat])

You can use this to write a .txt file
```js
const ig = require('instagram-messsages')
const fs = require('fs')
const json = require('./path-to-your-json-file.json') 

fs.writeFile("Text.txt", ig.getSortedMessages(json, ["nicolas.cage", "johnny.depp"]).join("\n"), function () {});
/*
The result will be something like this:
<09/12/2018 10:12:23> johnny.depp: hey
<09/12/2018 10:13:20> nicolas.cage: ?
<DD/MM/YYYY HH:MM:SS> instagram.username: message
etc.
*/
```

## .getMessagesFrom(jsonFile, [chat], [author(s)])

On this way you can get messages just from a certain user or from more users (if you are in a group chat)

```js
ig.getMessagesFrom(json, ["nicolas.cage", "johnny.depp"], ["johnny.depp"]);
```

## .getMessageObject(jsonFile, [chat])

This is useful if you are going to do something with data

```js
ig.getMessageObject(json, ["nicolas.cage", "johnny.depp"]);
```

## .getMessagesObjectFrom(jsonFile, [chat], [author(s)])

Same as `.getMessagesFrom()` but it returns an array with objects

```js
ig.getMessagesObjectFrom(json, ["nicolas.cage", "johnny.depp", "monica.bellucci"], ["monica.bellucci", "johnny.depp"]);
```

## .getNumberOfMessages(jsonFile, [chat], [author(s)])

With this you can get the number of messages from a certain user or from more users.

```js
ig.getNumberOfMessages(json, ["nicolas.cage", "johnny.depp", "monica.bellucci"], ["johnny.depp"]);
```

# FAQ

**Why is this so badly done?**
>Because this is my first npm package

**What are "jsonFile, [chat]", etc.?**
> `jsonFile`    -> your data from instagram  

> `[chat]`      -> it is an array with usernames

> `[author(s)]` -> this is an array of authors (of the messages sent) you'd like to keep

**Are there any bugs?**

> I absolutely have no idea.
