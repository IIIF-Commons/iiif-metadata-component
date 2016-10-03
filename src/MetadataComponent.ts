namespace IIIFComponents {
    export class MetadataComponent extends _Components.BaseComponent {

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
            
            this._$element.append("I am an example component");

            return success;
        }
        
        protected _getDefaultOptions(): IMetadataComponentOptions {
            return <IMetadataComponentOptions>{
            }
        }
        
        protected _resize(): void {
            
        }
    }
}

namespace IIIFComponents.MetadataComponent {
    export class Events {
        static TEST: string = 'test';
    }
}

(function(w) {
    if (!w.IIIFComponents){
        w.IIIFComponents = IIIFComponents;
    } else {
        w.IIIFComponents.MetadataComponent = IIIFComponents.MetadataComponent;
    }
})(window);