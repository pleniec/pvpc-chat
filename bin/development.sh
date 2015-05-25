#!/bin/bash

rootdir=$(dirname $(dirname $BASH_SOURCE))
$rootdir/node_modules/.bin/nodemon -x "$rootdir/node_modules/.bin/coffee" $rootdir/bin/script.coffee
