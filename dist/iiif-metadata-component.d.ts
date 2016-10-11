// iiif-metadata-component v1.0.0 https://github.com/viewdir/iiif-metadata-component#readme
declare namespace IIIFComponents {
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
}

declare namespace IIIFComponents.MetadataComponentOptions {
    class LimitType extends StringValue {
        static LINES: LimitType;
        static CHARS: LimitType;
    }
}

/// <reference path="StringValue.d.ts" />
/// <reference path="LimitType.d.ts" />

declare namespace IIIFComponents {
    interface IMetadataComponent extends _Components.IBaseComponent {
    }
}

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
        limitType: MetadataComponentOptions.LimitType;
        manifestExclude: string;
        metadataOptions: Manifold.MetadataOptions;
        sanitizer: (html: string) => string;
    }
}

import IMetadataItem = Manifold.IMetadataItem;
declare namespace IIIFComponents {
    class MetadataComponent extends _Components.BaseComponent implements IMetadataComponent {
        options: IMetadataComponentOptions;
        private _$copyTextTemplate;
        private _$metadataGroups;
        private _$metadataGroupTemplate;
        private _$metadataItemTemplate;
        private _$noData;
        private _metadataGroups;
        constructor(options: IMetadataComponentOptions);
        protected _init(): boolean;
        protected _getDefaultOptions(): IMetadataComponentOptions;
        databind(): void;
        private _sort(items, displayOrder);
        private _exclude(items, excludeConfig);
        private _flatten(items);
        private _normalise(value);
        private _render();
        private _buildMetadataGroup(metadataGroup);
        private _addCopyButton($elem, $header);
        private _copyValueForLabel(label);
        private _readCSV(config);
        private _sanitize(html);
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.MetadataComponent {
    class Events {
    }
}
