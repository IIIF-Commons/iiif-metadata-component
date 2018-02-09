import MetadataItem = Manifold.IMetadataItem;
import MetadataGroup = Manifold.MetadataGroup;

type csvvalue = string | null;

namespace IIIFComponents {
    export class MetadataComponent extends _Components.BaseComponent implements IMetadataComponent{

        public options: _Components.IBaseComponentOptions;

        private _$copyTextTemplate: JQuery;
        private _$metadataGroups: JQuery;
        private _$metadataGroupTemplate: JQuery;
        private _$metadataItemTemplate: JQuery;
        private _$metadataItemValueTemplate: JQuery;
        private _$metadataItemURIValueTemplate: JQuery;
        private _$noData: JQuery;
        private _metadataGroups: MetadataGroup[];

        constructor(options: _Components.IBaseComponentOptions) {
            super(options);
            
            this._init();
            this._resize();
        }

        protected _init(): boolean {
            const success: boolean = super._init();

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

            this._$metadataItemURIValueTemplate = $('<a class="value" href="" target="_blank"></a>');

            this._$copyTextTemplate =       $('<div class="copyText" alt="' + this.options.data.content.copyToClipboard  + '" title="' + this.options.data.content.copyToClipboard + '">\
                                                   <div class="copiedText">' + this.options.data.content.copiedToClipboard + ' </div>\
                                               </div>');

            this._$metadataGroups = $('<div class="groups"></div>');
            this._$element.append(this._$metadataGroups);

            this._$noData = $('<div class="noData">' + this.options.data.content.noData + '</div>');
            this._$element.append(this._$noData);

            return success;
        }
        
