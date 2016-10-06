namespace IIIFComponents.MetadataComponentOptions {
    export class LimitType extends StringValue{
        public static LINES = new LimitType("lines");
        public static CHARS = new LimitType("chars");

        // todo: use getters when ES3 target is no longer required.

        lines(): LimitType {
            return new LimitType(LimitType.LINES.toString());
        }

        chars(): LimitType {
            return new LimitType(LimitType.CHARS.toString());
        }
    }
}