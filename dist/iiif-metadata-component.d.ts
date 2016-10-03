// iiif-metadata-component v1.0.0 https://github.com/viewdir/iiif-metadata-component#readme
declare namespace IIIFComponents {
    interface IMetadataComponentOptions extends _Components.IBaseComponentOptions {
        helper: Manifold.IHelper;
    }
}

declare namespace IIIFComponents {
    class MetadataComponent extends _Components.BaseComponent {
        constructor(options: IMetadataComponentOptions);
        protected _init(): boolean;
        protected _getDefaultOptions(): IMetadataComponentOptions;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.MetadataComponent {
    class Events {
        static TEST: string;
    }
}
