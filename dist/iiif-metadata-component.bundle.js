// base-component v1.1.2 https://github.com/iiif-commons/base-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.baseComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var _Components;
(function (_Components) {
    var BaseComponent = /** @class */ (function () {
        function BaseComponent(options) {
            this.options = options;
            this.options.data = $.extend(this.data(), options.data);
        }
        BaseComponent.prototype._init = function () {
            this._$element = $(this.options.target);
            if (!this._$element.length) {
                console.warn('element not found');
                return false;
            }
            this._$element.empty();
            return true;
        };
        BaseComponent.prototype.data = function () {
            return {};
        };
        BaseComponent.prototype.on = function (name, callback, ctx) {
            var e = this._e || (this._e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx: ctx
            });
        };
        BaseComponent.prototype.fire = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }
        };
        BaseComponent.prototype._resize = function () {
        };
        BaseComponent.prototype.set = function (data) {
        };
        return BaseComponent;
    }());
    _Components.BaseComponent = BaseComponent;
})(_Components || (_Components = {}));
(function (g) {
    if (!g._Components) {
        g._Components = _Components;
    }
})(global);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
// extensions v0.2.1 https://github.com/edsilv/extensions
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.extensions = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

Array.prototype.clone = function () {
    return this.slice(0);
};
if (!Array.prototype.includes) {
    Array.prototype.includes = function (val) {
        return this.indexOf(val) !== -1;
    };
}
Array.prototype.insert = function (item, index) {
    this.splice(index, 0, item);
};
Array.prototype.move = function (fromIndex, toIndex) {
    this.splice(toIndex, 0, this.splice(fromIndex, 1)[0]);
};
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

if (!Math.clamp) {
    Math.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
}
if (!Math.radians) {
    Math.radians = function (degrees) {
        return Math.TAU * (degrees / 360);
    };
}
Math.distanceBetween = function (x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * 2) + ((y2 - y1) * 2));
};
Math.lerp = function (start, stop, amount) {
    return start + (stop - start) * amount;
};
Math.mag = function (a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
};
Math.map = function (value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
Math.median = function (values) {
    values.sort(function (a, b) { return a - b; });
    var half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    else {
        return (values[half - 1] + values[half]) / 2.0;
    }
};
Math.normalise = function (num, min, max) {
    return (num - min) / (max - min);
};
if (!Math.degrees) {
    Math.degrees = function (radians) {
        return (radians * 360) / Math.TAU;
    };
}
/**
 * Get a random number between two numbers.
 * If 'high' isn't passed, get a number from 0 to 'low'.
 * @param {Number} low The low number.
 * @param {Number} [high] The high number.
 */
Math.randomBetween = function (low, high) {
    if (!high) {
        high = low;
        low = 0;
    }
    if (low >= high)
        return low;
    return low + (high - low) * Math.random();
};
Math.roundToDecimalPlace = function (num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};
Math.TAU = Math.PI * 2;

String.prototype.b64_to_utf8 = function () {
    return decodeURIComponent(escape(window.atob(this)));
};
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
if (!String.prototype.includes) {
    String.prototype.includes = function (str) {
        return this.indexOf(str) !== -1;
    };
}
String.prototype.isAlphanumeric = function () {
    return /^[a-zA-Z0-9]*$/.test(this);
};
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, '');
};
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, '');
};
String.prototype.toCssClass = function () {
    return this.replace(/[^a-z0-9]/g, function (s) {
        var c = s.charCodeAt(0);
        if (c == 32)
            return '-';
        if (c >= 65 && c <= 90)
            return '_' + s.toLowerCase();
        return '__' + ('000' + c.toString(16)).slice(-4);
    });
};
String.prototype.toFileName = function () {
    return this.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};
String.prototype.utf8_to_b64 = function () {
    return window.btoa(unescape(encodeURIComponent(this)));
};

},{}]},{},[1])(1)
});
// jquery-plugins v0.1.0 https://github.com/edsilv/jquery-plugins
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jqueryPlugins = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// declare var Length: Length;
// interface Length{
//     toPx(elem, value, prop?, force?): number;
// }

