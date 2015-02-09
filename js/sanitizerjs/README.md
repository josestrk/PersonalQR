# sanitizerjs

A library that properly sanitizes and cleanses a string value to varying level of complexity. This enhances the string prototype so it will be available for all Strings in the environment, which means that it is always available, like good security functions should be. This was originally spawned due to a need to securely present user data on the [Joyent Smart Platform](http://smart.joyent.com/). In total, its a variety of security sanitization focused enhancements to native objects (string, etc) that protect against XSS attack vectors that leverage output of untrusted content to embed malicious code segments.


## whitelist

The most stringent and fine grained control of string cleansing and sanitization in the library. This function will allow you to systematically identify which HTML elements and attributes will be allowed as part of the resulting string. This will allow you present semi-rich output without inadvertently risking security.

To Use:

	"<script>aaa</script>".whitelist([{"a"=>["href"]},"b", "attr"])

The parameters to the function allow you to specify an array of allowable tags and for each you can use a JavaScript object with an array of allowable attributes. The above translates to:

Only allow
     "a" tags and only "href" will be allowed
     "b" tags and all attributes will be filtered out
     "attr" tags with all attributes will be filtered out

This provides a very terse, yet flexible method for describing a whitelist of allowable html elements. 

This function will always fail safe either by filtering the attribute values properly and by encoding entities if they cannot be whitelisted.

## h

HTML entity encode the string, using the standard HTML encodings for characters that would yield problematic if directly output into HTML, including &, <, and >.



## Install

Add sanitizerjs as a git submodule. In the root of your your smart project run:

    git submodule add git://github.com/voodootikigod/sanitizerjs.git js/sanitizerjs
    
**Or** if you would like to contribute back to sanitizerjs, fork the project and then install the submodule with your remote repo location:

    git submodule add git@github.com:<username>/sanitizerjs.git js/sanitizerjs
    
## Usage

In your `bootstrap.js` file tell your smart application to use sanitizerjs:
    
    system.use("sanitizerjs.init")