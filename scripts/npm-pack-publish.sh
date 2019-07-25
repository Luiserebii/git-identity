#!/bin/bash

# Grab the root node project's directory, relative to the script file
NPMROOTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/../

# Make temporary directory, hold returned filepath
TEMPDIR="$(mktemp -d)"

# Setup a trap to clear tempdir and execute on EXIT
trap "rm -rf $TEMPDIR" EXIT

# Change directory into project's dir
cd $NPMROOTDIR

# Copy necessary files over
cp -r package.json README.md LICENSE .npmignore dist/* $TEMPDIR

# Change directory into temporary directory
cd $TEMPDIR

# Execute - based on flag, either pack, or publish
if [ "$1" == "--pack" ]; then
  npm pack

  # move packed thing
  mv git-identity*.tgz $NPMROOTDIR

elif [ "$1" == "--publish" ]; then
  npm publish
else
  printf "\nHello friend!\nPlease pass one of the following flags:\n\n--pack   npm pack - preview package before publishing, .tgz is moved to project's root directory\n--publish   npm publish - publish the package\n\n\n"
fi

# Cleanup temporary directory
rm -rf $TEMPDIR
