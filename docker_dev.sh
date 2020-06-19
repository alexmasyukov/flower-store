#!/bin/bash

services=(
    bot-viber-dev
    app-dev
    cms-dev
    api-dev
    nginx-dev
    postgres-dev
)

images=(
    alexmasyukov/klumba_app:latest
    alexmasyukov/klumba_api:latest
    alexmasyukov/klumba_cms:latest
    alexmasyukov/klumba_viber_bot
    klumba_bot-viber-dev
    klumba_app-dev
    klumba_cms-dev
    klumba_api-dev
    klumba_bot-viber-dev
)

clearDockerLog(){
    dockerLogFile=$(docker inspect $1 | grep -G '\"LogPath\": \"*\"' | sed -e 's/.*\"LogPath\": \"//g' | sed -e 's/\",//g')
    rmCommand="rm $dockerLogFile"
    screen -d -m -S dockerlogdelete ~/Library/Containers/com.docker.docker/Data/vms/0/tty
    screen -S dockerlogdelete -p 0 -X stuff $"$rmCommand"
    screen -S dockerlogdelete -p 0 -X stuff $'\n'
    screen -S dockerlogdelete -X quit
}

read -p "Run docker system prune? " yn
    case $yn in
        [Yy]* ) docker system prune ;;
    esac


read -p "Remove volumes? " yn
    case $yn in
        [Yy]*) docker volume rm $(docker volume ls -qf dangling=true) ;;
    esac


read -p "Clear logs? " yn
    case $yn in
        [Yy]*)
            for srv in ${services[@]}; do
                 clearDockerLog ${srv}
                 # docker run -it --rm --privileged --pid=host ${srv} nsenter -t 1 -m -u -n -i -- sh -c 'truncate -s0 /var/lib/docker/containers/*/*-json.log'
            done
        ;;
    esac

read -p "Remove images? " yn
    case $yn in
        [Yy]*)
            for img in ${images[@]}; do
                 ff=$(docker images ${img} -q)
                 echo " "
                 read -p "Remove ${img} ?" rimg
                    case $rimg in
                        [Yy]* ) docker rmi -f $ff; # break ;;
                    esac
            done
        esac

echo ' '
echo '### IMAGES ###'
docker images
