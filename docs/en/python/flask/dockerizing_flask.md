---
title: Dockerizing your flask application
published: true
description: 
tags: python, docker, flask, apache2
---

First we run our flask app into a apache server, so we need to configure apache server. A full tutorial can be checked [here](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps)

#wsgi file

```python
#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/")

from src.run import app as application
```

#App python

```python

import sys
sys.path.insert(0,"/var/www/")

from app.application import ExampleApi

from config import Configuration

cfg = Configuration(debug=False)
app = ExampleApi(cfg)
if __name__ == "__main__":
    app.run(host=cfg.host,port=cfg.port,debug=cfg.debug)
```

#Dockerfile

```dockerfile
FROM ubuntu:12.04

MAINTAINER Andrés Baamonde Lozano

RUN apt-get update && apt-get install -y apache2 libapache2-mod-wsgi python-dev python-pip && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN pip install Flask
#enable mod_wsgi
RUN a2dissite default
RUN a2dissite default-ssl
RUN a2enmod wsgi

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

COPY src /var/www/src

#Creamos el virtual host
COPY resources/docker/app /etc/apache2/sites-available/appflask
RUN chown -R www-data:www-data /var/www/src
RUN chown www-data:www-data /etc/apache2/sites-available/appflask
RUN a2ensite appflask

EXPOSE 80
CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"]
```
You can check full application at my [github](https://github.com/mandrewcito/flask-example-app)