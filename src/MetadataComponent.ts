import IMetadataItem = Manifold.IMetadataItem;

namespace IIIFComponents {
    export class MetadataComponent extends _Components.BaseComponent implements IMetadataComponent{

        public options: IMetadataComponentOptions;

        private _$copyTextTemplate: JQuery;
        private _$metadataGroups: JQuery;
        private _$metadataGroupTemplate: JQuery;
        private _$metadataItemTemplate: JQuery;
        private _$noData: JQuery;
        //private _aggregateValues: string[];
        //private _canvasExclude: string[];
        private _metadataGroups: Manifold.MetadataGroup[];

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

            this._$metadataGroupTemplate =   $('<div class="group">\
                                                   <div class="header"></div>\
                                                   <div class="items"></div>\
                                               </div>');

            this._$metadataItemTemplate =   $('<div class="item">\
                                                   <div class="header"></div>\
                                                   <div class="text"></div>\
                                               </div>');

            this._$copyTextTemplate =       $('<div class="copyText" alt="' + this.options.content.copyToClipboard  + '" title="' + this.options.content.copyToClipboard + '">\
                                                   <div class="copiedText">' + this.options.content.copiedToClipboard + ' </div>\
                                               </div>');

            this._$metadataGroups = $('<div class="groups"></div>');
            this._$element.append(this._$metadataGroups);

            //this._$canvasItems = $('<div class="items"></div>');
            //this._$element.append(this._$canvasItems);

            this._$noData = $('<div class="noData">' + this.options.content.noData + '</div>');
            this._$element.append(this._$noData);

            //this._aggregateValues = this._readCSV(this.options.aggregateValues);
            //this._canvasExclude = this._readCSV(this.options.canvasExclude);

            return success;
        }
        
        protected _getDefaultOptions(): IMetadataComponentOptions {
            return <IMetadataComponentOptions>{
                aggregateValues: "",
                canvasExclude: "",
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
                displayOrder: "",
                helper: null,
                limit: 4,
                limitType: MetadataComponentOptions.LimitType.LINES,
                manifestExclude: "",
                metadataOptions: null,
                sanitizer: function(html) { return html }
            }
        }

        public databind(): void {

            // todo
            // if (this.extension.config.licenseMap){
            //     data = this.extension.helper.getMetadata(new Manifold.UriLabeller(this.extension.config.licenseMap));
            // } else {
                this._metadataGroups = this.options.helper.getMetadata(this.options.metadataOptions);
            //}

            // if (this.options.displayOrder) {
            //     this._metadataGroups = this._sort(<IMetadataItem[]>this._metadata[0].value, this._readCSV(this.options.displayOrder));
            // }
            
            // if (this.options.manifestExclude) {
            //     this._metadata = this._exclude(<IMetadataItem[]>this._metadata[0].value, this._readCSV(this.options.manifestExclude));
            // }
            
            //this._metadataGroups = this._flatten(this._metadata);

            //this._canvasMetadata = this._getCanvasData(this.options.helper.getCurrentCanvas());

            if (!this._metadataGroups.length){
                this._$noData.show();
                return;
            }

            this._$noData.hide();

            //this._aggregate(this._metadata, this._canvasMetadata);
            this._render();
            //this._render(this._$canvasItems, this._canvasMetadata, this.options.content.canvasHeader, this._metadata.length !== 0);
        }

        private _sort(items: IMetadataItem[], displayOrder: string[]): IMetadataItem[] {
            // sort items
            var sorted: IMetadataItem[] = [];
            var unsorted: IMetadataItem[] = items.clone();

            $.each(displayOrder, (index: number, item: string) => {
                var match: IMetadataItem = unsorted.en().where((x => this._normalise(x.label) === item)).first();
                if (match){
                    sorted.push(match);
                    unsorted.remove(match);
                }
            });

            // add remaining items that were not in the displayOrder.
            $.each(unsorted, (index: number, item: IMetadataItem) => {
                sorted.push(item);
            });

            return sorted;
        }

