namespace IIIFComponents{
    
    export interface IMetadataComponentContent {
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
    
    export interface IMetadataComponentData {
        //aggregateValues: string;                      // csv of metadata items to merge into a single item
        canvasDisplayOrder: string;                     // csv of items to override display order
        metadataGroupOrder: string;                     // csv of metadata group display order, e.g. "manifest,sequence,range,canvas"
        canvases: Manifesto.ICanvas[] | null;           // which canvases to include
        canvasExclude: string;                          // csv of items to exclude from canvas metadata display
        canvasLabels: string;                           // csv of labels to use for canvas groups
        content: IMetadataComponentContent;
        copiedMessageDuration: number;                  // the duration in ms that the copied text message appears for
        copyToClipboardEnabled: boolean;
        helper: Manifold.IHelper | null;
        licenseFormatter: Manifold.UriLabeller | null;
        limit: number;
        limitType: MetadataComponentOptions.LimitType;
        limitToRange: boolean;                          // only show range metadata (if available)
        manifestDisplayOrder: string;                   // csv of items to override display order
        manifestExclude: string;                        // csv of items to exclude from manifest metadata display
        range: Manifesto.IRange | null;                 // which range to include
        rtlLanguageCodes: string;                       // csv of right-to-left language codes
        sanitizer: (html: string) => string;            // see example for how to pass in a sanitizer
        showAllLanguages: boolean;                      // display all translations
    }
}
