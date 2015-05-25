#!/bin/bash

rootdir=$(dirname $(dirname $BASH_SOURCE))
coffee $rootdir/bin/script.coffee
