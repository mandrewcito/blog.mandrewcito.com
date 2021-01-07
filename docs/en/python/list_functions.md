---
title: Map, reduce and all these stuff
published: true 
description: A couple of examples of Map, reduce, filter operations
tags: python, lists, operations, introduction
---

Continuing with a functional approach of python we take a look to the List functions. we will provide a little example for each one of this functions. This functions  are map, reduce and filter.
## Map

Map applies a function to each one of the elements of a sequence

```python
secuence = list(range(0,10))
# secuence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
f = lambda x: x + 1
map(f, secuence)
# result [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

 
## Filter
Filter reduces a secuence depending of a boolean function

```python
secuence = list(range(0, 10))
# secuence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
f = lambda x: x % 2 == 0
filter(f, secuence)
#result = [0, 2, 4, 6, 8]
```

##Reduce
Reduce,  is a operation that "reduces a list"  apliying an operator

```python
from functools import reduce
secuence = list(range(0, 10))
# secuence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
f = lambda x, y: x + y
reduce(f,secuence)
# result = 45
# Using initial value, thanks to @magicleon94
reduce(f,secuence, 10)
# result = 55

```