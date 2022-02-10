---
title: A tiny python log decorator
published: true
description: A tiny python log decorator 
tags: python, log, decorator, functools
---

This post is only a compilation from others posts that i read for create a log decorator.

Firstly, we need to configure a log properly, an good example can be found [here](https://docs.python.org/3/howto/logging.html)

```python
import logging
logger = logging.getLogger('decorator-log')
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)
```

Once log instance is configured, we create decorator using it.

```python

import functools
class LogDecorator(object):
    def __init__(self):
        self.logger = logging.getLogger('decorator-log')

    def __call__(self, fn):
        @functools.wraps(fn)
        def decorated(*args, **kwargs):
            try:
                self.logger.debug("{0} - {1} - {2}".format(fn.__name__, args, kwargs))
                result = fn(*args, **kwargs)
                self.logger.debug(result)
                return result
            except Exception as ex:
                self.logger.debug("Exception {0}".format(ex))
                raise ex
            return result
        return decorated
```
It's almost done, we need to decorate some functions to test it:

```python
## Start example
@LogDecorator()
def func(a, b, c):
    return a + b + c

@LogDecorator()
def crash(a,b):
    raise ValueError(str(a))

func(1,2,3)

try:
    crash(1,3)
except:
    pass
```
Our output will be:
```
2018-12-04 23:37:44,110 - decorator-log - DEBUG - func - (1, 2, 3) - {}
2018-12-04 23:37:44,110 - decorator-log - DEBUG - 6
2018-12-04 23:37:44,110 - decorator-log - DEBUG - crash - (1, 3) - {}
2018-12-04 23:37:44,110 - decorator-log - DEBUG - Exception 1
```