#!/bin/bash
# param url
url=$1
curl -X POST -H "Content-Type: application/json" -d '{"id":"1234567"}' $url
