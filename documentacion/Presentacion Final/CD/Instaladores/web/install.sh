#!/bin/bash 

# Jarvis web installer script

while getopts d:p:t:i: option
do
case "${option}"
in
p) WEB_SERVER=${OPTARG};;
esac
done


JARVIS_WEB=$WEB_SERVER/jarvis

if [ -z $WEB_SERVER ]
then
    echo 'Invalid parameter, please try again ./install.sh -p web_server_path'
else
    if [ -d $WEB_SERVER ]
    then
        echo 'Invalid path, directory not found'
    else
        sudo mkdir $JARVIS_WEB
        sudo cp -r app/* $JARVIS_WEB
    fi
fi

#End Script
