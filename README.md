### INSTALL

npm install


### RUN

npm run start


### RUNNING WITH TEST CASES

npm run start -- COMMANDS{1-7}


### TESTING
I didn't have time to make the tests easier to run, but in the iconsole module, there is a TestConsole class.  You can add new command string arrrays in there and change the readline method to pull from the desired array to manually test different scenarios.  To enable the TestConsole, you will have to comment out line 13 in index.ts and uncomment line 14.