        private _exclude(items: IMetadataItem[], excludeConfig: string[]): IMetadataItem[] {

            $.each(excludeConfig, (index: number, item: string) => {
                var match: IMetadataItem = items.en().where((x => this._normalise(x.label) === item)).first();
                if (match) {
                    items.remove(match);
                }
            });
            
            return items;
        }
        
        private _flatten(items: IMetadataItem[]): IMetadataItem[] {
            // flatten metadata into array.
            var flattened: IMetadataItem[] = [];

            $.each(items, (index: number, item: any) => {
                if (Array.isArray(item.value)){
                    flattened = flattened.concat(<IMetadataItem[]>item.value);
                } else {
                    flattened.push(item);
                }
            });

            return flattened;
        }

        // merge any duplicate items into canvas metadata
        // todo: needs to be more generic taking a single concatenated array
        // private _aggregate(manifestMetadata: any[], canvasMetadata: any[]) {

        //     if (this._aggregateValues.length) {

        //         $.each(canvasMetadata, (index: number, canvasItem: any) => {

        //             $.each(this._aggregateValues, (index: number, value: string) => {

        //                 value = this._normalise(value);

        //                 if (this._normalise(canvasItem.label) === value) {
        //                     var manifestItem = manifestMetadata.en().where(x => this._normalise(x.label) === value).first();

        //                     if (manifestItem) {
        //                         canvasItem.value = manifestItem.value + canvasItem.value;
        //                         manifestMetadata.remove(manifestItem);
        //                     }
        //                 }  

        //             });

        //         });
        //     }
        // }

        private _normalise(value: string): string {
            return value.toLowerCase().replace(/ /g, "");
        }

        private _render() {

            // loop through metadata groups
            for (var i = 0; i < this._metadataGroups.length; i++) {
                var metadataGroup: Manifold.MetadataGroup = this._metadataGroups[i];

                var $metadataGroup: JQuery = this._buildMetadataGroup(metadataGroup);
                this._$metadataGroups.append($metadataGroup);

                if (this.options.limitType === MetadataComponentOptions.LimitType.LINES) {
                    $metadataGroup.find('.text').toggleExpandTextByLines(this.options.limit, this.options.content.less, this.options.content.more, () => {});
                } else if (this.options.limitType === MetadataComponentOptions.LimitType.CHARS) {
                    $metadataGroup.find('.text').ellipsisHtmlFixed(this.options.limit, null);
                }

            }
        }

        private _buildMetadataGroup(metadataGroup: Manifold.MetadataGroup): JQuery {
            var $metadataGroup: JQuery = this._$metadataGroupTemplate.clone();
            //var $header: JQuery = $metadataGroup.find('.header'); todo: add headers
            var $items: JQuery = $metadataGroup.find('.items');

            for (var i = 0; i < metadataGroup.items.length; i++) {

                var $metadataItem: JQuery = this._$metadataItemTemplate.clone();
                var $header: JQuery = $metadataItem.find('.header');
                var $text: JQuery = $metadataItem.find('.text');

                var item: Manifold.IMetadataItem = metadataGroup.items[i];

                item.label = this._sanitize(item.label);
                item.value = this._sanitize(<string>item.value);

                if (item.isTranslatable) {
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

                $metadataItem.addClass(item.label.toCssClass());

                if (this.options.copyToClipboardEnabled && Utils.Clipboard.supportsCopy() && $text.text() && $header.text()){
                    this._addCopyButton($metadataItem, $header);
                }

                $items.append($metadataItem);
            }

            return $metadataGroup;
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
            // var manifestItems: IMetadataItem[] = this._flatten(this._metadataGroups);
            // var $matchingItems = $(manifestItems.concat(canvasItems))
            //     .filter(function (i, md: any) { return md.label && label && md.label.toLowerCase() === label.toLowerCase(); });

            // var text = $matchingItems.map(function (i, md: any) { return md.value; }).get().join('');

            // if (!text) return;

            // Utils.Clipboard.copy(text);

            // var $copiedText = $('.items .item .header:contains(' + label + ') .copiedText');
            // $copiedText.show();

            // setTimeout(function() {
            //     $copiedText.hide();
            // }, 2000);
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
        w.IIIFComponents.MetadataComponentOptions = IIIFComponents.MetadataComponentOptions;
    }
})(window);