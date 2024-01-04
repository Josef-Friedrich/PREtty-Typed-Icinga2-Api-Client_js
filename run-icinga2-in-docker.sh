#! /bin/sh

sudo docker run \
	--rm \
	--name icinga-master \
	-h icinga-master \
	-p 5665:5665 \
	-e ICINGA_MASTER=1 \
	--volume ./resources/etc/icinga2:/etc/icinga2 \
	icinga/icinga2
