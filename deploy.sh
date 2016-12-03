#!/bin/bash
rm -rf dist && ng build --prod --aot && node_modules/.bin/gh-pages -d dist
