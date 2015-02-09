/*
 * whitelist.js
 *
 * Function to remove all XML tag entries cleanly from the provided
 * text. This will actually render the text into a Document Object and
 * remove any and all tags cleanly from the text. It will then encode
 * any remaining entities.
 *
 *
 * Copyright (c) 2009 Christopher Williams
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


String.prototype.whitelist = function (allowable_tags, allowed_protocols) {
  if (!allowable_tags) {
    allowable_tags =[];
  }

  // variables that we will use to detect malicious code segments.
  var protocol_separator = /:|(&#0*58)|(&#x70)|(%|&#37;)3A/;
  var uri_attributes = ["href", "cite", "src", "action", "xlink:href", "lowsrc", "longdesc"];
  if (!allowed_protocols) {
    allowed_protocols = ["ed2k", "ftp", "http", "https", "irc", "mailto", "news", "gopher", "nntp", "telnet", "webcal", "xmpp", "callto", "feed", "svn", "urn", "aim", "rsync", "tag", "ssh", "sftp", "rtsp", "afs"];
  }


  var flatten = function(array) {
    return Array.prototype.concat.apply([], array.map(function(v){
        return (v instanceof Array) ? flatten(v) : v;
    }));
  };


  var recursiveXMLPurge = function(element) {
    try {

      if (element.nodeKind() === "text") {
        return element.toString().h();
      } else {
        var contents = "";
        var localName = "";
        try { localName = element.localName().toLowerCase(); } catch (e) {}
        var children = element.children();
        for (var i=0; i< children.length(); i++) {
          contents += recursiveXMLPurge(children[i]);
        }
        if (element.nodeKind() == "element") {
          var allowable_element = false;
          var allowable_attributes =[];
          for (var j in allowable_tags) {
            var current_element = allowable_tags[j];
            if ((typeof current_element) === "string") {
              allowable_element  = (allowable_element  || (allowable_tags[j].toLowerCase() === localName));
            } else {
              for (var ele in current_element) {
                if (ele.toLowerCase() === localName) {
                  allowable_element = true;
                  allowable_attributes = flatten([current_element[ele]]);  //wrap in array and flatten to handle both array and single element.
                }
              }
            }
          }
          if (allowable_element) {
            var node = "<"+localName;
            for (i in allowable_attributes) {
              if (element[allowable_attributes]) {
                // Need to sanitize attribute values
                var clean_value = element["@"+allowable_attributes];
                node += " "+allowable_attributes[i]+"=\""+clean_value+"\"";
              }
            }
            return node+">"+contents+"</"+localName+">";
          }
        }
        return " "+contents;
      }
    } catch (e) {
      print(e);
      return "";
    }
  };

  var clean = "";
  try {
    clean = recursiveXMLPurge(new XML("<dirtydoc>"+this+"</dirtydoc>"));
    clean = clean.replace(/^\s+/, "").replace(/\s+$/, "");
  } catch(e) {
    clean = this.replace(/(<([^>]+)>)/ig,"").h();
  }
  return clean;
};




var test_security = function () {

  function assertEqual(expected, realized) {


    var expectedValue = expected;
    var realizedValue = realized;
    if (typeof expected === "function") {
      expectedValue = expected();
    }
    if (typeof realized === "function") {
      realizedValue = realized();
    }
    if (expectedValue === realizedValue) {
      print(".");
    } else {
      print("F");
      print("Expected: |"+expectedValue+"| but got: |"+realizedValue+"|");
      if (typeof realized === "function") {
        print(realized);
      }
    }
  }
  return {
    h: function() {
      assertEqual("&amp;", "&".h());
      assertEqual("&lt;","<".h());
      assertEqual("&gt;", ">".h());
    },
    whitelist: function() {
      // purge valid xml
      assertEqual("I like alert('chickens');", "I like <script>alert('chickens');</script>".whitelist());

      //purge unknown entries but allow known ones to go through.
      assertEqual("I like alert('<b>chickens</b>');", "I like <script>alert('<b>chickens</b>');</script>".whitelist(["b"]));

      assertEqual("I like alert('<b style=\"color: red\">chickens</b>');", "I like <script>alert('<b style=\"color: red\">chickens</b>');</script>".whitelist([{b: "style"}]));
      assertEqual("I like alert('<b style=\"color: red\">chickens</b>');", "I like <script>alert('<b style=\"color: red\">chickens</b>');</script>".whitelist([{b: ["style"]}]));

      //purge invalid xml
      assertEqual("I like alert('chickens');",   "I like <script>alert('chickens');".whitelist());

      //encodes entities it cannot purge.
      assertEqual("I like alert('chickens');&lt;/script", "I like <script>alert('chickens');</script".whitelist());

    },
    all:function() {
      this.h();
      this.whitelist();
    }
  };
}();




