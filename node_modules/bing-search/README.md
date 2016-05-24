bing-search
===========

NodeJs module to search content with Bing

# Installation

```
npm install bing-search
```

# Usage

Import the module and create a new instance specifying user and password provided by Bing

```
var BingSearch=require('bing-search');

var bing=new BingSearch({
    user: '...',
    password: '...'
})

```

Search content

```
bing.search({
    query: 'query'
}).then(function(res){
    // res is a json object, containing 2 fields:
    // * results: (the array of results)
    // * __next: the url to the next page
}, function(err){ })
```

# Notes

* now it supports only images search. So the result returned by the method `search()` are images.
