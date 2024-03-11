
## How To Run
Create the file `/server/.env` with your Atlas URI and the server port:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
PORT=5000
```

Start server:
```
cd /server
npm install
nodemon index.js
```

Start Web server
```
cd /client
npm install
npm start
```