/// <reference types="extensions" />
(function ($) {
    $.fn.checkboxButton = function (onClick) {
        return this.each(function () {
            var $this = $(this);
            $this.on('click', function (e) {
                var tagName = e.target.tagName;
                var $checkbox = $(this).find(':checkbox');
                if (tagName !== "INPUT") {
                    e.preventDefault();
                    $checkbox.prop('checked', !$checkbox.prop('checked'));
                }
                var checked = $checkbox.is(':checked');
                onClick.call(this, checked);
            });
        });
    };
    $.fn.disable = function () {
        return this.each(function () {
            var $this = $(this);
            $this.addClass('disabled');
            $this.data('tabindex', $this.attr('tabindex'));
            $this.removeAttr('tabindex');
        });
    };
    $.fn.ellipsis = function (chars) {
        return this.each(function () {
            var $self = $(this);
            var text = $self.text();
            if (text.length > chars) {
                var trimmedText = text.substr(0, chars);
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
                $self.empty().html(trimmedText + "&hellip;");
            }
        });
    };
    $.fn.ellipsisFill = function (text) {
        var textPassed = true;
        if (!text)
            textPassed = false;
        return this.each(function () {
            var $self = $(this);
            if (!textPassed)
                text = $self.text();
            $self.empty();
            var $spanElem = $('<span title="' + text + '"></span>');
            $self.append($spanElem);
            $self.css('overflow', 'hidden');
            $spanElem.css('white-space', 'nowrap');
            $spanElem.html(text);
            // get the width of the span.
            // if it's wider than the container, remove a word until it's not.
            if ($spanElem.width() > $self.width()) {
                var lastText = null;
                while ($spanElem.width() > $self.width()) {
                    var t = $spanElem.html();
                    t = t.substring(0, t.lastIndexOf(' ')) + '&hellip;';
                    if (t === lastText)
                        break;
                    $spanElem.html(t);
                    lastText = t;
                }
            }
        });
    };
    // Truncates to a certain number of letters, while ignoring and preserving HTML
    $.fn.ellipsisHtmlFixed = function (chars, cb) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            var $trunc = $('<span></span>');
            $trunc.html($self.html().replace(/\s[\s]*/g, ' ').trim());
            if ($trunc.text().trim().length <= chars) {
                return; // do nothing if we're under the limit!
            }
            while ($trunc.text().trim().length > chars) {
                $trunc.removeLastWord(chars);
            }
            var collapsedText = $trunc.html();
            // Toggle function
            var expanded = false;
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + " ");
                    $toggleButton.text("less");
                    $toggleButton.switchClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&hellip; ");
                    $toggleButton.text("more");
                    $toggleButton.switchClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (cb)
                    cb();
            };
            $self.toggle();
        });
    };
    $.fn.enable = function () {
        return this.each(function () {
            var $self = $(this);
            $self.removeClass('disabled');
            $self.attr('tabindex', $self.data('tabindex'));
        });
    };
    $.fn.equaliseHeight = function (reset, average) {
        var maxHeight = -1;
        var minHeight = Number.MAX_VALUE;
        var heights = [];
        // reset all heights to auto first so they can be re-measured.
        if (reset) {
            this.each(function () {
                $(this).height('auto');
            });
        }
        this.each(function () {
            var currentHeight = $(this).height();
            heights.push(currentHeight);
            maxHeight = maxHeight > currentHeight ? maxHeight : currentHeight;
            minHeight = minHeight < currentHeight ? minHeight : currentHeight;
        });
        var finalHeight = maxHeight;
        if (average) {
            finalHeight = Math.median(heights);
        }
        this.each(function () {
            $(this).height(finalHeight);
        });
        return this;
    };
    $.fn.getVisibleElementWithGreatestTabIndex = function () {
        var $self = $(this);
        var maxTabIndex = 0;
        var $elementWithGreatestTabIndex = null;
        $self.find('*:visible[tabindex]').each(function (index, el) {
            var $el = $(el);
            var tabIndex = parseInt($el.attr('tabindex'));
            if (tabIndex > maxTabIndex) {
                maxTabIndex = tabIndex;
                $elementWithGreatestTabIndex = $el;
            }
        });
        return $elementWithGreatestTabIndex;
    };
    $.fn.horizontalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginLeft')) + parseInt($self.css('marginRight'));
    };
    $.fn.leftMargin = function () {
        var $self = $(this);
        return parseInt($self.css('marginLeft'));
    };
    $.fn.rightMargin = function () {
        var $self = $(this);
        return parseInt($self.css('marginRight'));
    };
    $.fn.horizontalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingLeft')) + parseInt($self.css('paddingRight'));
    };
    $.fn.leftPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingLeft'));
    };
    $.fn.rightPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingRight'));
    };
    $.mlp = { x: 0, y: 0 }; // Mouse Last Position
    function documentHandler() {
        var $current = this === document ? $(this) : $(this).contents();
        $current.mousemove(function (e) { jQuery.mlp = { x: e.pageX, y: e.pageY }; });
        $current.find("iframe").load(documentHandler);
    }
    $(documentHandler);
    $.fn.ismouseover = function () {
        var result = false;
        this.eq(0).each(function () {
            var $current = $(this).is("iframe") ? $(this).contents().find("body") : $(this);
            var offset = $current.offset();
            result = offset.left <= $.mlp.x && offset.left + $current.outerWidth() > $.mlp.x &&
                offset.top <= $.mlp.y && offset.top + $current.outerHeight() > $.mlp.y;
        });
        return result;
    };
    var on = $.fn.on;
    var timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];
        if (isNaN(last) || (last === 1 && args.pop()))
            return on.apply(this, args);
        var delay = args.pop();
        var fn = args.pop();
        args.push(function () {
            var self = this;
            var params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });
        return on.apply(this, args);
    };
    $.fn.onEnter = function (cb) {
        return this.each(function () {
            var $this = $(this);
            $this.on('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    cb();
                }
            });
        });
    };
    $.fn.onPressed = function (cb) {
        return this.each(function () {
            var $this = $(this);
            $this.on('touchstart click', function (e) {
                e.preventDefault();
                cb(e);
            });
            $this.on('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    cb(e);
                }
            });
        });
    };
    // Recursively removes the last empty element (img, audio, etc) or word in an element
    $.fn.removeLastWord = function (chars, depth) {
        if (chars === void 0) { chars = 8; }
        if (depth === void 0) { depth = 0; }
        return this.each(function () {
            var $self = $(this);
            if ($self.contents().length > 0) {
                var $lastElement = $self.contents().last();
                if ($lastElement[0].nodeType === 3) {
                    var words = $lastElement.text().trim().split(' ');
                    if (words.length > 1) {
                        words.splice(words.length - 1, 1);
                        $lastElement[0].data = words.join(' '); // textnode.data
                        return;
                    }
                    else if ('undefined' !== typeof chars && words.length === 1 && words[0].length > chars) {
                        $lastElement[0].data = words.join(' ').substring(0, chars);
                        return;
                    }
                }
                $lastElement.removeLastWord(chars, depth + 1); // Element
            }
            else if (depth > 0) {
                // Empty element
                $self.remove();
            }
        });
    };
    $.fn.swapClass = function (removeClass, addClass) {
        return this.each(function () {
            $(this).removeClass(removeClass).addClass(addClass);
        });
    };
    $.fn.targetBlank = function () {
        return this.each(function () {
            $(this).find('a').prop('target', '_blank');
        });
    };
    $.fn.switchClass = function (class1, class2) {
        return this.each(function () {
            var $this = $(this);
            if ($this.hasClass(class1)) {
                $(this).removeClass(class1).addClass(class2);
            }
            else {
                $(this).removeClass(class2).addClass(class1);
            }
        });
    };
    $.fn.toggleExpandText = function (chars, lessText, moreText, cb) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            if (chars > expandedText.length)
                return;
            var expanded = false;
            var collapsedText = expandedText.substr(0, chars);
            collapsedText = collapsedText.substr(0, Math.min(collapsedText.length, collapsedText.lastIndexOf(" ")));
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + "&nbsp;");
                    $toggleButton.text(lessText);
                    $toggleButton.switchClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&nbsp;");
                    $toggleButton.text(moreText);
                    $toggleButton.switchClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (cb)
                    cb();
            };
            $self.toggle();
        });
    };
    // Toggle expansion by number of lines
    $.fn.toggleExpandTextByLines = function (lines, lessText, moreText, cb) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            // add 'pad' to account for the right margin in the sidebar
            var $buttonPad = $('<span>&hellip; <a href="#" class="toggle more">morepad</a></span>');
            // when height changes, store string, then pick from line counts
            var stringsByLine = [expandedText];
            var lastHeight = $self.height();
            // Until empty
            while ($self.text().length > 0) {
                $self.removeLastWord();
                var html = $self.html();
                $self.append($buttonPad);
                if (lastHeight > $self.height()) {
                    stringsByLine.unshift(html);
                    lastHeight = $self.height();
                }
                $buttonPad.remove();
            }
            if (stringsByLine.length <= lines) {
                $self.html(expandedText);
                return;
            }
            var collapsedText = stringsByLine[lines - 1];
            // Toggle function
            var expanded = false;
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + " ");
                    $toggleButton.text(lessText);
                    $toggleButton.switchClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&hellip; ");
                    $toggleButton.text(moreText);
                    $toggleButton.switchClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (cb)
                    cb();
            };
            $self.toggle();
        });
    };
    $.fn.toggleText = function (text1, text2) {
        return this.each(function () {
            var $self = $(this);
            if ($self.text() === text1) {
                $(this).text(text2);
            }
            else {
                $(this).text(text1);
            }
        });
    };
    $.fn.updateAttr = function (attrName, oldVal, newVal) {
        return this.each(function () {
            var $self = $(this);
            var attr = $self.attr(attrName);
            if (attr && attr.indexOf(oldVal) === 0) {
                attr = attr.replace(oldVal, newVal);
                $self.attr(attrName, attr);
            }
        });
    };
    $.fn.verticalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginTop')) + parseInt($self.css('marginBottom'));
    };
    $.fn.verticalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingTop')) + parseInt($self.css('paddingBottom'));
    };
})(jQuery);

},{}]},{},[1])(1)
});
// utils v0.2.0 https://github.com/edsilv/utils
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.utils = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var Utils;
(function (Utils) {
    var Async = /** @class */ (function () {
        function Async() {
        }
        Async.waitFor = function (test, successCallback, failureCallback, interval, maxTries, numTries) {
            if (!interval)
                interval = 200;
            if (!maxTries)
                maxTries = 100; // try 100 times over 20 seconds
            if (!numTries)
                numTries = 0;
            numTries += 1;
            if (numTries > maxTries) {
                if (failureCallback)
                    failureCallback();
            }
            else if (test()) {
                successCallback();
            }
            else {
                setTimeout(function () {
                    Async.waitFor(test, successCallback, failureCallback, interval, maxTries, numTries);
                }, interval);
            }
        };
        return Async;
    }());
    Utils.Async = Async;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Bools = /** @class */ (function () {
        function Bools() {
        }
        Bools.getBool = function (val, defaultVal) {
            if (val === null || typeof (val) === 'undefined') {
                return defaultVal;
            }
            return val;
        };
        return Bools;
    }());
    Utils.Bools = Bools;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Clipboard = /** @class */ (function () {
        function Clipboard() {
        }
        Clipboard.copy = function (text) {
            var $tempDiv = $("<div style='position:absolute;left:-9999px'>");
            var brRegex = /<br\s*[\/]?>/gi;
            text = text.replace(brRegex, "\n");
            $("body").append($tempDiv);
            $tempDiv.append(text);
            var $tempInput = $("<textarea>");
            $tempDiv.append($tempInput);
            $tempInput.val($tempDiv.text()).select();
            document.execCommand("copy");
            $tempDiv.remove();
        };
        Clipboard.supportsCopy = function () {
            return document.queryCommandSupported && document.queryCommandSupported('copy');
        };
        return Clipboard;
    }());
    Utils.Clipboard = Clipboard;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Colors = /** @class */ (function () {
        function Colors() {
        }
        Colors.float32ColorToARGB = function (float32Color) {
            var a = (float32Color & 0xff000000) >>> 24;
            var r = (float32Color & 0xff0000) >>> 16;
            var g = (float32Color & 0xff00) >>> 8;
            var b = float32Color & 0xff;
            var result = [a, r, g, b];
            return result;
        };
        Colors._componentToHex = function (c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };
        Colors.rgbToHexString = function (rgb) {
            Colors.coalesce(rgb);
            return "#" + Colors._componentToHex(rgb[0]) + Colors._componentToHex(rgb[1]) + Colors._componentToHex(rgb[2]);
        };
        Colors.argbToHexString = function (argb) {
            return "#" + Colors._componentToHex(argb[0]) + Colors._componentToHex(argb[1]) + Colors._componentToHex(argb[2]) + Colors._componentToHex(argb[3]);
        };
        Colors.coalesce = function (arr) {
            for (var i = 1; i < arr.length; i++) {
                if (typeof (arr[i]) === 'undefined')
                    arr[i] = arr[i - 1];
            }
        };
        return Colors;
    }());
    Utils.Colors = Colors;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Dates = /** @class */ (function () {
        function Dates() {
        }
        Dates.getTimeStamp = function () {
            return new Date().getTime();
        };
        return Dates;
    }());
    Utils.Dates = Dates;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Device = /** @class */ (function () {
        function Device() {
        }
        Device.getPixelRatio = function (ctx) {
            var dpr = window.devicePixelRatio || 1;
            var bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            return dpr / bsr;
        };
        Device.isTouch = function () {
            return !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
        };
        return Device;
    }());
    Utils.Device = Device;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Documents = /** @class */ (function () {
        function Documents() {
        }
        Documents.isInIFrame = function () {
            // see http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
            try {
                return window.self !== window.top;
            }
            catch (e) {
                return true;
            }
        };
        Documents.supportsFullscreen = function () {
            var doc = document.documentElement;
            var support = doc.requestFullscreen || doc.mozRequestFullScreen ||
                doc.webkitRequestFullScreen || doc.msRequestFullscreen;
            return support !== undefined;
        };
        Documents.isHidden = function () {
            var prop = Documents.getHiddenProp();
            if (!prop)
                return false;
            return true;
            //return document[prop];
        };
        Documents.getHiddenProp = function () {
            var prefixes = ['webkit', 'moz', 'ms', 'o'];
            // if 'hidden' is natively supported just return it
            if ('hidden' in document)
                return 'hidden';
            // otherwise loop over all the known prefixes until we find one
            for (var i = 0; i < prefixes.length; i++) {
                if ((prefixes[i] + 'Hidden') in document) {
                    return prefixes[i] + 'Hidden';
                }
            }
            // otherwise it's not supported
            return null;
        };
        return Documents;
    }());
    Utils.Documents = Documents;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Events = /** @class */ (function () {
        function Events() {
        }
        Events.debounce = function (fn, debounceDuration) {
            // summary:
            //      Returns a debounced function that will make sure the given
            //      function is not triggered too much.
            // fn: Function
            //      Function to debounce.
            // debounceDuration: Number
            //      OPTIONAL. The amount of time in milliseconds for which we
            //      will debounce the function. (defaults to 100ms)
            debounceDuration = debounceDuration || 100;
            return function () {
                if (!fn.debouncing) {
                    var args = Array.prototype.slice.apply(arguments);
                    fn.lastReturnVal = fn.apply(window, args);
                    fn.debouncing = true;
                }
                clearTimeout(fn.debounceTimeout);
                fn.debounceTimeout = setTimeout(function () {
                    fn.debouncing = false;
                }, debounceDuration);
                return fn.lastReturnVal;
            };
        };
        return Events;
    }());
    Utils.Events = Events;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Files = /** @class */ (function () {
        function Files() {
        }
        Files.simplifyMimeType = function (mime) {
            switch (mime) {
                case 'text/plain':
                    return 'txt';
                case 'image/jpeg':
                    return 'jpg';
                case 'application/msword':
                    return 'doc';
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    return 'docx';
                default:
                    var parts = mime.split('/');
                    return parts[parts.length - 1];
            }
        };
        return Files;
    }());
    Utils.Files = Files;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
        }
        Keyboard.getCharCode = function (e) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            return charCode;
        };
        return Keyboard;
    }());
    Utils.Keyboard = Keyboard;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Maths = /** @class */ (function () {
        function Maths() {
        }
        Maths.normalise = function (num, min, max) {
            return (num - min) / (max - min);
        };
        Maths.median = function (values) {
            values.sort(function (a, b) {
                return a - b;
            });
            var half = Math.floor(values.length / 2);
            if (values.length % 2) {
                return values[half];
            }
            else {
                return (values[half - 1] + values[half]) / 2.0;
            }
        };
        return Maths;
    }());
    Utils.Maths = Maths;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Measurements;
    (function (Measurements) {
        var Size = /** @class */ (function () {
            function Size(width, height) {
                this.width = width;
                this.height = height;
            }
            return Size;
        }());
        Measurements.Size = Size;
        var Dimensions = /** @class */ (function () {
            function Dimensions() {
            }
            Dimensions.fitRect = function (width1, height1, width2, height2) {
                var ratio1 = height1 / width1;
                var ratio2 = height2 / width2;
                var width = 0;
                var height = 0;
                var scale;
                if (ratio1 < ratio2) {
                    scale = width2 / width1;
                    width = width1 * scale;
                    height = height1 * scale;
                }
                if (ratio2 < ratio1) {
                    scale = height2 / height1;
                    width = width1 * scale;
                    height = height1 * scale;
                }
                return new Size(Math.floor(width), Math.floor(height));
            };
            Dimensions.hitRect = function (x, y, w, h, mx, my) {
                if (mx > x && mx < (x + w) && my > y && my < (y + h)) {
                    return true;
                }
                return false;
            };
            return Dimensions;
        }());
        Measurements.Dimensions = Dimensions;
    })(Measurements = Utils.Measurements || (Utils.Measurements = {}));
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Numbers = /** @class */ (function () {
        function Numbers() {
        }
        Numbers.numericalInput = function (event) {
            // Allow: backspace, delete, tab and escape
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return true;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            }
        };
        return Numbers;
    }());
    Utils.Numbers = Numbers;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Objects = /** @class */ (function () {
        function Objects() {
        }
        Objects.toPlainObject = function (value) {
            value = Object(value);
            var result = {};
            for (var key in value) {
                result[key] = value[key];
            }
            return result;
        };
        return Objects;
    }());
    Utils.Objects = Objects;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Storage = /** @class */ (function () {
        function Storage() {
        }
        Storage.clear = function (storageType) {
            if (storageType === void 0) { storageType = Utils.StorageType.memory; }
            switch (storageType.value) {
                case Utils.StorageType.memory.value:
                    this._memoryStorage = {};
                    break;
                case Utils.StorageType.session.value:
                    sessionStorage.clear();
                    break;
                case Utils.StorageType.local.value:
                    localStorage.clear();
                    break;
            }
        };
        Storage.clearExpired = function (storageType) {
            if (storageType === void 0) { storageType = Utils.StorageType.memory; }
            var items = this.getItems(storageType);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (this._isExpired(item)) {
                    this.remove(item.key);
                }
            }
        };
        Storage.get = function (key, storageType) {
            if (storageType === void 0) { storageType = Utils.StorageType.memory; }
            var data = null;
            switch (storageType.value) {
                case Utils.StorageType.memory.value:
                    data = this._memoryStorage[key];
                    break;
                case Utils.StorageType.session.value:
                    data = sessionStorage.getItem(key);
                    break;
                case Utils.StorageType.local.value:
                    data = localStorage.getItem(key);
                    break;
            }
            if (!data)
                return null;
            var item = null;
            try {
                item = JSON.parse(data);
            }
            catch (error) {
                return null;
            }
            if (!item)
                return null;
            if (this._isExpired(item))
                return null;
            // useful reference
            item.key = key;
            return item;
        };
        Storage._isExpired = function (item) {
            if (new Date().getTime() < item.expiresAt) {
                return false;
            }
            return true;
        };
        Storage.getItems = function (storageType) {
            if (storageType === void 0) { storageType = Utils.StorageType.memory; }
            var items = [];
            switch (storageType.value) {
                case Utils.StorageType.memory.value:
                    var keys = Object.keys(this._memoryStorage);
                    for (var i = 0; i < keys.length; i++) {
                        var item = this.get(keys[i], Utils.StorageType.memory);
                        if (item) {
                            items.push(item);
                        }
                    }
                    break;
                case Utils.StorageType.session.value:
                    for (var i = 0; i < sessionStorage.length; i++) {
                        var key = sessionStorage.key(i);
                        if (key) {
                            var item = this.get(key, Utils.StorageType.session);
                            if (item) {
                                items.push(item);
                            }
                        }
                    }
                    break;
                case Utils.StorageType.local.value:
                    for (var i = 0; i < localStorage.length; i++) {
                        var key = localStorage.key(i);
                        if (key) {
                            var item = this.get(key, Utils.StorageType.local);
                            if (item) {
                                items.push(item);
                            }
                        }
                    }
                    break;
            }
            return items;
        };
        Storage.remove = function (key, storageType) {
            if (storageType === void 0) { storageType = Utils.StorageType.memory; }
            switch (storageType.value) {
                case Utils.StorageType.memory.value:
                    delete this._memoryStorage[key];
                    break;
                case Utils.StorageType.session.value:
                    sessionStorage.removeItem(key);
                    break;
                case Utils.StorageType.local.value:
                    localStorage.removeItem(key);
                    break;
            }
        };
        Storage.set = function (key, value, expirationSecs, storageType) {
            if (storageType === void 0) { storageType = Utils.StorageType.memory; }
            var expirationMS = expirationSecs * 1000;
            var record = new Utils.StorageItem();
            record.value = value;
            record.expiresAt = new Date().getTime() + expirationMS;
            switch (storageType.value) {
                case Utils.StorageType.memory.value:
                    this._memoryStorage[key] = JSON.stringify(record);
                    break;
                case Utils.StorageType.session.value:
                    sessionStorage.setItem(key, JSON.stringify(record));
                    break;
                case Utils.StorageType.local.value:
                    localStorage.setItem(key, JSON.stringify(record));
                    break;
            }
            return record;
        };
        Storage._memoryStorage = {};
        return Storage;
    }());
    Utils.Storage = Storage;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var StorageItem = /** @class */ (function () {
        function StorageItem() {
        }
        return StorageItem;
    }());
    Utils.StorageItem = StorageItem;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var StorageType = /** @class */ (function () {
        function StorageType(value) {
            this.value = value;
        }
        StorageType.prototype.toString = function () {
            return this.value;
        };
        StorageType.memory = new StorageType("memory");
        StorageType.session = new StorageType("session");
        StorageType.local = new StorageType("local");
        return StorageType;
    }());
    Utils.StorageType = StorageType;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Strings = /** @class */ (function () {
        function Strings() {
        }
        Strings.ellipsis = function (text, chars) {
            if (text.length <= chars)
                return text;
            var trimmedText = text.substr(0, chars);
            var lastSpaceIndex = trimmedText.lastIndexOf(" ");
            if (lastSpaceIndex != -1) {
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
            }
            return trimmedText + "&hellip;";
        };
        Strings.htmlDecode = function (encoded) {
            var div = document.createElement('div');
            div.innerHTML = encoded;
            return div.firstChild.nodeValue;
        };
        Strings.format = function (str) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            for (var i = 0; i < values.length; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, values[i]);
            }
            return str;
        };
        Strings.isAlphanumeric = function (str) {
            return /^[a-zA-Z0-9]*$/.test(str);
        };
        Strings.toCssClass = function (str) {
            return str.replace(/[^a-z0-9]/g, function (s) {
                var c = s.charCodeAt(0);
                if (c == 32)
                    return '-';
                if (c >= 65 && c <= 90)
                    return '_' + s.toLowerCase();
                return '__' + ('000' + c.toString(16)).slice(-4);
            });
        };
        Strings.toFileName = function (str) {
            return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        };
        Strings.utf8_to_b64 = function (str) {
            return window.btoa(unescape(encodeURIComponent(str)));
        };
        return Strings;
    }());
    Utils.Strings = Strings;
})(Utils || (Utils = {}));

