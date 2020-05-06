# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

export DB_HOST=postgres-dev
export DB_PORT=5432
export DB_USER=db
export DB_PASSWORD=12345
export DB_NAME=klumba