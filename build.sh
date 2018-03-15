#!/usr/bin/env bash

# colors
declare RED="\033[0;31m"
declare YELLOW="\033[1;33m"
declare GREEN="\033[0;32m"
declare RESET="\033[0m"

# constants
declare NODE_VERSION="v6.10.3"
declare -a PROJECTS=(
    "logger"
    "candidate-video-utilities"
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
    "theory-test-get-candidate-entitlements"
    "theory-test-recognise-candidate"
    "theory-test-start-admission"
    "theory-test-admission-candidate-app"
    "theory-test-admission-reception-app"
)

# variables
declare DELETE_NODE_MODULES=false # by default


function parse_arguments {
    while getopts ":d" opt; do
      case ${opt} in
        d )
          DELETE_NODE_MODULES=true
          ;;
        \? ) echo "Usage: ./build.sh [-d]" ; exit 1
          ;;
      esac
    done
}

function set_node_version {
    # the user should be using nvm
    declare NVM="$HOME/.nvm/nvm.sh"
    if [ -f ${NVM} ] ; then
        . ${NVM}
        nvm use ${NODE_VERSION} > /dev/null
        if [ $? -ne 0 ] ; then
            echo -e "${RED}ERROR: Failed to set node version ${NODE_VERSION} with nvm!${RESET}"
            exit 1
        fi
    fi
    # but either way, assert the correct version
    if [ "$(node -v)" != "${NODE_VERSION}" ] ; then
        echo -e "${RED}ERROR: Node.js ${NODE_VERSION} is required!${RESET}"
        exit 1
    fi
}

function print_header {
    echo -e "${YELLOW}Building theory-test-admission-service${RESET}"
    echo
    echo "node version: $(node -v)"
    echo "npm version:  v$(npm -v)"
    echo
    if [ "${DELETE_NODE_MODULES}" = true ] ; then
      echo -e "${RED}All node_modules directories will be deleted!${RESET}"
    fi
}

function build {
    for PROJECT in "${PROJECTS[@]}"
    do
        echo -e "${YELLOW}Building ${PROJECT}${RESET}"
        pushd ${PROJECT} > /dev/null
        if [ "${DELETE_NODE_MODULES}" = true ] ; then
            echo -e "${RED}Deleting existing node_modules${RESET}"
            rm -fr node_modules
        fi
        if [[ ${PROJECT} == *-app ]] ; then
            # TODO this is a hack to build user interface projects in a non-standard way
            npm install && npm run clean && npm run test && npm run build-dist
        else
            npm install && npm run default
        fi
        declare -i RESULT=$?
        popd > /dev/null
        if [ ${RESULT} -ne 0 ] ;then
            echo
            echo -e "${RED}ERROR! Failed to build ${PROJECT}!${RESET}"
            exit ${RESULT}
        else
            echo
            echo -e "${GREEN}Built ${PROJECT}${RESET}"
        fi
        echo
    done
}

function print_success {
    echo
    echo -e "${GREEN}SUCCESS${RESET}"
    echo
}


parse_arguments
set_node_version
print_header
build
print_success
