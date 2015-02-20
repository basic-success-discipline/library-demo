# !/bin/bash

# curl config - optional
opts=$1

# Bash config
set -o errexit
set -o pipefail
set -o nounset
# set -o xtrace

# curl API config
host="adl-dev.appspot.com"
apiURL="https://${host}/api_v2.0"
ht="Accept: application/json"
ha="x-adl-admin-auth: 271828"

# Call API to get all ADL assets.
curl ${opts} -H "${ha}" "${apiURL}/assets/"; echo