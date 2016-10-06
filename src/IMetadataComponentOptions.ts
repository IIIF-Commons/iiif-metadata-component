namespace IIIFComponents{
    
    export interface IContent {
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
    
    export interface IMetadataComponentOptions extends _Components.IBaseComponentOptions {
        aggregateValues: string;                // csv of metadata items to merge into a single item
        canvasExclude: string;                  // csv of items to exclude from canvas metadata display
        content: IContent;
        copyToClipboardEnabled: boolean;
        displayOrder: string;                   // csv of items to override display order
        helper: Manifold.IHelper;
        limit: number;
        limitType: MetadataComponentOptions.LimitType;
        manifestExclude: string;                // csv of items to exclude from manifest metadata display
        sanitizer: (html: string) => string;    // see example for how to pass in a sanitizer
    }
}