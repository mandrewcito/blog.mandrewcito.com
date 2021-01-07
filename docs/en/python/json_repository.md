---
title: Creating a json repository
published: true
description: Creating a json repository from scratch
tags: json, python, repository
---

# Intro

A few days ago , i start refactoring and reimplementing a tiny json repository that i create at work,  the main reason was provide a fast implementation without database and store a few objects.

I think that the implementation could be improvable, but it works, and for a first aproach, it was valid, on the next months i will continue working on it.

The implementation is quite simple, there is a repository that uses a context to store data, there is a example of use at the end of the post and on following posts i will detail another ways of use.

# Context

```python
import os
import json 
import uuid
import threading
from ..errors.entity_not_found import EntityNotFound

class JsonContext(object):
  def __init__(self, enity_name, filepath="./", key_field="id", key_generate_func=lambda: str(uuid.uuid4())):
    self.file_path = os.path.join(filepath, "{0}s.json".format(enity_name))
    self.entity_name = enity_name
    self.session_values = []
    if not os.path.exists(self.file_path):
      self.commit()      
    self.key_field = key_field
    self.key_generate_func = key_generate_func
    self.lock = threading.Lock()
    
  def open(self):
    self.lock.acquire()
    with open(self.file_path) as f:
      data = json.load(f)
      self.session_values = data["values"]

  def close(self):
    self.lock.release()
    
  def __enter__(self):
    self.open()
    return self

  def __exit__(self, exc_type, exc_val, exc_tb):
    self.close()

  def exists(self, identifier):
    matches = list(filter(
        lambda x: x[self.key_field] == identifier,
      self.session_values))
    return len(matches) > 0

  def add(self, entity):
    if (self.key_field in entity and self.exists(entity[self.key_field])):
      self.delete(entity)
    else:
      entity[self.key_field] = self.key_generate_func()
    
    self.session_values.append(entity)
    return entity
  
  def delete(self, entity):
    self.session_values = list(filter(
      lambda x: x[self.key_field] != entity[self.key_field],
      self.session_values))

  def commit(self):
      with open(self.file_path, 'w+') as f:
        f.write(json.dumps({"name": self.entity_name, "values" : self.session_values}))

  def find(self, query_function):
    return list(filter(query_function, self.session_values))

  def get(self, identifier):
    if not self.exists(identifier):
      raise EntityNotFound("identifier not found")
    return self.find(lambda x: x[self.key_field] == identifier)[0]
  
  def get_all(self):
    return self.session_values
```

# Repository

```python
from ..context.json_context import JsonContext

class BaseJsonRepository(object):
  def __init__(self, entity_name, filepath="./"):
    self.context = JsonContext(entity_name, filepath=filepath)

  def __enter__(self):
    self.context.open()
    return self

  def __exit__(self, exc_type, exc_val, exc_tb):
    self.context.close()

  def insert(self, entity):
    return self.context.add(entity)

  def update(self, entity):
    return self.context.add(entity)

  def delete(self, entity):
    self.context.delete(entity)

  def get_all(self):
    return self.context.get_all()

  def get(self, identifier):
    return self.context.get(identifier)

  def find(self, function):
    return self.context.find(function)
```

# Example

Examples... take a look to [tests](https://github.com/mandrewcito/json_repository/blob/master/test/sample/foobar_test.py) :)
```python
from json_repository.repositories.base_json_repository import BaseJsonRepository
from json_repository.errors.entity_not_found import EntityNotFound

class FoobarRepository(BaseJsonRepository):
  def __init__(self):
    super(FoobarRepository, self).__init__("foo")


with FoobarRepository() as repo:
    value = repo.insert({
        "foo": "a foo value",
        "bar":" a bar value"
        })
    repo.context.commit()

```

# Links

[Github](https://github.com/mandrewcito/json_repository)
[Pypi](https://pypi.org/project/json-repository/)


Any feedback about this 'toy' is welcomed, leave a comment below :).