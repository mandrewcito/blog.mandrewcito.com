---
title: Nested json to python object 
published: true
description: 
tags: json, python, nested, object
---

Today i was creating a configuration file, in the past, i accessed configuration as a dictionary, but this time, i think about changing that. The follwing code creates dynamic attributes with the objects keys recursively.

But first, i'll show the json object:

```json
{
  "key": "value",
  "list": [
    "a",
    "b",
    "c",
    1,
    {
      "key": 1
    }
  ],
  "object": {
    "key": {
      "key": 1
    }
  }
}

```

On the conversion we have 3 cases:
 - lists
 - dicts (new object)
 - bool, int, float and str


```python
import json

class AppConfiguration(object):
    def __init__(self, data=None):
        if data is None:
            with open("cfg.json") as fh:
                data = json.loads(fh.read())
        else:
            data = dict(data)

        for key, val in data.items():
            setattr(self, key, self.compute_attr_value(val))

    def compute_attr_value(self, value):
        if type(value) is list:
            return [self.compute_attr_value(x) for x in value]
        elif type(value) is dict:
            return AppConfiguration(value)
        else:
            return value
```

Now the key, value pairs are attributes - objects.

```python
instance = AppConfiguration()
>>>instance.key
'value'

>>>instance.list[4].key
1

>>> instance.object.key.key
1
```


