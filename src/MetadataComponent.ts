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

            this._$noData = $('<div class="noData">' + this.options.content.noData + '</div>');
            this._$element.append(this._$noData);

            return success;
        }
        
        protected _getDefaultOptions(): IMetadataComponentOptions {
            return <IMetadataComponentOptions>{
                aggregateValues: "",
                canvases: null,
                canvasDisplayOrder: "",
                canvasExclude: "",
                canvasLabels: "",
                content: <IContent>{
                    attribution: "Attribution",
                    canvasHeader: "About the canvas",
                    copiedToClipboard: "Copied to clipboard",
                    copyToClipboard: "Copy to clipboard",
                    description: "Description",
                    imageHeader: "About the image",
                    less: "less",
                    license: "License",
                    logo: "Logo",
                    manifestHeader: "About the item",
                    more: "more",
                    noData: "No data to display",
                    rangeHeader: "About the range",
                    sequenceHeader: "About the sequence"
                },
                copyToClipboardEnabled: false,
                helper: null,
                licenseFormatter: null,
                limit: 4,
                limitType: MetadataComponentOptions.LimitType.LINES,
                manifestDisplayOrder: "",
                manifestExclude: "",
                range: null,
                sanitizer: function(html) { return html }
            }
        }

        private _getManifestGroup(): Manifold.MetadataGroup {
            return this._metadataGroups.en().where(x => x.resource.isManifest()).first();
        }

        private _getCanvasGroups(): Manifold.MetadataGroup[] {
            return this._metadataGroups.en().where(x => x.resource.isCanvas()).toArray();
        }

        public databind(): void {

            var options: Manifold.MetadataOptions = <Manifold.MetadataOptions>{
                canvases: this.options.canvases,
                licenseFormatter: this.options.licenseFormatter,
                range: this.options.range
            }

            this._metadataGroups = this.options.helper.getMetadata(options);

            if (this.options.manifestDisplayOrder) {
                var manifestGroup: Manifold.MetadataGroup = this._getManifestGroup();
                manifestGroup.items = this._sort(manifestGroup.items, this._readCSV(this.options.manifestDisplayOrder));
            }

            if (this.options.canvasDisplayOrder) {
                var canvasGroups: Manifold.MetadataGroup[] = this._getCanvasGroups();

                $.each(canvasGroups, (index: number, canvasGroup: Manifold.MetadataGroup) => {
                    canvasGroup.items = this._sort(canvasGroup.items, this._readCSV(this.options.canvasDisplayOrder));
                });
            }

            if (this.options.canvasLabels) {
                this._label(this._getCanvasGroups(), this._readCSV(this.options.canvasLabels, false));
            }
            
            if (this.options.manifestExclude) {
                var manifestGroup: Manifold.MetadataGroup = this._getManifestGroup();
                manifestGroup.items = this._exclude(manifestGroup.items, this._readCSV(this.options.manifestExclude));
            }

            if (this.options.canvasExclude) {
                var canvasGroups: Manifold.MetadataGroup[] = this._getCanvasGroups();

                $.each(canvasGroups, (index: number, canvasGroup: Manifold.MetadataGroup) => {
                    canvasGroup.items = this._exclude(canvasGroup.items, this._readCSV(this.options.canvasExclude));
                });
            }

            if (!this._metadataGroups.length){
                this._$noData.show();
                return;
            }

            this._$noData.hide();

            this._render();
        }

        private _sort(items: IMetadataItem[], displayOrder: string[]): IMetadataItem[] {

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

        private _label(groups: Manifold.MetadataGroup[], labels: string[]): void {

            $.each(groups, (index: number, group: Manifold.MetadataGroup) => {
                group.label = labels[index];
            });
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
        
        // private _flatten(items: IMetadataItem[]): IMetadataItem[] {
        //     // flatten metadata into array.
        //     var flattened: IMetadataItem[] = [];

        //     $.each(items, (index: number, item: any) => {
        //         if (Array.isArray(item.value)){
        //             flattened = flattened.concat(<IMetadataItem[]>item.value);
        //         } else {
        //             flattened.push(item);
        //         }
        //     });

        //     return flattened;
        // }

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

            $.each(this._metadataGroups, (index: number, metadataGroup: Manifold.MetadataGroup) => {
                var $metadataGroup: JQuery = this._buildMetadataGroup(metadataGroup);
                this._$metadataGroups.append($metadataGroup);

                if (this.options.limitType === MetadataComponentOptions.LimitType.LINES) {
                    $metadataGroup.find('.text').toggleExpandTextByLines(this.options.limit, this.options.content.less, this.options.content.more, () => {});
                } else if (this.options.limitType === MetadataComponentOptions.LimitType.CHARS) {
                    $metadataGroup.find('.text').ellipsisHtmlFixed(this.options.limit, null);
                }
            });
        }

        private _buildMetadataGroup(metadataGroup: Manifold.MetadataGroup): JQuery {
            var $metadataGroup: JQuery = this._$metadataGroupTemplate.clone();
            var $header: JQuery = $metadataGroup.find('>.header');

            // add group header
            if (metadataGroup.resource.isManifest() && this.options.content.manifestHeader) {
                $header.html(this._sanitize(this.options.content.manifestHeader));
            } else if (metadataGroup.resource.isSequence() && this.options.content.sequenceHeader) {
                $header.html(this._sanitize(this.options.content.sequenceHeader));
            } else if (metadataGroup.resource.isRange() && this.options.content.rangeHeader) {
                $header.html(this._sanitize(this.options.content.rangeHeader));
            } else if (metadataGroup.resource.isCanvas() && (metadataGroup.label || this.options.content.canvasHeader)) {
                var header: string = metadataGroup.label || this.options.content.canvasHeader;
                $header.html(this._sanitize(header));
            } else if (metadataGroup.resource.isAnnotation() && this.options.content.imageHeader) {
                $header.html(this._sanitize(this.options.content.imageHeader));
            }

            if (!$header.text()) {
                $header.hide();
            }

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
        
        private _readCSV(config: string, normalise: boolean = true): string[] {
            var csv: string[] = [];
            
            if (config) {

                csv = config.split(',');

                if (normalise) {
                    for (var i = 0; i < csv.length; i++) {
                        csv[i] = this._normalise(csv[i]);
                    }
                }

            }

            return csv;
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