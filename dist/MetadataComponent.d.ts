/// <reference types="@iiif/manifold" />
/// <reference types="manifesto.js" />
/// <reference types="@iiif/base-component" />
import MetadataItem = Manifold.IMetadataItem;
import MetadataGroup = Manifold.MetadataGroup;
declare type csvvalue = string | null;
declare namespace IIIFComponents {
    interface IMetadataComponentContent {
        attribution: string;
        canvasHeader: string;
        copiedToClipboard: string;
        copyToClipboard: string;
        description: string;
        imageHeader: string;
        less: string;
        license: string;
        logo: string;
        manifestHeader: string;
        more: string;
        noData: string;
        rangeHeader: string;
        sequenceHeader: string;
    }
    interface IMetadataComponentData {
        canvasDisplayOrder: string;
        metadataGroupOrder: string;
        canvases: Manifesto.ICanvas[] | null;
        canvasExclude: string;
        canvasLabels: string;
        content: IMetadataComponentContent;
        copiedMessageDuration: number;
        copyToClipboardEnabled: boolean;
        helper: Manifold.IHelper | null;
        licenseFormatter: Manifold.UriLabeller | null;
        limit: number;
        limitType: LimitType;
        limitToRange: boolean;
        manifestDisplayOrder: string;
        manifestExclude: string;
        range: Manifesto.IRange | null;
        rtlLanguageCodes: string;
        sanitizer: (html: string) => string;
        showAllLanguages: boolean;
    }
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
    class LimitType extends StringValue {
        static LINES: LimitType;
        static CHARS: LimitType;
    }
    class MetadataComponent extends _Components.BaseComponent {
        options: _Components.IBaseComponentOptions;
        private _$copyTextTemplate;
        private _$metadataGroups;
        private _$metadataGroupTemplate;
        private _$metadataItemTemplate;
        private _$metadataItemURIValueTemplate;
        private _$metadataItemValueTemplate;
        private _$noData;
        private _data;
        private _metadataGroups;
        constructor(options: _Components.IBaseComponentOptions);
        protected _init(): boolean;
        data(): IMetadataComponentData;
        private _getManifestGroup;
        private _getCanvasGroups;
        set(data: IMetadataComponentData): void;
        private _sortItems;
        private _sortGroups;
        private _label;
        private _exclude;
        private _normalise;
        private _render;
        private _buildMetadataGroup;
        private _buildMetadataItem;
        private _getLabelLocale;
        private _getValueLocale;
        private _buildMetadataItemValue;
        private _buildMetadataItemURIValue;
        private _addReadingDirection;
        private _addCopyButton;
        private _copyItemValues;
        private _readCSV;
        private _sanitize;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.MetadataComponent {
    class Events {
        static IIIF_VIEWER_LINK_CLICKED: string;
    }
}
