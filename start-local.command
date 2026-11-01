#!/bin/bash
# Double-click to run the wedding site at http://localhost:8080
cd "$(dirname "$0")"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -d node_modules ] || npm install
(sleep 4 && open http://localhost:8080) &
npm run dev
