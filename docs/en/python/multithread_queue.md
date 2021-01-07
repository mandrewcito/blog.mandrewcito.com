---
title: Multithread queue
published: true
description: In this example, I detail the implementation of a process queue with its respective parameters.
tags: python, queue, threading
---

This implementation details a queue of functions, it will be executed depending of the number of threads if number of threads is one, it be a queue of executions. 

## Implementation

```python
import queue
import threading

class Process(object):
    def _get_function(self):
        return self.__function

    def _set_function(self, value):
        if not callable(value):
            raise TypeError("function must be callable")
        self.__function = value
    __function = None
    function = property(_get_function, _set_function)

    def _get_params(self):
        return self.__params

    def _set_params(self, value):
        if type(value) is not list:
            raise TypeError("params must be a list of parameters")
        self.__params = value
    __params = None
    params = property(_get_params, _set_params)

    def __repr__(self):
        return str(self.params) + str(self.function)

class MultithreadQueue(object):
    def __init__(self, thread_number=10, callback_insert=None, callback_get=None):
        self._queue = queue.Queue()
        self.threads = []
        self._cb_insert = callback_insert
        self._cb_get = callback_get
        for i in range(thread_number):
            t = threading.Thread(target=self.run)
            t.start()
            self.threads.append(t)

    def append(self, function, params):
        p = Process()
        p.function = function
        p.params = params
        self._queue.put(p)

    def run(self):
        while True:
            element = self._queue.get(block=True)
            element.function(*element.params)
```

## Example
```python
queue = MultithreadQueue()
for i in range(1,10):
    queue.append(print,[1,2])
```