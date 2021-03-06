
# cluster-log

  Remote logging plugin for [Cluster](http://learnboost.github.com/cluster),
  backed by Redis and Express.

## Installation

    $ npm install cluster-log

## Usage

 Launch redis:
 
     $ redis-server

 Simply require the plugin, and invoke it with the options mentioned below
 if desired, followed by an optional `port` / `host`, defaulting to port `9999`.

    cluster(server)
      .use(require('cluster-log')({ max: 100 }, 8888))

## Options

  - `max`  maximum number of entries [2000]
  - `title`  page title ["Cluster Logs"]
  - `user`  basic-auth username
  - `pass`  basic-auth password
  - `tls`  TLS options

## Example

    var cluster = require('cluster')
      , remoteLogger = require('cluster-log')
      , http = require('http');

    var server = http.createServer(function(req, res){
      if (Math.random() > 0.9) throw new Error('omgz!'); 
      res.end('Hello World');
    });

    cluster = cluster(server)
      .use(cluster.debug())
      .use(remoteLogger())
      .listen(3000);

## Custom Events

  The `cluster` variable below is what is returned from `cluster(server)`, which is an __instanceof__ `cluster.Master`. Passing this variable around within modules, or choosing to have a global is up to you.

  To notify cluster-log of custom events, we can simply invoke `master.log(type, data)` within a worker. For example say we want
  to log when a user authenticates:
  
      cluster.log('login', user.name);

  By default cluster-log can only report on uncaughtExceptions, meaning only exceptions that bring down a worker. This is usually a rare case, so this same technique can be applied within an error handler for say connect or express:
  
      app.error(function(err, req, res, next){
        cluster.log(err);
        console.error(err.stack || err.message);
        res.send(500);
      });

## Screenshot

![Logger Screenshot](http://f.cl.ly/items/3G0q032n0a2Z1i2r0K12/Screenshot.png)

## License 

(The MIT License)

Copyright (c) 2011 LearnBoost &lt;dev@learnboost.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.