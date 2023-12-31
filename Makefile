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

patch_config:
	sudo cp /etc/icinga2-api-client.json /etc/icinga2-api-client.json.bak
	sudo cp resources/icinga2-api-client.json /etc/icinga2-api-client.json

test: set_test_config
	npm run test

process_docs:
	./resources/process-docs.mjs

doc:
	npm run doc