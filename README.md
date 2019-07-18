# ScoreTable Instructions


mac: Run this bash command in terminal or download mac installer directly from website: https://nodejs.org/en/download/


curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

windows : download installer from https://nodejs.org/en/download/

Run 'node --v' to confirm node is installed

Run 'npm install beefy browserify -g'

Run 'npm start' - a prompt should tell you that beefy is listening to port 9966

Visit http://localhost:9966 in your browser
