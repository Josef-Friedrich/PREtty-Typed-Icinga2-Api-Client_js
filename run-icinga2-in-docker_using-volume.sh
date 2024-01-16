#! /bin/sh

# https://github.com/Icinga/docker-icinga2

sudo docker volume create icinga-volume

sudo docker run \
	--rm \
	--name icinga-master \
	-v icinga-volume:/data \
	-h icinga-master \
	-p 5665:5665 \
	-e ICINGA_MASTER=1 \
	icinga/icinga2
