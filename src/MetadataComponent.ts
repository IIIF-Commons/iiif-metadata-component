import IMetadataItem = Manifold.IMetadataItem;

namespace IIIFComponents {
    export class MetadataComponent extends _Components.BaseComponent {

        public options: IMetadataComponentOptions;

        private _$canvasItems: JQuery;
        private _$copyTextTemplate: JQuery;
        private _$items: JQuery;
        private _$moreInfoItemTemplate: JQuery;
        private _$noData: JQuery;
        private _aggregateValuesConfig: string[];
        private _canvasData: IMetadataItem[];
        private _canvasExcludeConfig: string[];
        private _manifestData: IMetadataItem[];

        constructor(options: IMetadataComponentOptions) {
            super(options);
            
            this._init();
            this._resize();
        }

        protected _init(): boolean {
            var success: boolean = super._init();

            if (!success){
                console.error("Component failed to initialise");
            }

            this._$moreInfoItemTemplate =   $('<div class="item">\
                                                   <div class="header"></div>\
                                                   <div class="text"></div>\
                                               </div>');

            this._$copyTextTemplate =       $('<div class="copyText" alt="' + this.options.content.copyToClipboard  + '" title="' + this.options.content.copyToClipboard + '">\
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
        }
        
        protected _getDefaultOptions(): IMetadataComponentOptions {
            return <IMetadataComponentOptions>{
                aggregateValues: "",
                canvasExclude: "", // csv of items to exclude from canvas metadata display
                content: <IContent>{
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
                displayOrder: "", // csv of items to override display order
                helper: null,
                limit: 4,
                limitType: LimitType.LINES.toString(),
                manifestExclude: "", // csv of items to exclude from manifest metadata display
                sanitizer: function(html) { return html } // see example for how to pass in a sanitizer
            }
        }

        public databind(): void {

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

            if (this._manifestData.length === 0 && this._canvasData.length === 0){
                this._$noData.show();
                return;
            }

            this._$noData.hide();

            var manifestRenderData = $.extend(true, [], this._manifestData);
            var canvasRenderData = $.extend(true, [], this._canvasData);
        
            this._aggregateValues(manifestRenderData, canvasRenderData);
            this._renderElement(this._$items, manifestRenderData, this.options.content.manifestHeader, canvasRenderData.length !== 0);
            this._renderElement(this._$canvasItems, canvasRenderData, this.options.content.canvasHeader, manifestRenderData.length !== 0);
        }

        private _sort(data: IMetadataItem[], displayOrder: string[]) {
            // sort items
            var sorted: IMetadataItem[] = [];

            $.each(displayOrder, (index: number, item: string) => {
                var match: IMetadataItem = data.en().where((x => x.label.toLowerCase() === item)).first();
                if (match){
                    sorted.push(match);
                    data.remove(match);
                }
            });

            // add remaining items that were not in the displayOrder.
            $.each(data, (item: IMetadataItem) => {
                sorted.push(item);
            });

            return sorted;
        }

        private _exclude(data: IMetadataItem[], excludeConfig: string[]) {
            var excluded: IMetadataItem[] = $.extend(true, [], data);
            
            $.each(excludeConfig, (index: number, item: string) => {
                var match: IMetadataItem = excluded.en().where((x => x.label.toLowerCase() === item)).first();
                if (match){
                    excluded.remove(match);
                }
            });
            
            return excluded;
        }
        
        private _flatten(data: IMetadataItem[]) {
            // flatten metadata into array.
            var flattened: IMetadataItem[] = [];

            $.each(data, (index: number, item: any) => {
                if (Array.isArray(item.value)){
                    flattened = flattened.concat(<IMetadataItem[]>item.value);
                } else {
                    flattened.push(item);
                }
            });

            return flattened;
        }

        private _aggregateValues(fromData: any[], toData: any[]) {
            if (this._aggregateValuesConfig.length !== 0) {
                $.each(toData, (index: number, item: any) => {
                    $.each(this._aggregateValuesConfig, (index: number, value: string) => {
                        if (item.label.toLowerCase() === value) {
                            var manifestIndex: number = fromData.en().where(x => x.label.toLowerCase() === value.toLowerCase()).first().index();

                            if (manifestIndex !== -1) {
                                var data = fromData.splice(manifestIndex, 1)[0];
                                item.value = data.value + item.value;
                            }
                        }
                    });
                });
            }
        }

        private _renderElement(element: JQuery, data: any, header: string, renderHeader: boolean) {
            element.empty();

            if (data.length !== 0) {

                if (renderHeader && header){
                    element.append(this._buildHeader(header));
                }

                $.each(data, (index: number, item: any) => {
                    var built = this._buildItem(item);
                    element.append(built);
                    if (this.options.limitType === LimitType.LINES.toString()) {
                        built.find('.text').toggleExpandTextByLines(this.options.limit, this.options.content.less, this.options.content.more);
                    } else if (this.options.limitType === LimitType.CHARS.toString()) {
                        built.find('.text').ellipsisHtmlFixed(this.options.limit, null);
                    }
                });
            }
        }

        private _buildHeader(label: string): JQuery {
            var $header = $('<div class="header"></div>');
            $header.html(this._sanitize(label));

            return $header;
        }

        private _buildItem(item: IMetadataItem): any {
            var $elem = this._$moreInfoItemTemplate.clone();
            var $header = $elem.find('.header');
            var $text = $elem.find('.text');

            item.label = this._sanitize(item.label);
            item.value = this._sanitize(<string>item.value);

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
            item.value = (<string>item.value).replace('\n', '<br>');

            $header.html(item.label);
            $text.html(<string>item.value);
            $text.targetBlank();

            item.label = item.label.trim();
            item.label = item.label.toLowerCase();

            $elem.addClass(item.label.toCssClass());

            if (this.options.copyToClipboardEnabled && Utils.Clipboard.supportsCopy() && $text.text() && $header.text()){
                this._addCopyButton($elem, $header);
            }
            
            return $elem;
        }
        
        private _addCopyButton($elem: JQuery, $header: JQuery): void {
            var $copyBtn = this._$copyTextTemplate.clone();
            var $copiedText = $copyBtn.children();
            $header.append($copyBtn);

            if (Utils.Device.isTouch()) {
                $copyBtn.show();
            } else {
                $elem.on('mouseenter', function() {
                    $copyBtn.show();
                });
                $elem.on('mouseleave', function() {
                    $copyBtn.hide();
                });
                $copyBtn.on('mouseleave', function() {
                    $copiedText.hide();
                });
            }

            $copyBtn.on('click', (e) => {
                var imgElement = e.target as HTMLElement;
                var headerText = imgElement.previousSibling.textContent || imgElement.previousSibling.nodeValue;
                this._copyValueForLabel(headerText);
            });
        }
        
        private _copyValueForLabel(label: string) {
            var manifestItems = this._flatten(this._manifestData);
            var canvasItems = this._flatten(this._canvasData);
            var $matchingItems = $(manifestItems.concat(canvasItems))
                .filter(function (i, md: any) { return md.label && label && md.label.toLowerCase() === label.toLowerCase(); });

            var text = $matchingItems.map(function (i, md: any) { return md.value; }).get().join('');

            if (!text) return;

            Utils.Clipboard.copy(text);

            var $copiedText = $('.items .item .header:contains(' + label + ') .copiedText');
            $copiedText.show();

            setTimeout(function() {
                $copiedText.hide();
            }, 2000);
        }

        private _getCanvasData(canvas: Manifesto.ICanvas) {
            var data = this.options.helper.getCanvasMetadata(canvas);
                
            if (this._canvasExcludeConfig.length !== 0) {
                data = this._exclude(data, this._canvasExcludeConfig);
            }
            
            return this._flatten(data);
        }
        
        private _readCSV(config: string): string[] {
            if (config) {
                return config
                    .toLowerCase()
                    .replace(/ /g,"")
                    .split(',');
            }

            return [];
        }
        
        private _sanitize(html: string) {
            return this.options.sanitizer(html);
        }

        protected _resize(): void {
            
        }
    }
}

namespace IIIFComponents.MetadataComponent {
    export class Events {
        
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.MetadataComponent = IIIFComponents.MetadataComponent;
    }
})(window);