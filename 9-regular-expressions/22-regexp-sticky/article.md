
# Sticky flag "y", searching at position

To grasp the use case of `y` flag, and see how great it is, let's explore a practical use case.

One of common tasks for regexps is "parsing": when we get a text and analyze it for logical components, build a structure.

<<<<<<< HEAD
For instance, there are HTML parsers for browser pages, that turn text into a structured document. There are parsers for programming languages, like Javascript, etc.

Writing parsers is a special area, with its own tools and algorithms, so we don't go deep in there, but there's a very common question: "What is the text at the given position?".
=======
For instance, there are HTML parsers for browser pages, that turn text into a structured document. There are parsers for programming languages, like JavaScript, etc.

Writing parsers is a special area, with its own tools and algorithms, so we don't go deep in there, but there's a very common question in them, and, generally, for text analysis: "What kind of entity is at the given position?".
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

For instance, for a programming language variants can be like:
- Is it a "name" `pattern:\w+`?
- Or is it a number `pattern:\d+`?
- Or an operator `pattern:[+-/*]`?
- (a syntax error if it's not anything in the expected list)

<<<<<<< HEAD
In Javascript, to perform a search starting from a given position, we can use `regexp.exec` with `regexp.lastIndex` property, but that's not we need!

We'd like to check the match exactly at given position, not "starting" from it.
=======
So, we should try to match a couple of regular expressions, and make a decision what's at the given position.

In JavaScript, how can we perform a search starting from a given position? Regular calls start searching from the text start.

We'd like to avoid creating substrings, as this slows down the execution considerably.

One option is to use `regexp.exec` with `regexp.lastIndex` property, but that's not what we need, as this would search the text starting from `lastIndex`, while we only need to text the match *exactly* at the given position.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

Here's a (failing) attempt to use `lastIndex`:

```js run
let str = "(text before) function ...";

// attempting to find function at position 5:
let regexp = /function/g; // must use "g" flag, otherwise lastIndex is ignored
regexp.lastIndex = 5

alert (regexp.exec(str)); // function
```

The match is found, because `regexp.exec` starts to search from the given position and goes on by the text, successfully matching "function" later.

<<<<<<< HEAD
We could work around that by checking if "`regexp.exec(str).index` property is `5`, and if not, ignore the much. But the main problem here is performance.

The regexp engine does a lot of unnecessary work by scanning at further positions. The delays are clearly noticeable if the text is long, because there are many such searches in a parser.

## The "y" flag

So we've came to the problem: how to search for a match, starting exactly at the given position.
=======
We could work around that by checking if "`regexp.exec(str).index` property is `5`, and if not, ignore the match. But the main problem here is performance. The regexp engine does a lot of unnecessary work by scanning at further positions. The delays are clearly noticeable if the text is long, because there are many such searches in a parser.

## The "y" flag

So we've came to the problem: how to search for a match exactly at the given position.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

That's what `y` flag does. It makes the regexp search only at the `lastIndex` position.

Here's an example

```js run
let str = "(text before) function ...";

*!*
let regexp = /function/y;
regexp.lastIndex = 5;
*/!*

alert (regexp.exec(str)); // null (no match, unlike "g" flag!)

*!*
regexp.lastIndex = 14;
*/!*

alert (regexp.exec(str)); // function (match!)
```

As we can see, now the regexp is only matched at the given position.

So what `y` does is truly unique, and very important for writing parsers.

<<<<<<< HEAD
The `y` flag allows to apply a regular expression (or many of them one-by-one) exactly at the given position and when we understand what's there, we can move on -- step by step examining the text.
=======
The `y` flag allows to test a regular expression exactly at the given position and when we understand what's there, we can move on -- step by step examining the text.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

Without the flag the regexp engine always searches till the end of the text, that takes time, especially if the text is large. So our parser would be very slow. The `y` flag is exactly the right thing here.
