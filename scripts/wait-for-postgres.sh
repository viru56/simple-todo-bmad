#!/bin/sh
set -e

HOST="$1"
PORT="$2"
MAX_RETRIES=30
RETRY_INTERVAL=2

echo "Waiting for PostgreSQL at $HOST:$PORT..."

retries=0
until pg_isready -h "$HOST" -p "$PORT" -q 2>/dev/null; do
  retries=$((retries + 1))
  if [ "$retries" -ge "$MAX_RETRIES" ]; then
    echo "ERROR: PostgreSQL did not become ready after $MAX_RETRIES retries"
    exit 1
  fi
  echo "PostgreSQL not ready (attempt $retries/$MAX_RETRIES), retrying in ${RETRY_INTERVAL}s..."
  sleep "$RETRY_INTERVAL"
done

echo "PostgreSQL is ready!"
