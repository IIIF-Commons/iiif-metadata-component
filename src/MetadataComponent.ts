import MetadataItem = Manifold.MetadataItem;
import MetadataGroup = Manifold.MetadataGroup;

namespace IIIFComponents {
    export class MetadataComponent extends _Components.BaseComponent implements IMetadataComponent{

        public options: IMetadataComponentOptions;

        private _$copyTextTemplate: JQuery;
        private _$metadataGroups: JQuery;
        private _$metadataGroupTemplate: JQuery;
        private _$metadataItemTemplate: JQuery;
        private _$metadataItemValueTemplate: JQuery;
        private _$noData: JQuery;
        //private _aggregateValues: string[];
        //private _canvasExclude: string[];
        private _metadataGroups: MetadataGroup[];

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
                                                   <div class="label"></div>\
                                                   <div class="values"></div>\
                                               </div>');
            
            this._$metadataItemValueTemplate = $('<div class="value"></div>');

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
                sanitizer: function(html) { return html },
                showAllLanguages: false
            }
        }

        private _getManifestGroup(): MetadataGroup {
            return this._metadataGroups.en().where(x => x.resource.isManifest()).first();
        }

        private _getCanvasGroups(): MetadataGroup[] {
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
                var manifestGroup: MetadataGroup = this._getManifestGroup();
                manifestGroup.items = this._sort(manifestGroup.items, this._readCSV(this.options.manifestDisplayOrder));
            }

            if (this.options.canvasDisplayOrder) {
                var canvasGroups: MetadataGroup[] = this._getCanvasGroups();

                $.each(canvasGroups, (index: number, canvasGroup: MetadataGroup) => {
                    canvasGroup.items = this._sort(canvasGroup.items, this._readCSV(this.options.canvasDisplayOrder));
                });
            }

            if (this.options.canvasLabels) {
                this._label(this._getCanvasGroups(), this._readCSV(this.options.canvasLabels, false));
            }
            
            if (this.options.manifestExclude) {
                var manifestGroup: MetadataGroup = this._getManifestGroup();
                manifestGroup.items = this._exclude(manifestGroup.items, this._readCSV(this.options.manifestExclude));
            }

            if (this.options.canvasExclude) {
                var canvasGroups: MetadataGroup[] = this._getCanvasGroups();

                $.each(canvasGroups, (index: number, canvasGroup: MetadataGroup) => {
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

        private _sort(items: MetadataItem[], displayOrder: string[]): MetadataItem[] {

            var sorted: MetadataItem[] = [];
            var unsorted: MetadataItem[] = items.clone();

            $.each(displayOrder, (index: number, item: string) => {
                var match: MetadataItem = unsorted.en().where((x => this._normalise(x.getLabel()) === item)).first();
                if (match){
                    sorted.push(match);
                    unsorted.remove(match);
                }
            });

            // add remaining items that were not in the displayOrder.
            $.each(unsorted, (index: number, item: MetadataItem) => {
                sorted.push(item);
            });

            return sorted;
        }

        private _label(groups: MetadataGroup[], labels: string[]): void {

            $.each(groups, (index: number, group: MetadataGroup) => {
                group.label = labels[index];
            });
        }

        private _exclude(items: MetadataItem[], excludeConfig: string[]): MetadataItem[] {

            $.each(excludeConfig, (index: number, item: string) => {
                var match: MetadataItem = items.en().where((x => this._normalise(x.getLabel()) === item)).first();
                if (match) {
                    items.remove(match);
                }
            });
            
            return items;
        }
        
        // private _flatten(items: MetadataItem[]): MetadataItem[] {
        //     // flatten metadata into array.
        //     var flattened: MetadataItem[] = [];

        //     $.each(items, (index: number, item: any) => {
        //         if (Array.isArray(item.value)){
        //             flattened = flattened.concat(<MetadataItem[]>item.value);
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

        private _render(): void {

            $.each(this._metadataGroups, (index: number, metadataGroup: MetadataGroup) => {
                var $metadataGroup: JQuery = this._buildMetadataGroup(metadataGroup);
                this._$metadataGroups.append($metadataGroup);

                if (this.options.limitType === MetadataComponentOptions.LimitType.LINES) {
                    $metadataGroup.find('.value').toggleExpandTextByLines(this.options.limit, this.options.content.less, this.options.content.more, () => {});
                } else if (this.options.limitType === MetadataComponentOptions.LimitType.CHARS) {
                    $metadataGroup.find('.value').ellipsisHtmlFixed(this.options.limit, null);
                }
            });
        }

        private _buildMetadataGroup(metadataGroup: MetadataGroup): JQuery {
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
                var item: Manifold.MetadataItem = metadataGroup.items[i];
                var $metadataItem: JQuery = this._buildMetadataItem(item);
                $items.append($metadataItem);
            }

            return $metadataGroup;
        }

        private _buildMetadataItem(item: MetadataItem): JQuery {
            var $metadataItem: JQuery = this._$metadataItemTemplate.clone();
            var $label: JQuery = $metadataItem.find('.label');
            var $values: JQuery = $metadataItem.find('.values');

            var label: string = item.getLabel();

            if (item.isRootLevel) {
                switch (label.toLowerCase()) {
                    case "attribution":
                        label = this.options.content.attribution;
                        break;
                    case "description":
                        label = this.options.content.description;
                        break;
                    case "license":
                        label = this.options.content.license;
                        break;
                    case "logo":
                        label = this.options.content.logo;
                        break;
                }
            }

            label = this._sanitize(label);
            $label.html(label);

            $metadataItem.addClass(label.toCssClass());

            var value: string;
            var $value: JQuery;

            if (this.options.showAllLanguages && item.value.length > 1) {
                for (var i = 0; i < item.value.length; i++) {
                    var translation: Manifesto.Translation = item.value[i];
                    $value = this._buildMetadataItemValue(translation.value);
                    $values.append($value);
                }
            } else {
                $value = this._buildMetadataItemValue(item.getValue());
                $values.append($value);
            }

            // if (this.options.copyToClipboardEnabled && Utils.Clipboard.supportsCopy() && $value.text() && $label.text()){
            //     this._addCopyButton($metadataItem, $label);
            // }

            return $metadataItem;
        }
        
        private _buildMetadataItemValue(value: string): JQuery {
            value = this._sanitize(value);
            value = value.replace('\n', '<br>'); // replace \n with <br>
            var $value: JQuery = this._$metadataItemValueTemplate.clone();
            $value.html(value);
            $value.targetBlank();
            return $value;
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
            // var manifestItems: MetadataItem[] = this._flatten(this._metadataGroups);
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