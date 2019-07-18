# ScoreTable Instructions

Instructions for cloning repo:

Make a new folder and clone this repo by typing `git clone https://github.com/amc8mf/ScoreTable.git`

navigate to the root folder 'ScoreTable'

Instructions for installing node:

mac: Run this bash command in terminal or download mac installer directly from website: https://nodejs.org/en/download/


`curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"`

windows : download installer from https://nodejs.org/en/download/

Instructions for running app locally:

Run `node --version` to confirm node is installed

Run `npm install beefy browserify -g`

Run `npm start` - a prompt should tell you that beefy is listening to port 9966

Visit http://localhost:9966 in your browser
