#!/usr/bin/env bash
set -euxo pipefail

if ! grep -q x-tub-goat /usr/local/apache2/conf/httpd.conf; then
    tubgoats=$(printf 'tubgoat-%.0s' {1..10000})
    header='Header add x-tub-goat "'$tubgoats'"'
    match='<Directory\ "/usr/local/apache2/htdocs">'
    instruction=$(printf 's@%s@&\\n\\t%s@' "$match" "$header")
    sed -e "$instruction" -i /usr/local/apache2/conf/httpd.conf
fi