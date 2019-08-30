#!/bin/bash

# Grab the root node project's directory, relative to the script file
NPMROOTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/../

# Generate docs
npx typedoc --out docs src

# Create .nojekyll file within docs
echo " #  File for ensuring GitHub does not process the doc pages as Jekyll; for more info, see this path of breadcrumbs:
 #
 #  * https://github.com/TypeStrong/typedoc/issues/620
 #  * https://github.com/TypeStrong/typedoc/issues/149
 #  * https://help.github.com/en/articles/files-that-start-with-an-underscore-are-missing
 " > $NPMROOTDIR/docs/.nojekyll
