all: build test

build:
	npm run build

debug:
	node --no-warnings debug.mjs

install_icinga:
	sudo apt install icinga2
	sudo icinga2 feature enable api
	sudo icinga2 api setup

set_test_config:
	sudo rsync -av --delete resources/etc-icinga2/ /etc/icinga2/
	sudo chown -R nagios:nagios /etc/icinga2/
	sudo systemctl restart icinga2.service
	sudo icinga2 daemon -C

get_test_config:
	sudo rsync -av --delete /etc/icinga2/ resources/etc-icinga2/
	sudo chown -R jf:jf resources/etc-icinga2

docker_start:
	sudo chmod -R 777 ./resources/etc-icinga2
	sudo docker run \
		--name icinga-master \
		--volume ./resources/etc-icinga2:/data/etc/icinga2 \
		--hostname icinga-master \
		--publish 5665:5665 \
		--env ICINGA_MASTER=1 \
		--detach \
		icinga/icinga2
	sleep 5
	sudo docker logs icinga-master

docker_stop:
	-sudo docker stop icinga-master
	-sudo docker rm icinga-master

patch_config:
	sudo cp /etc/icinga2-api-client.json /etc/icinga2-api-client.json.bak
	sudo cp resources/icinga2-api-client.json /etc/icinga2-api-client.json

test_run:
	npm run test

test: stop_docker_container start_docker_container test_run stop_docker_container

process_docs:
	./resources/process-docs.mjs

doc: process_docs
	npm run doc
