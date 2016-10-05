// iiif-metadata-component v1.0.0 https://github.com/viewdir/iiif-metadata-component#readme
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.iiifMetadataComponent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var IIIFComponents;
(function (IIIFComponents) {
    var StringValue = (function () {
        function StringValue(value) {
            this.value = "";
            if (value) {
                this.value = value.toLowerCase();
            }
        }
        StringValue.prototype.toString = function () {
            return this.value;
        };
        return StringValue;
    }());
    IIIFComponents.StringValue = StringValue;
})(IIIFComponents || (IIIFComponents = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IIIFComponents;
(function (IIIFComponents) {
    var LimitType = (function (_super) {
        __extends(LimitType, _super);
        function LimitType() {
            _super.apply(this, arguments);
        }
        LimitType.LINES = new LimitType("lines");
        LimitType.CHARS = new LimitType("chars");
        return LimitType;
    }(IIIFComponents.StringValue));
    IIIFComponents.LimitType = LimitType;
})(IIIFComponents || (IIIFComponents = {}));

/// <reference path="./StringValue.ts" />
/// <reference path="./LimitType.ts" /> 



var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IIIFComponents;
(function (IIIFComponents) {
    var MetadataComponent = (function (_super) {
        __extends(MetadataComponent, _super);
        function MetadataComponent(options) {
            _super.call(this, options);
            this._init();
            this._resize();
        }
        MetadataComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("Component failed to initialise");
            }
            this._$moreInfoItemTemplate = $('<div class="item">\
                                                   <div class="header"></div>\
                                                   <div class="text"></div>\
                                               </div>');
            this._$copyTextTemplate = $('<div class="copyText" alt="' + this.options.content.copyToClipboard + '" title="' + this.options.content.copyToClipboard + '">\
                                                   <div class="copiedText">' + this.options.content.copiedToClipboard + ' </div>\
                                               </div>');
            this._$items = $('<div class="items"></div>');
            this._$element.append(this._$items);
            this._$canvasItems = $('<div class="items"></div>');
            this._$element.append(this._$canvasItems);
            this._$noData = $('<div class="noData">' + this.options.content.noData + '</div>');
            this._$element.append(this._$noData);
            this._aggregateValuesConfig = this._readCSV(this.options.aggregateValues);
            this._canvasExcludeConfig = this._readCSV(this.options.canvasExclude);
            return success;
        };
        MetadataComponent.prototype._getDefaultOptions = function () {
            return {
                aggregateValues: "",
                canvasExclude: "",
                content: {
                    attribution: "Attribution",
                    canvasHeader: "About the image",
                    copiedToClipboard: "Copied to clipboard",
                    copyToClipboard: "Copy to clipboard",
                    description: "Description",
                    less: "less",
                    license: "License",
                    logo: "Logo",
                    manifestHeader: "About the item",
                    more: "more",
                    noData: "No data to display"
                },
                copyToClipboardEnabled: false,
                displayOrder: "",
                helper: null,
                limit: 4,
                limitType: IIIFComponents.LimitType.LINES.toString(),
                manifestExclude: "",
                sanitizer: function (html) { return html; } // see example for how to pass in a sanitizer
            };
        };
        MetadataComponent.prototype.databind = function () {
            // todo
            // if (this.extension.config.licenseMap){
            //     data = this.extension.helper.getMetadata(new Manifold.UriLabeller(this.extension.config.licenseMap));
            // } else {
            this._manifestData = this.options.helper.getMetadata();
            //}
            if (this.options.displayOrder) {
                this._manifestData = this._sort(this._manifestData, this._readCSV(this.options.displayOrder));
            }
            if (this.options.manifestExclude) {
                this._manifestData = this._exclude(this._manifestData, this._readCSV(this.options.manifestExclude));
            }
            this._manifestData = this._flatten(this._manifestData);
            this._canvasData = this._getCanvasData(this.options.helper.getCurrentCanvas());
            if (this._manifestData.length === 0 && this._canvasData.length === 0) {
                this._$noData.show();
                return;
            }
            this._$noData.hide();
            var manifestRenderData = $.extend(true, [], this._manifestData);
            var canvasRenderData = $.extend(true, [], this._canvasData);
            this._aggregateValues(manifestRenderData, canvasRenderData);
            this._renderElement(this._$items, manifestRenderData, this.options.content.manifestHeader, canvasRenderData.length !== 0);
            this._renderElement(this._$canvasItems, canvasRenderData, this.options.content.canvasHeader, manifestRenderData.length !== 0);
        };
        MetadataComponent.prototype._sort = function (data, displayOrder) {
            // sort items
            var sorted = [];
            $.each(displayOrder, function (index, item) {
                var match = data.en().where((function (x) { return x.label.toLowerCase() === item; })).first();
                if (match) {
                    sorted.push(match);
                    data.remove(match);
                }
            });
            // add remaining items that were not in the displayOrder.
            $.each(data, function (item) {
                sorted.push(item);
            });
            return sorted;
        };
        MetadataComponent.prototype._exclude = function (data, excludeConfig) {
            var excluded = $.extend(true, [], data);
            $.each(excludeConfig, function (index, item) {
                var match = excluded.en().where((function (x) { return x.label.toLowerCase() === item; })).first();
                if (match) {
                    excluded.remove(match);
                }
            });
            return excluded;
        };
        MetadataComponent.prototype._flatten = function (data) {
            // flatten metadata into array.
            var flattened = [];
            $.each(data, function (index, item) {
                if (Array.isArray(item.value)) {
                    flattened = flattened.concat(item.value);
                }
                else {
                    flattened.push(item);
                }
            });
            return flattened;
        };
        MetadataComponent.prototype._aggregateValues = function (fromData, toData) {
            var _this = this;
            if (this._aggregateValuesConfig.length !== 0) {
                $.each(toData, function (index, item) {
                    $.each(_this._aggregateValuesConfig, function (index, value) {
                        if (item.label.toLowerCase() === value) {
                            var manifestIndex = fromData.en().where(function (x) { return x.label.toLowerCase() === value.toLowerCase(); }).first().index();
                            if (manifestIndex !== -1) {
                                var data = fromData.splice(manifestIndex, 1)[0];
                                item.value = data.value + item.value;
                            }
                        }
                    });
                });
            }
        };
        MetadataComponent.prototype._renderElement = function (element, data, header, renderHeader) {
            var _this = this;
            element.empty();
            if (data.length !== 0) {
                if (renderHeader && header) {
                    element.append(this._buildHeader(header));
                }
                $.each(data, function (index, item) {
                    var built = _this._buildItem(item);
                    element.append(built);
                    if (_this.options.limitType === IIIFComponents.LimitType.LINES.toString()) {
                        built.find('.text').toggleExpandTextByLines(_this.options.limit, _this.options.content.less, _this.options.content.more);
                    }
                    else if (_this.options.limitType === IIIFComponents.LimitType.CHARS.toString()) {
                        built.find('.text').ellipsisHtmlFixed(_this.options.limit, null);
                    }
                });
            }
        };
        MetadataComponent.prototype._buildHeader = function (label) {
            var $header = $('<div class="header"></div>');
            $header.html(this._sanitize(label));
            return $header;
        };
        MetadataComponent.prototype._buildItem = function (item) {
            var $elem = this._$moreInfoItemTemplate.clone();
            var $header = $elem.find('.header');
            var $text = $elem.find('.text');
            item.label = this._sanitize(item.label);
            item.value = this._sanitize(item.value);
            if (item.isRootLevel) {
                switch (item.label.toLowerCase()) {
                    case "attribution":
                        item.label = this.options.content.attribution;
                        break;
                    case "description":
                        item.label = this.options.content.description;
                        break;
                    case "license":
                        item.label = this.options.content.license;
                        break;
                    case "logo":
                        item.label = this.options.content.logo;
                        break;
                }
            }
            // replace \n with <br>
            item.value = item.value.replace('\n', '<br>');
            $header.html(item.label);
            $text.html(item.value);
            $text.targetBlank();
            item.label = item.label.trim();
            item.label = item.label.toLowerCase();
            $elem.addClass(item.label.toCssClass());
            if (this.options.copyToClipboardEnabled && Utils.Clipboard.supportsCopy() && $text.text() && $header.text()) {
                this._addCopyButton($elem, $header);
            }
            return $elem;
        };
        MetadataComponent.prototype._addCopyButton = function ($elem, $header) {
            var _this = this;
            var $copyBtn = this._$copyTextTemplate.clone();
            var $copiedText = $copyBtn.children();
            $header.append($copyBtn);
            if (Utils.Device.isTouch()) {
                $copyBtn.show();
            }
            else {
                $elem.on('mouseenter', function () {
                    $copyBtn.show();
                });
                $elem.on('mouseleave', function () {
                    $copyBtn.hide();
                });
                $copyBtn.on('mouseleave', function () {
                    $copiedText.hide();
                });
            }
            $copyBtn.on('click', function (e) {
                var imgElement = e.target;
                var headerText = imgElement.previousSibling.textContent || imgElement.previousSibling.nodeValue;
                _this._copyValueForLabel(headerText);
            });
        };
        MetadataComponent.prototype._copyValueForLabel = function (label) {
            var manifestItems = this._flatten(this._manifestData);
            var canvasItems = this._flatten(this._canvasData);
            var $matchingItems = $(manifestItems.concat(canvasItems))
                .filter(function (i, md) { return md.label && label && md.label.toLowerCase() === label.toLowerCase(); });
            var text = $matchingItems.map(function (i, md) { return md.value; }).get().join('');
            if (!text)
                return;
            Utils.Clipboard.copy(text);
            var $copiedText = $('.items .item .header:contains(' + label + ') .copiedText');
            $copiedText.show();
            setTimeout(function () {
                $copiedText.hide();
            }, 2000);
        };
        MetadataComponent.prototype._getCanvasData = function (canvas) {
            var data = this.options.helper.getCanvasMetadata(canvas);
            if (this._canvasExcludeConfig.length !== 0) {
                data = this._exclude(data, this._canvasExcludeConfig);
            }
            return this._flatten(data);
        };
        MetadataComponent.prototype._readCSV = function (config) {
            if (config) {
                return config
                    .toLowerCase()
                    .replace(/ /g, "")
                    .split(',');
            }
            return [];
        };
        MetadataComponent.prototype._sanitize = function (html) {
            return this.options.sanitizer(html);
        };
        MetadataComponent.prototype._resize = function () {
        };
        return MetadataComponent;
    }(_Components.BaseComponent));
    IIIFComponents.MetadataComponent = MetadataComponent;
})(IIIFComponents || (IIIFComponents = {}));
var IIIFComponents;
(function (IIIFComponents) {
    var MetadataComponent;
    (function (MetadataComponent) {
        var Events = (function () {
            function Events() {
            }
            return Events;
        }());
        MetadataComponent.Events = Events;
    })(MetadataComponent = IIIFComponents.MetadataComponent || (IIIFComponents.MetadataComponent = {}));
})(IIIFComponents || (IIIFComponents = {}));
(function (w) {
    if (!w.IIIFComponents) {
        w.IIIFComponents = IIIFComponents;
    }
    else {
        w.IIIFComponents.MetadataComponent = IIIFComponents.MetadataComponent;
    }
})(window);

},{}]},{},[1])(1)
});