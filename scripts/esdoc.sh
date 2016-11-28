
if [ -z "`which esdoc`" ]; then
  echo >&2 "error: Missing esdoc in \$PATH."
  exit 1
fi

if [ -z $1 ] || ! [ -f $1 ] ; then
  echo >&2 "error: Missing path to esdoc.json."
  exit 1
fi

`which esdoc` -c "$1"
