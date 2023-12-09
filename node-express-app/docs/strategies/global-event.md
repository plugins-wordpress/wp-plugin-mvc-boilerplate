1. At Login 
   1. Cache the user ID in redis 
   2. Send global 'user-has-login' event 
   3. Change use status to 'online' or 'active'
2. At Logout 
   1. Remove the user ID from redis (uncach)
   2. Send global 'user-logout' event
   3. Change use status to 'offline' or 'inactive'
3. At user status change 
   1. Cache the user status in redis 
   2. Send global 'user-status-change' event
   3. Change user status from 'old status' to 'new status'