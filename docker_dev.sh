#!/bin/bash

services=(app api)
images=(alexmasyukov/klumba_app:latest alexmasyukov/klumba_api:latest)

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


echo "### Build new images..."
for srv in ${services[@]}; do
    docker-compose -f docker-compose.build.yml build --no-cache ${srv}
done
echo "### Done ###";echo


# echo wordpress redis ubuntu postgres | xargs -P10 -n1 docker pull
echo "### Pushing images..."
for img in ${images[@]}; do
   docker push $img
done
echo "### Done ###";echo