        public data(): IMetadataComponentData {
            return <IMetadataComponentData>{
                aggregateValues: "",
                canvases: null,
                canvasDisplayOrder: "",
                metadataGroupOrder: "",
                canvasExclude: "",
                canvasLabels: "",
                content: <IMetadataComponentContent>{
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
                copiedMessageDuration: 2000,
                copyToClipboardEnabled: false,
                helper: null,
                licenseFormatter: null,
                limit: 4,
                limitType: MetadataComponentOptions.LimitType.LINES,
                manifestDisplayOrder: "",
                manifestExclude: "",
                range: null,
                rtlLanguageCodes: "ar, ara, dv, div, he, heb, ur, urd",
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

        public set(): void {

            this._$metadataGroups.empty();

            const options: Manifold.MetadataOptions = <Manifold.MetadataOptions>{
                canvases: this.options.data.canvases,
                licenseFormatter: this.options.data.licenseFormatter,
                range: this.options.data.range
            }

            this._metadataGroups = this.options.data.helper.getMetadata(options);

            if (this.options.data.manifestDisplayOrder) {
                const manifestGroup: MetadataGroup = this._getManifestGroup();
                manifestGroup.items = this._sortItems(manifestGroup.items, this._readCSV(this.options.data.manifestDisplayOrder));
            }

            if (this.options.data.canvasDisplayOrder) {
                const canvasGroups: MetadataGroup[] = this._getCanvasGroups();

                $.each(canvasGroups, (index: number, canvasGroup: MetadataGroup) => {
                    canvasGroup.items = this._sortItems(canvasGroup.items, this._readCSV(this.options.data.canvasDisplayOrder));
                });
            }
            if (this.options.data.metadataGroupOrder) {
                this._metadataGroups = this._sortGroups(this._metadataGroups, this._readCSV(this.options.data.metadataGroupOrder));
            }

            if (this.options.data.canvasLabels) {
                this._label(this._getCanvasGroups(), this._readCSV(this.options.data.canvasLabels, false));
            }

            if (this.options.data.manifestExclude) {
                const manifestGroup: MetadataGroup = this._getManifestGroup();
                manifestGroup.items = this._exclude(manifestGroup.items, this._readCSV(this.options.data.manifestExclude));
            }

            if (this.options.data.canvasExclude) {
                const canvasGroups: MetadataGroup[] = this._getCanvasGroups();

                $.each(canvasGroups, (index: number, canvasGroup: MetadataGroup) => {
                    canvasGroup.items = this._exclude(canvasGroup.items, this._readCSV(this.options.data.canvasExclude));
                });
            }

            if (!this._metadataGroups.length){
                this._$noData.show();
                return;
            }

            this._$noData.hide();

            this._render();
        }

        private _sortItems(items: MetadataItem[], displayOrder: csvvalue[]): MetadataItem[] {

            let sorted: MetadataItem[] = [];
            let unsorted: MetadataItem[] = items.clone();

            $.each(displayOrder, (index: number, item: string) => {
                const match: MetadataItem = unsorted.en().where((x => this._normalise(x.getLabel()) === item)).first();
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

        private _sortGroups(groups: MetadataGroup[], metadataGroupOrder: csvvalue[]): MetadataGroup[] {

            let sorted: MetadataGroup[] = [];
            let unsorted: MetadataGroup[] = groups.clone();

            $.each(metadataGroupOrder, (index: number, group: string) => {
                const match: MetadataGroup = unsorted.en().where(x => x.resource.constructor.name.toLowerCase() == group).first();
                if (match) {
                    sorted.push(match);
                    unsorted.remove(match);
                }
            });
            return sorted;
        }

        private _label(groups: MetadataGroup[], labels: csvvalue[]): void {

            $.each(groups, (index: number, group: MetadataGroup) => {
                group.label = <string>labels[index];
            });
        }

        private _exclude(items: MetadataItem[], excludeConfig: csvvalue[]): MetadataItem[] {

            $.each(excludeConfig, (index: number, item: string) => {
                const match: MetadataItem = items.en().where((x => this._normalise(x.getLabel()) === item)).first();
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

        private _normalise(value: string | null): string | null {
            if (value) {
                return value.toLowerCase().replace(/ /g, "");
            }
            
            return null;
        }

        private _render(): void {

            $.each(this._metadataGroups, (index: number, metadataGroup: MetadataGroup) => {
                const $metadataGroup: JQuery = this._buildMetadataGroup(metadataGroup);
                this._$metadataGroups.append($metadataGroup);

                if (this.options.data.limitType === MetadataComponentOptions.LimitType.LINES) {
                    $metadataGroup.find('.value').toggleExpandTextByLines(this.options.data.limit, this.options.data.content.less, this.options.data.content.more, () => {});
                } else if (this.options.data.limitType === MetadataComponentOptions.LimitType.CHARS) {
                    $metadataGroup.find('.value').ellipsisHtmlFixed(this.options.data.limit, () => {});
                }
            });
        }

        private _buildMetadataGroup(metadataGroup: MetadataGroup): JQuery {
            const $metadataGroup: JQuery = this._$metadataGroupTemplate.clone();
            const $header: JQuery = $metadataGroup.find('>.header');

            // add group header
            if (metadataGroup.resource.isManifest() && this.options.data.content.manifestHeader) {
                $header.html(this._sanitize(this.options.data.content.manifestHeader));
            } else if (metadataGroup.resource.isSequence() && this.options.data.content.sequenceHeader) {
                $header.html(this._sanitize(this.options.data.content.sequenceHeader));
            } else if (metadataGroup.resource.isRange() && this.options.data.content.rangeHeader) {
                $header.html(this._sanitize(this.options.data.content.rangeHeader));
            } else if (metadataGroup.resource.isCanvas() && (metadataGroup.label || this.options.data.content.canvasHeader)) {
                const header: string = metadataGroup.label || this.options.data.content.canvasHeader;
                $header.html(this._sanitize(header));
            } else if (metadataGroup.resource.isAnnotation() && this.options.data.content.imageHeader) {
                $header.html(this._sanitize(this.options.data.content.imageHeader));
            }

            if (!$header.text()) {
                $header.hide();
            }

            const $items: JQuery = $metadataGroup.find('.items');

            for (let i = 0; i < metadataGroup.items.length; i++) {
                const item: MetadataItem = metadataGroup.items[i];
                const $metadataItem: JQuery = this._buildMetadataItem(item);
                $items.append($metadataItem);
            }

            return $metadataGroup;
        }

        private _buildMetadataItem(item: MetadataItem): JQuery {
            const $metadataItem: JQuery = this._$metadataItemTemplate.clone();
            const $label: JQuery = $metadataItem.find('.label');
            const $values: JQuery = $metadataItem.find('.values');

            const originalLabel: string | null = item.getLabel();
            let label: string | null = originalLabel;
            var urlPattern = new RegExp("((<a href=\\\\\"http|https)(:\/\/))?(.*)", "i");

            if (label && item.isRootLevel) {
                switch (label.toLowerCase()) {
                    case "attribution":
                        label = this.options.data.content.attribution;
                        break;
                    case "description":
                        label = this.options.data.content.description;
                        break;
                    case "license":
                        label = this.options.data.content.license;
                        break;
                    case "logo":
                        label = this.options.data.content.logo;
                        break;
                }
            }

            label = this._sanitize(<string>label);
            $label.html(<string>label);

            // rtl?
            this._addReadingDirection($label, this._getItemLocale(item));

            $metadataItem.addClass((<string>label).toCssClass());

            let $value: JQuery;

            // if the value is a URI
            if (originalLabel && originalLabel.toLowerCase() === "license" && (urlPattern.exec(item.value[0].value) == null)) {
                $value = this._buildMetadataItemURIValue(item.value[0].value);
                $values.append($value);
            } else {

                if (this.options.data.showAllLanguages && item.value && item.value.length > 1) {
                    // display all values in each locale
                    for (let i = 0; i < item.value.length; i++) {
                        const translation: Manifesto.Translation = item.value[i];
                        $value = this._buildMetadataItemValue(translation.value, translation.locale);
                        $values.append($value);
                    }
                } else {

                    const itemLocale: string = this._getItemLocale(item);
                    let valueFound: boolean = false;

                    // display all values in the item's locale
                    for (let i = 0; i < item.value.length; i++) {
                        const translation: Manifesto.Translation = item.value[i];

                        if (itemLocale === translation.locale) {
                            valueFound = true;
                            $value = this._buildMetadataItemValue(translation.value, translation.locale);
                            $values.append($value);
                        }
                    }

                    // if no values were found in the current locale, default to the first.
                    if (!valueFound) {
                        const translation: Manifesto.Translation = item.value[0];

                        if (translation) {
                            $value = this._buildMetadataItemValue(translation.value, translation.locale);
                            $values.append($value);
                        }

                    }
                }
            }


            if (this.options.data.copyToClipboardEnabled && Utils.Clipboard.supportsCopy() && $label.text()){
                this._addCopyButton($metadataItem, $label, $values);
            }

            return $metadataItem;
        }

        private _getItemLocale(item: MetadataItem): string {
            // the item's label locale takes precedence
            return (item.label.length && item.label[0].locale) ? item.label[0].locale : item.defaultLocale || this.options.data.helper.options.locale;
        }

        private _buildMetadataItemValue(value: string, locale: string): JQuery {
            value = this._sanitize(value);
            value = value.replace('\n', '<br>'); // replace \n with <br>
            const $value: JQuery = this._$metadataItemValueTemplate.clone();
            $value.html(value);
            $value.targetBlank();

            // rtl?
            if (locale) {
                this._addReadingDirection($value, locale);
            }

            return $value;
        }

        private _buildMetadataItemURIValue(value: string): JQuery {
            value = this._sanitize(value);
            const $value: JQuery = this._$metadataItemURIValueTemplate.clone();
            $value.prop('href', value);
            $value.text(value);
            return $value;
        }

        private _addReadingDirection($elem: JQuery, locale: string) {
            locale = Manifesto.Utils.getInexactLocale(locale);
            const rtlLanguages: csvvalue[] = this._readCSV(this.options.data.rtlLanguageCodes);
            const match: boolean = rtlLanguages.en().where(x => x === locale).toArray().length > 0;

            if (match) {
                $elem.prop('dir', 'rtl');
                $elem.addClass('rtl');
            }
        }

        private _addCopyButton($elem: JQuery, $header: JQuery, $values: JQuery): void {
            const $copyBtn = this._$copyTextTemplate.clone();
            const $copiedText = $copyBtn.children();
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

            const that = this;

            const originalValue = $values.text();

            $copyBtn.on('click', function(e) {
                that._copyItemValues($copyBtn, originalValue);
            });
        }

        private _copyItemValues($copyButton: JQuery, originalValue: string) {
            Utils.Clipboard.copy(originalValue);

            const $copiedText = $copyButton.find('.copiedText');
            $copiedText.show();

            setTimeout(() => {
                $copiedText.hide();
            }, this.options.data.copiedMessageDuration);
        }
        
        private _readCSV(config: string, normalise: boolean = true): csvvalue[] {
            let csv: csvvalue[] = [];
            
            if (config) {

                csv = config.split(',');

                if (normalise) {
                    for (let i = 0; i < csv.length; i++) {
                        csv[i] = this._normalise(csv[i]);
                    }
                }

            }

            return csv;
        }
        
        private _sanitize(html: string) {
            return this.options.data.sanitizer(html);
        }

        protected _resize(): void {
            
        }
    }
}

namespace IIIFComponents.MetadataComponent {
    export class Events {
        
    }
}

(function(g: any) {
    if (!g.IIIFComponents){
        g.IIIFComponents = IIIFComponents;
    } else {
        g.IIIFComponents.MetadataComponent = IIIFComponents.MetadataComponent;
        g.IIIFComponents.MetadataComponentOptions = IIIFComponents.MetadataComponentOptions;
    }
})(global);
