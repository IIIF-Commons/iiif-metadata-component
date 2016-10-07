namespace IIIFComponents.MetadataComponentOptions {
    export class LimitType extends StringValue{
        public static LINES = new LimitType("lines");
        public static CHARS = new LimitType("chars");
    }
}