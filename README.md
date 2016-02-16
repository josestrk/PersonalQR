PersonalQR
==========

This web application is intended to show user's profiles using QR codes. The appearing profiles are customized by the own users, who decide which data they want to disclose and to whom.

It will be a secure way to share your personal information, accessible and user friendly.

>**User demo:**
>User: personalqr
>Pass: Manager01

---

USE
--------------
To fully use PersonalQR you must be registered, but unregistered users can also view other users' profiles through their QR codes.

> 1. Create a new user.
> 2. The website will send an e-mail with a link which must be opened for user activation.
> 3. Registered users can sign in by introducing their username and password.
> 4. Registered users may modify their personal information, add a photo or add their CV.
> 5. There are three levels of access to a user's information: all, registered users only, none (only that user).
> 6. You don't need to save your changes. They will automatically come into effect.

----

Contributors
-------------

* [josestrk](https://github.com/josestrk)
* [alevale](https://github.com/alevale)
* [dgstranz](https://github.com/dgstranz)

---

Version
-------
*-.-.-* (Not releasable yet)

Dependencies
----
PersonalQR uses some external projects to work properly:

* [Node.js] - a runtime environment for server-side use
* [jQuery] - a JavaScript library designed to simplify the client-side scripting of HTML
* [MongoDB] - NoSQL database
* [npm] - a server side dependency package manager
* [Bower] - a client side dependency package manager
* [Socket.io] - a JavaScript library for realtime web applications (just a websocket wrapper)

Install
-------
```
Install node (latest version)
npm install
bower install
start mongodb service
grunt
[if you start in windows open new cmd and start: grunt mongo]
```

---

License
-------
MIT - [LICENSE.md](LICENSE.md)

External used libraries
------------
* qr-reader
* polymer
* vide
* github-card
* qr-code
* shoket.io
* jQuery

> **Note:** This program is beta, actually we don´t have a reallise aplication <i class="icon-cog"></i> **aplication under development**.
