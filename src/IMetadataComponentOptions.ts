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