// iiif-metadata-component v1.0.0 https://github.com/viewdir/iiif-metadata-component#readme
declare namespace IIIFComponents {
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
}

declare namespace IIIFComponents {
    class LimitType extends StringValue {
        static LINES: LimitType;
        static CHARS: LimitType;
    }
}

/// <reference path="StringValue.d.ts" />
/// <reference path="LimitType.d.ts" />

declare namespace IIIFComponents {
    interface IContent {
        attribution: string;
        canvasHeader: string;
        copiedToClipboard: string;
        copyToClipboard: string;
        description: string;
        less: string;
        license: string;
        logo: string;
        manifestHeader: string;
        more: string;
        noData: string;
    }
    interface IMetadataComponentOptions extends _Components.IBaseComponentOptions {
        aggregateValues: string;
        canvasExclude: string;
        content: IContent;
        copyToClipboardEnabled: boolean;
        displayOrder: string;
        helper: Manifold.IHelper;
        limit: number;
        limitType: string;
        manifestExclude: string;
        sanitizer: (html: string) => string;
    }
}

import IMetadataItem = Manifold.IMetadataItem;
declare namespace IIIFComponents {
    class MetadataComponent extends _Components.BaseComponent {
        options: IMetadataComponentOptions;
        private _$canvasItems;
        private _$copyTextTemplate;
        private _$items;
        private _$moreInfoItemTemplate;
        private _$noData;
        private _aggregateValuesConfig;
        private _canvasMetadata;
        private _canvasExcludeConfig;
        private _manifestMetadata;
        constructor(options: IMetadataComponentOptions);
        protected _init(): boolean;
        protected _getDefaultOptions(): IMetadataComponentOptions;
        databind(): void;
        private _sort(data, displayOrder);
        private _exclude(data, excludeConfig);
        private _flatten(data);
        private _aggregateValues(manifestMetadata, canvasMetadata);
        private _normalise(value);
        private _renderElement(element, data, header, renderHeader);
        private _buildHeader(label);
        private _buildItem(item);
        private _addCopyButton($elem, $header);
        private _copyValueForLabel(label);
        private _getCanvasData(canvas);
        private _readCSV(config);
        private _sanitize(html);
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.MetadataComponent {
    class Events {
    }
}
