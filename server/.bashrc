# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

export DB_HOST=postgres
export DB_PORT=5432
export DB_USER=db
export DB_PASSWORD=12345
export DB_NAME=klumba

export DB_HOST_DEV=postgres-dev
export DB_PORT_DEV=5432
export DB_USER_DEV=db
export DB_PASSWORD_DEV=12345
export DB_NAME_DEV=klumba