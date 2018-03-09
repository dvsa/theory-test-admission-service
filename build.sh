#!/usr/bin/env bash

declare DELETE_NODE_MODULES=false # by default

while getopts ":d" opt; do
  case ${opt} in
    d )
      DELETE_NODE_MODULES=true
      ;;
    \? ) echo "Usage: ./build.sh [-d]" ; exit 1
      ;;
  esac
done

declare NVM="~/.nvm/nvm.sh"
declare NODE_VERSION="v6.10.3"
if [ -f ${NVM} ] ; then
    . ${NVM}
    nvm use ${NODE_VERSION}
    if [ $? -ne 0 ] ; then
        echo "Failed to set node version ${NODE_VERSION} with nvm!"
        exit 1
    fi
fi

echo "Building theory-test-admission-service"
echo
echo "node version: $(node -v)"
echo "npm version:  v$(npm -v)"
echo


declare -a PROJECTS=(
    "logger"
    "compare-image-to-image-collection"
    "compare-video-to-image"
    "compare-video-to-image-collection"
    "get-booking"
    "get-entitlements-from-dvla"
    "theory-test-check-candidate-booking"
    "theory-test-check-candidate-entitlements"
    "theory-test-complete-admission"
    "theory-test-detect-impersonator"
    "theory-test-fetch-candidate-image"
    "theory-test-recognise-candidate"
    "theory-test-start-admission"
)

for PROJECT in "${PROJECTS[@]}"
do
    echo "Building ${PROJECT}"
    pushd ${PROJECT} > /dev/null
    if [ "${DELETE_NODE_MODULES}" = true ] ; then
        echo "Deleting node_modules"
        rm -fr node_modules
    fi
    npm install && npm run default
    declare -i RESULT=$?
    popd > /dev/null
    if [ ${RESULT} -ne 0 ]
    then
        echo
        echo "Error building ${PROJECT}!" > /dev/stderr
        exit ${RESULT}
    fi
    echo
done

# TODO user interface projects should be built in the same way

declare -a PROJECTS=(
    "theory-test-admission-candidate-app"
    "theory-test-admission-reception-app"
)

for PROJECT in "${PROJECTS[@]}"
do
    echo "Building ${PROJECT}"
    pushd ${PROJECT} > /dev/null
    if [ "${DELETE_NODE_MODULES}" = true ] ; then
        echo "Deleting node_modules"
        rm -fr node_modules
    fi
    npm install && npm run clean && npm run lint && npm run test && npm run build-dist
    declare -i RESULT=$?
    popd > /dev/null
    if [ ${RESULT} -ne 0 ]
    then
        echo
        echo "Error building ${PROJECT}!" > /dev/stderr
        exit ${RESULT}
    fi
    echo
done
