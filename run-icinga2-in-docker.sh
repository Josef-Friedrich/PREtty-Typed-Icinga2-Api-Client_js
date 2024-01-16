#! /bin/sh

# https://github.com/Icinga/docker-icinga2

sudo docker run \
	--rm \
	--name icinga-master \
	-v ./resources/etc-icinga2:/data/etc/icinga2 \
	-h icinga-master \
	-p 5665:5665 \
	-e ICINGA_MASTER=1 \
	icinga/icinga2
