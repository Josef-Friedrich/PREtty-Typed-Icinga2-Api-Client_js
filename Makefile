all: build debug

build:
	npm run build

debug:
	node --no-warnings debug.mjs

set_test_config:
	sudo rsync -av --delete resources/etc-icinga2/ /etc/icinga2/
	sudo chown -R nagios:nagios resources/etc-icinga2
	
get_test_config:
	sudo rsync -av --delete /etc/icinga2/ resources/etc-icinga2/
	sudo chown -R jf:jf resources/etc-icinga2