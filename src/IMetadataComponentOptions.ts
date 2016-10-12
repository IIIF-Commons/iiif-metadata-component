namespace IIIFComponents{
    
    export interface IContent {
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
    
    export interface IMetadataComponentOptions extends _Components.IBaseComponentOptions {
        //aggregateValues: string;                        // csv of metadata items to merge into a single item
        canvasDisplayOrder: string;                     // csv of items to override display order
        canvases: Manifesto.ICanvas[];                  // which canvases to include
        canvasExclude: string;                          // csv of items to exclude from canvas metadata display
        canvasLabels: string;                           // csv of labels to use for canvas groups
        content: IContent;
        copyToClipboardEnabled: boolean;
        helper: Manifold.IHelper;
        licenseFormatter: Manifold.UriLabeller;
        limit: number;
        limitType: MetadataComponentOptions.LimitType;
        manifestDisplayOrder: string;                   // csv of items to override display order
        manifestExclude: string;                        // csv of items to exclude from manifest metadata display
        range: Manifesto.IRange;                        // which range to include
        sanitizer: (html: string) => string;            // see example for how to pass in a sanitizer
    }
}