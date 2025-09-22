Authenticaton:-
auth: {vaild for all route}
api/auth/signup ---create user //send verify verify mail with middlewear send token
api/auth/verify--- confrim user cration and send with code cookie
api/auth/login ---send otp if enable 2fa
api/auth/logout ---logout //remove cookie
api/auth/forget ---send forget mail with middlewear send token
api/auth/reset ---send reset password

...................................\*\*\*\*...................................

user:
simple user: with simple auth
api/user/ ---get user info
api/user/ ---update user info
api/user/:id ---update user
api/user/follow ---follow user
api/user/unfollow ---unfollow user
api/user/like ---like post
api/user/unlike ---unlike post
api/user/topAuter--- find to autor
api/user/suggest user ---find suggest user

............................**\***.....................................

author: requre author role
api/user/block ---block user
api/user/unblock ---unblock user
api/user/followers ---get followers list
api/user/following ---get following list
api/user/like ---like post
api/user/unlike ---unlike post
api/user/blocklist ---get block list

........................**\*\*\***........................................

admin:need auth admin
api/user/ ---delete user info
api/user/updaterole/:id ---update user info
api/user/authorlist--get all author

**\*\*\*\***\*\***\*\*\*\***\*\*\***\*\*\*\***\*\***\*\*\*\***POST**\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***
user:
api/post/allpost---get all post
api/post/:id ---get single post
api/post/:id/like&unlike---like unlike
api/post/:id/comment ---comment post
api/post/followingpost---get following post
api/post/recent---get top post
api/user/post/:id ---update post
api/user/addtofavourit---favourite
api/user/removefromfavourit---unfavourite

Author:
api/post----create-post
api/post/:id ---update post
api/post/:id ---delete post
api/post/like/unlikepost---likeAndunlike post
api/post/comment---comment on post

admin:
api/post/posts---get all post
api/post/:id ---delete post
api/post/:id ---single post
api/post/approved---approvedpost

**\*\***\*\*\*\***\*\***\*\*\***\*\***\*\*\*\***\*\***chat/system**\*\***\*\***\*\***\***\*\***\*\***\*\***
single chat:
api/chat/:id ---get single chat
api/chat/:id ---delete chat
api/conversation--
api/chat

group-chat:
api/conversation--
api/chat

******\*\*******\*\*\*******\*\*******realtime chat********\*\*********\*\*********\*\*********
