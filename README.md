# Ground Out
This is a re-boot of the first AngularJS project I ever made using Angular 4 and the Angular CLI. It is a tool to help baseball fans who are interested in seeing every major league ballpark in America document their trips and monitor their progress.

![ScreenShot](screenshot1.png, "Screenshot 1")

![ScreenShot](screenshot2.png, "Screenshot 2")

To run you will need a `variables.env` containing these environment variables:
```
DATABASE=[DATABASE_URI]
SECRET=[SECRET]
SEATGEEK_ID=[SEATGEEK_API_KEY] // https://seatgeek.com/account/develop
SEATGEEK_URI=https://api.seatgeek.com/2/events
```

```
$ npm install
$ node start.js
```
Concurrently:
```
$ cd client/
$ npm install
$ ng serve
```

To load park and badge data:

`
npm run loadparks
`

To delete park and badge data:

`npm run blowitallaway`
