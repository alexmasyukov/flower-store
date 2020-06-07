#!/bin/bash

services=(app api nginx tbot)
images=(alexmasyukov/klumba_app:latest alexmasyukov/klumba_api:latest
alexmasyukov/klumba_tbot:latest)
# alexmasyukov/klumba_cms:latest

echo
echo "### Stop services ..."
docker-compose -f docker-compose.yml stop "${services[@]}"
echo "### Done ###";echo


echo "### Remove images..."
for img in ${images[@]}; do
    ff=$(docker images ${img} -q)
    docker rmi -f $ff
    # for f in $ff
    #     do
    #         echo "### Remove '${img}'"
    #         echo "${f}"
    #
    #     done
done
echo "### Done ###";echo


read -t 5 -p "I am going to wait for 5 seconds only ..." ;echo


# echo wordpress redis ubuntu postgres | xargs -P10 -n1 docker pull
echo "### Pulling images..."
for img in ${images[@]}; do
   docker pull $img
done
echo "### Done ###";echo


echo "### Start services ..."
docker-compose -f docker-compose.yml up -d --remove-orphans "${services[@]}"
echo