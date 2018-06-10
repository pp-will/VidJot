to view db:

open cmd line as admin
cd ..
cd ..
cd mongodb/bin

mongo

show dbs

use DBNAME

show collections

db.COLLECTIONNAME.find();


sessions:

in a typical web app, the creds used to authenticate a user will only be 
transmitted during the login request. If auth succeeds, a session will be established
and maintained via a cookie set in the users browser

each subsequent request will not contain creds, but rather the cookie that ids the session. 