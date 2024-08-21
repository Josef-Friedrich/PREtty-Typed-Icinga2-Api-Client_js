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
		--rm \
		--detach \
		icinga/icinga2
	sleep 1
	sudo docker logs icinga-master

docker_stop:
	-sudo docker stop icinga-master
	-sudo docker rm icinga-master

docker_login:
	sudo docker exec -it icinga-master /bin/bash

docker_create_api_certs:
	# https://icinga.com/blog/2022/11/16/authenticating-icinga-2-api-users-with-tls-client-certificates/

	sudo docker exec icinga-master /usr/sbin/icinga2 pki new-cert \
		--cn my-api-client \
		--key /data/my-api-client.key.pem \
		--csr /data/my-api-client.csr.pem

	sudo docker exec icinga-master /usr/sbin/icinga2 pki sign-csr \
		--csr /data/my-api-client.csr.pem \
		--cert /data/my-api-client.cert.pem

	sudo docker cp icinga-master:/var/lib/icinga2/certs/ca.crt .
	sudo docker cp icinga-master:/data/my-api-client.cert.pem .
	sudo docker cp icinga-master:/data/my-api-client.key.pem .

	sudo chown jf:jf ca.crt
	sudo chown jf:jf my-api-client.cert.pem
	sudo chown jf:jf my-api-client.key.pem

	curl \
		--cacert ca.crt \
		--cert my-api-client.cert.pem \
		--key my-api-client.key.pem \
		--header 'Accept: application/json' \
		--insecure \
		'https://localhost:5665/v1/?pretty=1'

patch_config:
	sudo cp /etc/icinga2-api-client.json /etc/icinga2-api-client.json.bak
	sudo cp resources/icinga2-api-client.json /etc/icinga2-api-client.json

test_run:
	npm run test

test: docker_stop docker_start test_run docker_stop

process_docs:
	./resources/process-docs.mjs

doc: process_docs
	npm run doc
