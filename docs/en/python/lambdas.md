---
title: Lambda expressions
published: true
description: Lambda expressions a tutorial
tags: python, lambda, tutorial
---

The principal purpouse of this operator is declare anonymous functions(throw-away functions).

## General syntax

argument list : expression

## Examples

A typical example of lambda expressions is the use of arithmetic expressions but this operator can be used in a lot of situations


```python
f = lambda x, y: x + y
f(1,2)
# outPut : 3
```
```python
f = lambda x: x[0]
f([2,3,4,5,6,7])
# outPut : 2
```
```python
f = lambda x, y: x if x < y else y
f(1,2)
# outPut : 2
```
You can do a fast implement of tiny usefull functions, like len():

```python
size = lambda x : 1 + size(x[1:]) if x != [] else 0
size([1,2,3])
# outPut : 3
```
By itself, lambda operator is very useful, but we can seriously take advantage of it combining it with list/dict comprehension, maps, reduces and filters. In that case we will see the real power of this operator.