var Utils;
(function (Utils) {
    var Urls = /** @class */ (function () {
        function Urls() {
        }
        Urls.getHashParameter = function (key, doc) {
            if (!doc)
                doc = window.document;
            var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
            var match = regex.exec(doc.location.hash);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };
        Urls.setHashParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;
            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            var newHash = "#?" + kvp;
            var url = doc.URL;
            // remove hash value (if present).
            var index = url.indexOf('#');
            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }
            doc.location.replace(url + newHash);
        };
        Urls.getQuerystringParameter = function (key, w) {
            if (!w)
                w = window;
            return this.getQuerystringParameterFromString(key, w.location.search);
        };
        Urls.getQuerystringParameterFromString = function (key, querystring) {
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var match = regex.exec(querystring);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };
        Urls.setQuerystringParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;
            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            // redirects.
            window.location.search = kvp;
        };
        Urls.updateURIKeyValuePair = function (uriSegment, key, value) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);
            var kvp = uriSegment.split('&');
            // Array.split() returns an array with a single "" item
            // if the target string is empty. remove if present.
            if (kvp[0] == "")
                kvp.shift();
            var i = kvp.length;
            var x;
            // replace if already present.
            while (i--) {
                x = kvp[i].split('=');
                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }
            // not found, so append.
            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }
            return kvp.join('&');
        };
        Urls.getUrlParts = function (url) {
            var a = document.createElement('a');
            a.href = url;
            return a;
        };
        Urls.convertToRelativeUrl = function (url) {
            var parts = this.getUrlParts(url);
            var relUri = parts.pathname + parts.searchWithin;
            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }
            return relUri;
        };
        return Urls;
    }());
    Utils.Urls = Urls;
})(Utils || (Utils = {}));

