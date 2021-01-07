---
title: List/Dict comprehension 
published: true
description: 
tags: python, comprehension, dict, list
---
List/Dict comprehension is a simple way to create lists and dicts with a bunch of values that we need. For really take advantage of this operator we must combine it with lambda operator, but first ,we will see simple examples.

```python

[x * 2 for x in range(3)]
# output: [0, 2, 4]

{chr(65+x) : x for x in range(3)}
# output: {'A': 0, 'C': 2, 'B': 1}
```

Now we will combine both operators:

```python
serie = [x for x in range(20)]
f = lambda x: chr(x + 66) if x % 2 == 0 else chr(x + 65)
[f(x) for x in serie]
# output: ['B', 'B', 'D', 'D', 'F', 'F', 'H', 'H', 'J', 'J', 'L', 'L', 'N', 'N', 'P', 'P', 'R', 'R', 'T', 'T']
```