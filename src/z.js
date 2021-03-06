/*
Copyright (c) Sam Taylor 2011. Released under MIT License.
*/
ZElementNames = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1' , 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'map', 'mark', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp']
ZAutoId = 1;

function initializeZ (options) {
  
  options = defaultsFor(options, {
    target: window,
  });
    
  var Z = function(elementName) {
  	elementName = elementName.toLowerCase();
    var e = jQuery("<"+elementName+">");	

  	return e;
  } 
  options.target.Z = Z;
  
  var z = {};
  ZElementNames.forEach(function(tagName) {
    z[tagName] = function(/*content*/) { 
      var tag = tagName==='body' ? jQuery('body') : Z(tagName);
      Array.toArray(arguments).forEach(function(elements){
        tag.append(elements);
      });
      return tag; 
    };
  });
  options.target.z = z;
  z.window = function () { return $(window); };
  
  return options.target;  
}

initializeZ();

jQuery.prototype.id = function (id) {
 return this.attr('id', id); 
}

jQuery.prototype.autoid = function () {
  if (!this.id()) {
    this.id('z_auto_id_' + ZAutoId++);  
  } 
  return this;
};

jQuery.prototype.elem = function () { 
  return this[0]; 
}