global.Utils = module.exports = Utils;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
!function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,g.iiifMetadataComponent=f()}}(function(){return function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}return e}()({1:[function(require,module,exports){(function(global){var IIIFComponents;!function(IIIFComponents){var StringValue=function(){function StringValue(value){this.value="",value&&(this.value=value.toLowerCase())}return StringValue.prototype.toString=function(){return this.value},StringValue}();IIIFComponents.StringValue=StringValue}(IIIFComponents||(IIIFComponents={}));var IIIFComponents,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();!function(IIIFComponents){var MetadataComponentOptions;!function(MetadataComponentOptions){var LimitType=function(_super){function LimitType(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(LimitType,_super),LimitType.LINES=new LimitType("lines"),LimitType.CHARS=new LimitType("chars"),LimitType}(IIIFComponents.StringValue);MetadataComponentOptions.LimitType=LimitType}(MetadataComponentOptions=IIIFComponents.MetadataComponentOptions||(IIIFComponents.MetadataComponentOptions={}))}(IIIFComponents||(IIIFComponents={}));var IIIFComponents,__extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();Manifold.MetadataGroup;!function(IIIFComponents){var MetadataComponent=function(_super){function MetadataComponent(options){var _this=_super.call(this,options)||this;return _this._init(),_this._resize(),_this}return __extends(MetadataComponent,_super),MetadataComponent.prototype._init=function(){var success=_super.prototype._init.call(this);return success||console.error("Component failed to initialise"),this._$metadataGroupTemplate=$('<div class="group">                                                   <div class="header"></div>                                                   <div class="items"></div>                                               </div>'),this._$metadataItemTemplate=$('<div class="item">                                                   <div class="label"></div>                                                   <div class="values"></div>                                               </div>'),this._$metadataItemValueTemplate=$('<div class="value"></div>'),this._$metadataItemURIValueTemplate=$('<a class="value" href="" target="_blank"></a>'),this._$copyTextTemplate=$('<div class="copyText" alt="'+this.options.data.content.copyToClipboard+'" title="'+this.options.data.content.copyToClipboard+'">                                                   <div class="copiedText">'+this.options.data.content.copiedToClipboard+" </div>                                               </div>"),this._$metadataGroups=$('<div class="groups"></div>'),this._$element.append(this._$metadataGroups),this._$noData=$('<div class="noData">'+this.options.data.content.noData+"</div>"),this._$element.append(this._$noData),success},MetadataComponent.prototype.data=function(){return{aggregateValues:"",canvases:null,canvasDisplayOrder:"",metadataGroupOrder:"",canvasExclude:"",canvasLabels:"",content:{attribution:"Attribution",canvasHeader:"About the canvas",copiedToClipboard:"Copied to clipboard",copyToClipboard:"Copy to clipboard",description:"Description",imageHeader:"About the image",less:"less",license:"License",logo:"Logo",manifestHeader:"About the item",more:"more",noData:"No data to display",rangeHeader:"About the range",sequenceHeader:"About the sequence"},copiedMessageDuration:2e3,copyToClipboardEnabled:!1,helper:null,licenseFormatter:null,limit:4,limitType:IIIFComponents.MetadataComponentOptions.LimitType.LINES,manifestDisplayOrder:"",manifestExclude:"",range:null,rtlLanguageCodes:"ar, ara, dv, div, he, heb, ur, urd",sanitizer:function(html){return html},showAllLanguages:!1}},MetadataComponent.prototype._getManifestGroup=function(){return this._metadataGroups.en().where(function(x){return x.resource.isManifest()}).first()},MetadataComponent.prototype._getCanvasGroups=function(){return this._metadataGroups.en().where(function(x){return x.resource.isCanvas()}).toArray()},MetadataComponent.prototype.set=function(){var _this=this;this._$metadataGroups.empty();var options={canvases:this.options.data.canvases,licenseFormatter:this.options.data.licenseFormatter,range:this.options.data.range};if(this._metadataGroups=this.options.data.helper.getMetadata(options),this.options.data.manifestDisplayOrder){var manifestGroup=this._getManifestGroup();manifestGroup.items=this._sortItems(manifestGroup.items,this._readCSV(this.options.data.manifestDisplayOrder))}if(this.options.data.canvasDisplayOrder){var canvasGroups=this._getCanvasGroups();$.each(canvasGroups,function(index,canvasGroup){canvasGroup.items=_this._sortItems(canvasGroup.items,_this._readCSV(_this.options.data.canvasDisplayOrder))})}if(this.options.data.metadataGroupOrder&&(this._metadataGroups=this._sortGroups(this._metadataGroups,this._readCSV(this.options.data.metadataGroupOrder))),this.options.data.canvasLabels&&this._label(this._getCanvasGroups(),this._readCSV(this.options.data.canvasLabels,!1)),this.options.data.manifestExclude){var manifestGroup=this._getManifestGroup();manifestGroup.items=this._exclude(manifestGroup.items,this._readCSV(this.options.data.manifestExclude))}if(this.options.data.canvasExclude){var canvasGroups=this._getCanvasGroups();$.each(canvasGroups,function(index,canvasGroup){canvasGroup.items=_this._exclude(canvasGroup.items,_this._readCSV(_this.options.data.canvasExclude))})}return this._metadataGroups.length?(this._$noData.hide(),void this._render()):void this._$noData.show()},MetadataComponent.prototype._sortItems=function(items,displayOrder){var _this=this,sorted=[],unsorted=items.slice(0);return $.each(displayOrder,function(index,item){var match=unsorted.en().where(function(x){return _this._normalise(x.getLabel())===item}).first();if(match){sorted.push(match);var index_1=unsorted.indexOf(match);index_1>-1&&unsorted.splice(index_1,1)}}),$.each(unsorted,function(index,item){sorted.push(item)}),sorted},MetadataComponent.prototype._sortGroups=function(groups,metadataGroupOrder){var sorted=[],unsorted=groups.slice(0);return $.each(metadataGroupOrder,function(index,group){var match=unsorted.en().where(function(x){return x.resource.constructor.name.toLowerCase()==group}).first();if(match){sorted.push(match);var index_2=unsorted.indexOf(match);index_2>-1&&unsorted.splice(index_2,1)}}),sorted},MetadataComponent.prototype._label=function(groups,labels){$.each(groups,function(index,group){group.label=labels[index]})},MetadataComponent.prototype._exclude=function(items,excludeConfig){var _this=this;return $.each(excludeConfig,function(index,item){var match=items.en().where(function(x){return _this._normalise(x.getLabel())===item}).first();if(match){var index_3=items.indexOf(match);index_3>-1&&items.splice(index_3,1)}}),items},MetadataComponent.prototype._normalise=function(value){return value?value.toLowerCase().replace(/ /g,""):null},MetadataComponent.prototype._render=function(){var _this=this;$.each(this._metadataGroups,function(index,metadataGroup){var $metadataGroup=_this._buildMetadataGroup(metadataGroup);_this._$metadataGroups.append($metadataGroup),_this.options.data.limitType===IIIFComponents.MetadataComponentOptions.LimitType.LINES?$metadataGroup.find(".value").toggleExpandTextByLines(_this.options.data.limit,_this.options.data.content.less,_this.options.data.content.more,function(){}):_this.options.data.limitType===IIIFComponents.MetadataComponentOptions.LimitType.CHARS&&$metadataGroup.find(".value").ellipsisHtmlFixed(_this.options.data.limit,function(){})})},MetadataComponent.prototype._buildMetadataGroup=function(metadataGroup){var $metadataGroup=this._$metadataGroupTemplate.clone(),$header=$metadataGroup.find(">.header");if(metadataGroup.resource.isManifest()&&this.options.data.content.manifestHeader)$header.html(this._sanitize(this.options.data.content.manifestHeader));else if(metadataGroup.resource.isSequence()&&this.options.data.content.sequenceHeader)$header.html(this._sanitize(this.options.data.content.sequenceHeader));else if(metadataGroup.resource.isRange()&&this.options.data.content.rangeHeader)$header.html(this._sanitize(this.options.data.content.rangeHeader));else if(metadataGroup.resource.isCanvas()&&(metadataGroup.label||this.options.data.content.canvasHeader)){var header=metadataGroup.label||this.options.data.content.canvasHeader;$header.html(this._sanitize(header))}else metadataGroup.resource.isAnnotation()&&this.options.data.content.imageHeader&&$header.html(this._sanitize(this.options.data.content.imageHeader));$header.text()||$header.hide();for(var $items=$metadataGroup.find(".items"),i=0;i<metadataGroup.items.length;i++){var item=metadataGroup.items[i],$metadataItem=this._buildMetadataItem(item);$items.append($metadataItem)}return $metadataGroup},MetadataComponent.prototype._buildMetadataItem=function(item){var $metadataItem=this._$metadataItemTemplate.clone(),$label=$metadataItem.find(".label"),$values=$metadataItem.find(".values"),originalLabel=item.getLabel(),label=originalLabel,urlPattern=new RegExp("/w+:(/?/?)[^s]+/gm","i");if(label&&item.isRootLevel)switch(label.toLowerCase()){case"attribution":label=this.options.data.content.attribution;break;case"description":label=this.options.data.content.description;break;case"license":label=this.options.data.content.license;break;case"logo":label=this.options.data.content.logo}label=this._sanitize(label),$label.html(label),this._addReadingDirection($label,this._getItemLocale(item)),$metadataItem.addClass(Utils.Strings.toCssClass(label));var $value;if(originalLabel&&"license"===originalLabel.toLowerCase()&&null!=urlPattern.exec(item.value[0].value))$value=this._buildMetadataItemURIValue(item.value[0].value),$values.append($value);else if(this.options.data.showAllLanguages&&item.value&&item.value.length>1)for(var i=0;i<item.value.length;i++){var translation=item.value[i];$value=this._buildMetadataItemValue(translation.value,translation.locale),$values.append($value)}else{for(var itemLocale=this._getItemLocale(item),valueFound=!1,i=0;i<item.value.length;i++){var translation=item.value[i];itemLocale===translation.locale&&(valueFound=!0,$value=this._buildMetadataItemValue(translation.value,translation.locale),$values.append($value))}if(!valueFound){var translation=item.value[0];translation&&($value=this._buildMetadataItemValue(translation.value,translation.locale),$values.append($value))}}return this.options.data.copyToClipboardEnabled&&Utils.Clipboard.supportsCopy()&&$label.text()&&this._addCopyButton($metadataItem,$label,$values),$metadataItem},MetadataComponent.prototype._getItemLocale=function(item){return item.label.length&&item.label[0].locale?item.label[0].locale:item.defaultLocale||this.options.data.helper.options.locale},MetadataComponent.prototype._buildMetadataItemValue=function(value,locale){value=this._sanitize(value),value=value.replace("\n","<br>");var $value=this._$metadataItemValueTemplate.clone();return $value.html(value),$value.targetBlank(),locale&&this._addReadingDirection($value,locale),$value},MetadataComponent.prototype._buildMetadataItemURIValue=function(value){value=this._sanitize(value);var $value=this._$metadataItemURIValueTemplate.clone();return $value.prop("href",value),$value.text(value),$value},MetadataComponent.prototype._addReadingDirection=function($elem,locale){locale=Manifesto.Utils.getInexactLocale(locale);var rtlLanguages=this._readCSV(this.options.data.rtlLanguageCodes),match=rtlLanguages.en().where(function(x){return x===locale}).toArray().length>0;match&&($elem.prop("dir","rtl"),$elem.addClass("rtl"))},MetadataComponent.prototype._addCopyButton=function($elem,$header,$values){var $copyBtn=this._$copyTextTemplate.clone(),$copiedText=$copyBtn.children();$header.append($copyBtn),Utils.Device.isTouch()?$copyBtn.show():($elem.on("mouseenter",function(){$copyBtn.show()}),$elem.on("mouseleave",function(){$copyBtn.hide()}),$copyBtn.on("mouseleave",function(){$copiedText.hide()}));var that=this,originalValue=$values.text();$copyBtn.on("click",function(e){that._copyItemValues($copyBtn,originalValue)})},MetadataComponent.prototype._copyItemValues=function($copyButton,originalValue){Utils.Clipboard.copy(originalValue);var $copiedText=$copyButton.find(".copiedText");$copiedText.show(),setTimeout(function(){$copiedText.hide()},this.options.data.copiedMessageDuration)},MetadataComponent.prototype._readCSV=function(config,normalise){void 0===normalise&&(normalise=!0);var csv=[];if(config&&(csv=config.split(","),normalise))for(var i=0;i<csv.length;i++)csv[i]=this._normalise(csv[i]);return csv},MetadataComponent.prototype._sanitize=function(html){return this.options.data.sanitizer(html)},MetadataComponent.prototype._resize=function(){},MetadataComponent}(_Components.BaseComponent);IIIFComponents.MetadataComponent=MetadataComponent}(IIIFComponents||(IIIFComponents={})),function(IIIFComponents){var MetadataComponent;!function(MetadataComponent){var Events=function(){function Events(){}return Events}();MetadataComponent.Events=Events}(MetadataComponent=IIIFComponents.MetadataComponent||(IIIFComponents.MetadataComponent={}))}(IIIFComponents||(IIIFComponents={})),function(g){g.IIIFComponents?(g.IIIFComponents.MetadataComponent=IIIFComponents.MetadataComponent,g.IIIFComponents.MetadataComponentOptions=IIIFComponents.MetadataComponentOptions):g.IIIFComponents=IIIFComponents}(global)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});