// base-component v1.0.2 https://github.com/viewdir/base-component#readme
interface Window {
    _Components: any;
}

declare var TinyEmitter: any;
declare namespace _Components {
    class BaseComponent implements IBaseComponent {
        options: IBaseComponentOptions;
        protected _$element: JQuery;
        constructor(options: IBaseComponentOptions);
        protected _init(): boolean;
        protected _getDefaultOptions(): IBaseComponentOptions;
        protected _emit(event: string, ...args: any[]): void;
        protected _resize(): void;
        databind(data?: any): void;
    }
    function applyMixins(derivedCtor: any, baseCtors: any[]): void;
}

declare namespace _Components {
    interface IBaseComponent {
        options: IBaseComponentOptions;
        databind(data?: any): void;
    }
}

declare namespace _Components {
    interface IBaseComponentOptions {
        element?: string;
    }
}

interface JQueryStatic {
    mlp: any;
}

interface JQuery {
    checkboxButton(onClicked: (checked: boolean) => void);
    disable(): void;
    ellipsis(chars: number): string;
    ellipsisFill(text?: string): any;
    ellipsisFixed(chars: number, buttonText: string): any;
    ellipsisHtmlFixed(chars: number, callback: () => void): any;
    enable(): void;
    equaliseHeight(reset?: boolean, average?: boolean): any;
    getVisibleElementWithGreatestTabIndex(): any;
    horizontalMargins(): number;
    horizontalPadding(): number;
    ismouseover(): boolean;
    leftMargin(): number;
    leftPadding(): number;
    on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any, wait: Number): JQuery;
    onEnter(callback: () => void): any;
    onPressed(callback: (e: any) => void): any;
    removeLastWord(chars?: number, depth?: number): any;
    rightMargin(): number;
    rightPadding(): number;
    swapClass(removeClass: string, addClass: string): void;
    targetBlank(): void;
    toggleClass(class1: string, class2: string): any;
    toggleExpandText(chars: number, callback?: () => void);
    toggleExpandTextByLines(lines: number, lessText: string, moreText: string, callback: () => void): any;
    toggleText(text1: string, text2: string): any;
    updateAttr(attrName: string, oldVal: string, newVal: string): void;
    verticalMargins(): number;
    verticalPadding(): number;
}
// manifesto.js v0.2.1 https://github.com/viewdir/manifesto
declare module exjs {
    var version: string;
}
declare module exjs {
}
declare module exjs {
    interface IProjectionFunc<T, TResult> {
        (t: T): TResult;
    }
    interface IProjectionIndexFunc<T, TResult> {
        (t: T, index: number): TResult;
    }
    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
    }
    interface IEnumerableEx<T> extends IEnumerable<T> {
        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate;
        all(predicate: IProjectionFunc<T, boolean>): boolean;
        all(predicate: IProjectionIndexFunc<T, boolean>): boolean;
        any(predicate?: IProjectionFunc<T, boolean>): boolean;
        any(predicate?: IProjectionIndexFunc<T, boolean>): boolean;
        append(...items: T[]): IEnumerableEx<T>;
        apply<T>(action: IProjectionFunc<T, any>): IEnumerableEx<T>;
        apply<T>(action: IProjectionIndexFunc<T, any>): IEnumerableEx<T>;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        concat(second: IEnumerable<T>): IEnumerableEx<T>;
        concat(second: T[]): IEnumerableEx<T>;
        count(predicate?: (t: T) => boolean): number;
        difference(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IDifference<T>;
        difference(second: T[], comparer?: (f: T, s: T) => boolean): IDifference<T>;
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        first(match?: (t: T) => boolean): T;
        firstIndex(match?: (t: T) => boolean): number;
        forEach(action: (t: T) => any): any;
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<IGrouping<TKey, T>>;
        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        intersect(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        last(match?: (t: T) => boolean): T;
        lastIndex(match?: (t: T) => boolean): number;
        max(selector?: (t: T) => number): number;
        min(selector?: (t: T) => number): number;
        orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        prepend(...items: T[]): IEnumerableEx<T>;
        reverse(): IEnumerableEx<T>;
        select<TResult>(selector: IProjectionFunc<T, TResult>): IEnumerableEx<TResult>;
        select<TResult>(selector: IProjectionIndexFunc<T, TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerableEx<TResult>;
        skip(count: number): IEnumerableEx<T>;
        skipWhile(predicate: IProjectionFunc<T, boolean>): IEnumerableEx<T>;
        skipWhile(predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T>;
        standardDeviation(selector?: (t: T) => number): number;
        sum(selector?: (t: T) => number): number;
        take(count: number): IEnumerableEx<T>;
        takeWhile(predicate: IProjectionFunc<T, boolean>): IEnumerableEx<T>;
        takeWhile(predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T>;
        toArray(): T[];
        toList(): IList<T>;
        toMap<TKey, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue): IMap<TKey, TValue>;
        traverse(selector: (t: T) => T[]): IEnumerableEx<T>;
        traverse(selector: (t: T) => IEnumerable<T>): IEnumerableEx<T>;
        traverseUnique(selector: (t: T) => T[], matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        traverseUnique(selector: (t: T) => IEnumerable<T>, matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        where(filter: (t: T) => boolean): IEnumerableEx<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
    }
    interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }
    interface IOrderedEnumerable<T> extends IEnumerableEx<T> {
        thenBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        thenByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
    }
    interface IGrouping<TKey, TElement> extends IEnumerableEx<TElement> {
        key: TKey;
    }
    interface IDifference<T> {
        intersection: IEnumerableEx<T>;
        aNotB: IEnumerableEx<T>;
        bNotA: IEnumerableEx<T>;
    }
    interface IList<T> extends IEnumerableEx<T> {
        toString(): string;
        toLocaleString(): string;
        pop(): T;
        push(...items: T[]): number;
        shift(): T;
        slice(start: number, end?: number): T[];
        sort(compareFn?: (a: T, b: T) => number): T[];
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        unshift(...items: T[]): number;
        indexOf(searchElement: T, fromIndex?: number): number;
        lastIndexOf(searchElement: T, fromIndex?: number): number;
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        length: number;
        [n: number]: T;
        remove(item: T): boolean;
        removeWhere(predicate: (t: T, index?: number) => boolean): IEnumerableEx<T>;
    }
    class Enumerable<T> implements IEnumerableEx<T> {
        constructor();
        getEnumerator(): IEnumerator<T>;
        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate;
        all(predicate: IProjectionIndexFunc<T, boolean>): boolean;
        any(predicate?: IProjectionIndexFunc<T, boolean>): boolean;
        append(...items: T[]): IEnumerableEx<T>;
        apply<T>(action: IProjectionIndexFunc<T, any>): IEnumerableEx<T>;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        concat(second: IEnumerable<T>): IEnumerableEx<T>;
        concat(second: T[]): IEnumerableEx<T>;
        count(predicate?: (t: T) => boolean): number;
        difference(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IDifference<T>;
        difference(second: T[], comparer?: (f: T, s: T) => boolean): IDifference<T>;
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        first(match?: (t: T) => boolean): T;
        firstIndex(match?: (t: T) => boolean): number;
        forEach(action: (t: T) => any): void;
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<IGrouping<TKey, T>>;
        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        intersect(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        last(match?: (t: T) => boolean): T;
        lastIndex(match?: (t: T) => boolean): number;
        max(selector?: (t: T) => number): number;
        min(selector?: (t: T) => number): number;
        orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        prepend(...items: T[]): IEnumerableEx<T>;
        reverse(): IEnumerableEx<T>;
        select<TResult>(selector: IProjectionIndexFunc<T, TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerableEx<TResult>;
        skip(count: number): IEnumerableEx<T>;
        skipWhile(predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T>;
        standardDeviation(selector?: (t: T) => number): number;
        sum(selector?: (t: T) => number): number;
        take(count: number): IEnumerableEx<T>;
        takeWhile(predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T>;
        traverse(selector: (t: T) => T[]): IEnumerableEx<T>;
        traverse(selector: (t: T) => IEnumerable<T>): IEnumerableEx<T>;
        traverseUnique(selector: (t: T) => T[], uniqueMatch?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        traverseUnique(selector: (t: T) => IEnumerable<T>, matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        toArray(): T[];
        toMap<TKey, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue): IMap<TKey, TValue>;
        toList(): IList<T>;
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        where(filter: (t: T) => boolean): IEnumerableEx<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
    }
}
declare var Symbol: any;
interface Iterator<T> {
    next(): IteratorResult<T>;
}
interface IteratorResult<T> {
    done: boolean;
    value: T;
}
declare module exjs {
}
declare var global: any;
declare module exjs {
    class Map<TKey, TValue> implements IMap<TKey, TValue> {
        private _keys;
        private _values;
        size: number;
        constructor();
        constructor(enumerable: any[][]);
        constructor(enumerable: IEnumerable<any[]>);
        clear(): void;
        delete(key: TKey): boolean;
        entries(): IEnumerableEx<any[]>;
        forEach(callbackFn: (value: TValue, key: TKey, map?: IMap<TKey, TValue>) => void, thisArg?: any): void;
        get(key: TKey): TValue;
        has(key: TKey): boolean;
        keys(): IEnumerableEx<TKey>;
        set(key: TKey, value: TValue): any;
        values(): IEnumerableEx<TValue>;
    }
}
declare module exjs {
    interface IMap<TKey, TValue> {
        size: number;
        clear(): any;
        delete(key: TKey): boolean;
        entries(): IEnumerableEx<any[]>;
        forEach(callbackFn: (value: TValue, key: TKey, map?: IMap<TKey, TValue>) => void, thisArg?: any): any;
        get(key: TKey): TValue;
        has(key: TKey): boolean;
        keys(): IEnumerableEx<TKey>;
        set(key: TKey, value: TValue): any;
        values(): IEnumerableEx<TValue>;
    }
}
declare module exjs {
    function anonymous<T>(iterator: (en: IEnumerator<T>) => boolean): IEnumerableEx<T>;
}
declare module exjs {
}
declare module exjs {
}
interface Array<T> {
    en(): exjs.IEnumerableEx<T>;
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
interface Function {
    fromJson<T>(o: any, mappingOverrides?: any): T;
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
    class List<T> extends Enumerable<T> implements IList<T> {
        toString(): string;
        toLocaleString(): string;
        pop(): T;
        push(...items: T[]): number;
        shift(): T;
        slice(start: number, end?: number): T[];
        sort(compareFn?: (a: T, b: T) => number): T[];
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        unshift(...items: T[]): number;
        indexOf(searchElement: T, fromIndex?: number): number;
        lastIndexOf(searchElement: T, fromIndex?: number): number;
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        length: number;
        [n: number]: T;
        remove(item: T): boolean;
        removeWhere(predicate: (t: T, index?: number) => boolean): IEnumerableEx<T>;
    }
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
    function range(start: number, end: number, increment?: number): IEnumerableEx<number>;
}
declare module exjs {
}
declare module exjs {
    function round(value: number, digits?: number): number;
}
declare module exjs {
}
declare module exjs {
    function selectorEnumerator<T, TResult>(en: IEnumerable<T>): IEnumerator<TResult>;
    function selectorEnumerator<T, TResult>(arr: T[]): IEnumerator<TResult>;
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
    function en<T>(enu: IEnumerable<T>): IEnumerableEx<T>;
}
declare var ex: typeof exjs.en;
declare module exjs {
}

declare function escape(s: string): any;
declare function unescape(s: string): any;

interface Array<T>{
    clone(): Array<T>;
    contains(val: any): boolean;
    indexOf(searchElement: any, fromIndex?: number): number;
    indexOfTest(test: (item: any) => boolean, fromIndex?: number): number;
    insert(item: any, index: number): void;
    last(): any;
    move(fromIndex: number, toIndex: number): void;
    remove(item: any): void;
    removeAt(index: number): void;
}

interface Math {
    clamp(value: number, min: number, max: number): number;
    constrain(value: number, low: number, high: number): number;
    degreesToRadians(degrees: number): number;
    distanceBetween(x1: number, y1: number, x2: number, y2: number): number;
    lerp(start: number, stop: number, amount: number): number;
    mag(a: number, b: number, c: number): number;
    map(value: number, start1: number, stop1: number, start2: number, stop2: number): number;
    median(values: number[]): number;
    randomBetween(low: number, high?: number): number;
    roundToDecimalPlace(num: number, dec: number): number;
    radiansToDegrees(radians: number): number;
    normalise(num: number, min: number, max: number): number;
    sq(n: number): number;
    TAU: number;
}

interface Number {
    isInteger(): boolean;
}

interface String {
    b64_to_utf8(str: string): string;
    contains(str: string): boolean;
    endsWith(text: string): boolean;
    hashCode(): string;
    isAlphanumeric(): boolean;
    ltrim(): string;
    rtrim(): string;
    startsWith(text: string): boolean;
    toCssClass(): string;
    toFileName(): string;
    trim(): string;
    utf8_to_b64(str: string): string;
}

interface StringConstructor {
    format(template: string, ...args: any[]): string;
}
declare module HTTPStatusCode {
    var CONTINUE: number;
    var SWITCHING_PROTOCOLS: number;
    var PROCESSING: number;
    var OK: number;
    var CREATED: number;
    var ACCEPTED: number;
    var NON_AUTHORITATIVE_INFORMATION: number;
    var NO_CONTENT: number;
    var RESET_CONTENT: number;
    var PARTIAL_CONTENT: number;
    var MULTI_STATUS: number;
    var MULTIPLE_CHOICES: number;
    var MOVED_PERMANENTLY: number;
    var MOVED_TEMPORARILY: number;
    var SEE_OTHER: number;
    var NOT_MODIFIED: number;
    var USE_PROXY: number;
    var TEMPORARY_REDIRECT: number;
    var BAD_REQUEST: number;
    var UNAUTHORIZED: number;
    var PAYMENT_REQUIRED: number;
    var FORBIDDEN: number;
    var NOT_FOUND: number;
    var METHOD_NOT_ALLOWED: number;
    var NOT_ACCEPTABLE: number;
    var PROXY_AUTHENTICATION_REQUIRED: number;
    var REQUEST_TIME_OUT: number;
    var CONFLICT: number;
    var GONE: number;
    var LENGTH_REQUIRED: number;
    var PRECONDITION_FAILED: number;
    var REQUEST_ENTITY_TOO_LARGE: number;
    var REQUEST_URI_TOO_LARGE: number;
    var UNSUPPORTED_MEDIA_TYPE: number;
    var REQUESTED_RANGE_NOT_SATISFIABLE: number;
    var EXPECTATION_FAILED: number;
    var IM_A_TEAPOT: number;
    var UNPROCESSABLE_ENTITY: number;
    var LOCKED: number;
    var FAILED_DEPENDENCY: number;
    var UNORDERED_COLLECTION: number;
    var UPGRADE_REQUIRED: number;
    var PRECONDITION_REQUIRED: number;
    var TOO_MANY_REQUESTS: number;
    var REQUEST_HEADER_FIELDS_TOO_LARGE: number;
    var INTERNAL_SERVER_ERROR: number;
    var NOT_IMPLEMENTED: number;
    var BAD_GATEWAY: number;
    var SERVICE_UNAVAILABLE: number;
    var GATEWAY_TIME_OUT: number;
    var HTTP_VERSION_NOT_SUPPORTED: number;
    var VARIANT_ALSO_NEGOTIATES: number;
    var INSUFFICIENT_STORAGE: number;
    var BANDWIDTH_LIMIT_EXCEEDED: number;
    var NOT_EXTENDED: number;
    var NETWORK_AUTHENTICATION_REQUIRED: number;
}

declare module Manifesto {
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
}

declare module Manifesto {
    class AnnotationMotivation extends StringValue {
        static BOOKMARKING: AnnotationMotivation;
        static CLASSIFYING: AnnotationMotivation;
        static COMMENTING: AnnotationMotivation;
        static DESCRIBING: AnnotationMotivation;
        static EDITING: AnnotationMotivation;
        static HIGHLIGHTING: AnnotationMotivation;
        static IDENTIFYING: AnnotationMotivation;
        static LINKING: AnnotationMotivation;
        static MODERATING: AnnotationMotivation;
        static PAINTING: AnnotationMotivation;
        static QUESTIONING: AnnotationMotivation;
        static REPLYING: AnnotationMotivation;
        static TAGGING: AnnotationMotivation;
        static TRANSCRIBING: AnnotationMotivation;
        bookmarking(): AnnotationMotivation;
        classifying(): AnnotationMotivation;
        commenting(): AnnotationMotivation;
        describing(): AnnotationMotivation;
        editing(): AnnotationMotivation;
        highlighting(): AnnotationMotivation;
        identifying(): AnnotationMotivation;
        linking(): AnnotationMotivation;
        moderating(): AnnotationMotivation;
        painting(): AnnotationMotivation;
        questioning(): AnnotationMotivation;
        replying(): AnnotationMotivation;
        tagging(): AnnotationMotivation;
        transcribing(): AnnotationMotivation;
    }
}

declare module Manifesto {
    class ElementType extends StringValue {
        static CANVAS: ElementType;
        static DOCUMENT: ElementType;
        static IMAGE: ElementType;
        static MOVINGIMAGE: ElementType;
        static PHYSICALOBJECT: ElementType;
        static SOUND: ElementType;
        canvas(): ElementType;
        document(): ElementType;
        image(): ElementType;
        movingimage(): ElementType;
        physicalobject(): ElementType;
        sound(): ElementType;
    }
}

declare module Manifesto {
    class IIIFResourceType extends StringValue {
        static CANVAS: IIIFResourceType;
        static COLLECTION: IIIFResourceType;
        static MANIFEST: IIIFResourceType;
        static RANGE: IIIFResourceType;
        canvas(): IIIFResourceType;
        collection(): IIIFResourceType;
        manifest(): IIIFResourceType;
        range(): IIIFResourceType;
    }
}

declare module Manifesto {
    class ManifestType extends StringValue {
        static EMPTY: ManifestType;
        static MANUSCRIPT: ManifestType;
        static MONOGRAPH: ManifestType;
        empty(): ManifestType;
        manuscript(): ManifestType;
        monograph(): ManifestType;
    }
}

declare module Manifesto {
    class RenderingFormat extends StringValue {
        static PDF: RenderingFormat;
        static DOC: RenderingFormat;
        static DOCX: RenderingFormat;
        pdf(): RenderingFormat;
        doc(): RenderingFormat;
        docx(): RenderingFormat;
    }
}

declare module Manifesto {
    class ResourceFormat extends StringValue {
        static JPGIMAGE: ResourceFormat;
        static PDF: ResourceFormat;
        jpgimage(): ResourceFormat;
        pdf(): ResourceFormat;
    }
}

declare module Manifesto {
    class ResourceType extends StringValue {
        static IMAGE: ResourceType;
        image(): ResourceType;
    }
}

declare module Manifesto {
    class ServiceProfile extends StringValue {
        static AUTOCOMPLETE: ServiceProfile;
        static STANFORDIIIFIMAGECOMPLIANCE0: ServiceProfile;
        static STANFORDIIIFIMAGECOMPLIANCE1: ServiceProfile;
        static STANFORDIIIFIMAGECOMPLIANCE2: ServiceProfile;
        static STANFORDIIIFIMAGECONFORMANCE0: ServiceProfile;
        static STANFORDIIIFIMAGECONFORMANCE1: ServiceProfile;
        static STANFORDIIIFIMAGECONFORMANCE2: ServiceProfile;
        static STANFORDIIIF1IMAGECOMPLIANCE0: ServiceProfile;
        static STANFORDIIIF1IMAGECOMPLIANCE1: ServiceProfile;
        static STANFORDIIIF1IMAGECOMPLIANCE2: ServiceProfile;
        static STANFORDIIIF1IMAGECONFORMANCE0: ServiceProfile;
        static STANFORDIIIF1IMAGECONFORMANCE1: ServiceProfile;
        static STANFORDIIIF1IMAGECONFORMANCE2: ServiceProfile;
        static IIIF1IMAGELEVEL0: ServiceProfile;
        static IIIF1IMAGELEVEL0PROFILE: ServiceProfile;
        static IIIF1IMAGELEVEL1: ServiceProfile;
        static IIIF1IMAGELEVEL1PROFILE: ServiceProfile;
        static IIIF1IMAGELEVEL2: ServiceProfile;
        static IIIF1IMAGELEVEL2PROFILE: ServiceProfile;
        static IIIF2IMAGELEVEL0: ServiceProfile;
        static IIIF2IMAGELEVEL0PROFILE: ServiceProfile;
        static IIIF2IMAGELEVEL1: ServiceProfile;
        static IIIF2IMAGELEVEL1PROFILE: ServiceProfile;
        static IIIF2IMAGELEVEL2: ServiceProfile;
        static IIIF2IMAGELEVEL2PROFILE: ServiceProfile;
        static IXIF: ServiceProfile;
        static LOGIN: ServiceProfile;
        static CLICKTHROUGH: ServiceProfile;
        static RESTRICTED: ServiceProfile;
        static LOGOUT: ServiceProfile;
        static OTHERMANIFESTATIONS: ServiceProfile;
        static SEARCHWITHIN: ServiceProfile;
        static TOKEN: ServiceProfile;
        static TRACKINGEXTENSIONS: ServiceProfile;
        static UIEXTENSIONS: ServiceProfile;
        static PRINTEXTENSIONS: ServiceProfile;
        static SHAREEXTENSIONS: ServiceProfile;
        autoComplete(): ServiceProfile;
        iiif1ImageLevel1(): ServiceProfile;
        iiif1ImageLevel2(): ServiceProfile;
        iiif2ImageLevel1(): ServiceProfile;
        iiif2ImageLevel2(): ServiceProfile;
        ixif(): ServiceProfile;
        login(): ServiceProfile;
        clickThrough(): ServiceProfile;
        restricted(): ServiceProfile;
        logout(): ServiceProfile;
        otherManifestations(): ServiceProfile;
        searchWithin(): ServiceProfile;
        stanfordIIIFImageCompliance1(): ServiceProfile;
        stanfordIIIFImageCompliance2(): ServiceProfile;
        stanfordIIIFImageConformance1(): ServiceProfile;
        stanfordIIIFImageConformance2(): ServiceProfile;
        stanfordIIIF1ImageCompliance1(): ServiceProfile;
        stanfordIIIF1ImageCompliance2(): ServiceProfile;
        stanfordIIIF1ImageConformance1(): ServiceProfile;
        stanfordIIIF1ImageConformance2(): ServiceProfile;
        token(): ServiceProfile;
        trackingExtensions(): ServiceProfile;
        uiExtensions(): ServiceProfile;
        printExtensions(): ServiceProfile;
        shareExtensions(): ServiceProfile;
    }
}

declare module Manifesto {
    class ViewingDirection extends StringValue {
        static LEFTTORIGHT: ViewingDirection;
        static RIGHTTOLEFT: ViewingDirection;
        static TOPTOBOTTOM: ViewingDirection;
        static BOTTOMTOTOP: ViewingDirection;
        leftToRight(): ViewingDirection;
        rightToLeft(): ViewingDirection;
        topToBottom(): ViewingDirection;
        bottomToTop(): ViewingDirection;
    }
}

declare module Manifesto {
    class ViewingHint extends StringValue {
        static CONTINUOUS: ViewingHint;
        static EMPTY: ViewingHint;
        static INDIVIDUALS: ViewingHint;
        static NONPAGED: ViewingHint;
        static PAGED: ViewingHint;
        static TOP: ViewingHint;
        continuous(): ViewingHint;
        empty(): ViewingHint;
        individuals(): ViewingHint;
        nonPaged(): ViewingHint;
        paged(): ViewingHint;
        top(): ViewingHint;
    }
}

declare module Manifesto {
    class JSONLDResource implements IJSONLDResource {
        context: string;
        id: string;
        __jsonld: any;
        constructor(jsonld?: any);
        getProperty(name: string): any;
    }
}

declare module Manifesto {
    class ManifestResource extends JSONLDResource implements IManifestResource {
        externalResource: IExternalResource;
        options: IManifestoOptions;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getIIIFResourceType(): IIIFResourceType;
        getLabel(): string;
        getMetadata(): any;
        getRendering(format: RenderingFormat | string): IRendering;
        getRenderings(): IRendering[];
        getService(profile: ServiceProfile | string): IService;
        getServices(): IService[];
        isCanvas(): boolean;
        isRange(): boolean;
    }
}

declare module Manifesto {
    class Element extends ManifestResource implements IElement {
        index: number;
        type: ElementType;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getResources(): IAnnotation[];
        getType(): ElementType;
    }
}

declare var _endsWith: any;
declare var _last: any;
declare module Manifesto {
    class Canvas extends Element implements ICanvas {
        ranges: IRange[];
        constructor(jsonld?: any, options?: IManifestoOptions);
        getCanonicalImageUri(w?: number): string;
        getImages(): IAnnotation[];
        getIndex(): number;
        getWidth(): number;
        getHeight(): number;
    }
}

declare var _assign: any;
declare module Manifesto {
    class IIIFResource extends ManifestResource implements IIIIFResource {
        defaultTree: ITreeNode;
        index: number;
        isLoaded: boolean;
        parentCollection: ICollection;
        parentLabel: string;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getAttribution(): string;
        getDescription(): string;
        getIIIFResourceType(): IIIFResourceType;
        getLogo(): string;
        getLicense(): string;
        getNavDate(): Date;
        getRelated(): any;
        getSeeAlso(): any;
        getLabel(): string;
        getDefaultTree(): ITreeNode;
        isCollection(): boolean;
        isManifest(): boolean;
        load(): Promise<IIIIFResource>;
    }
}

declare var _isArray: any;
declare var _map: any;
declare module Manifesto {
    class Manifest extends IIIFResource implements IManifest {
        index: number;
        private _allRanges;
        private _sequences;
        private _topRanges;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getDefaultTree(): ITreeNode;
        private _getTopRanges();
        getTopRanges(): IRange[];
        private _getRangeById(id);
        private _parseRangeCanvas(json, range);
        private _parseRanges(r, path, parentRange?);
        getAllRanges(): IRange[];
        getRangeById(id: string): IRange;
        getRangeByPath(path: string): IRange;
        getSequences(): ISequence[];
        getSequenceByIndex(sequenceIndex: number): ISequence;
        getTotalSequences(): number;
        getManifestType(): ManifestType;
        getTrackingLabel(): string;
        isMultiSequence(): boolean;
        getViewingDirection(): ViewingDirection;
        getViewingHint(): ViewingHint;
    }
}

declare module Manifesto {
    class Collection extends IIIFResource implements ICollection {
        members: IIIIFResource[];
        private _collections;
        private _manifests;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getCollections(): ICollection[];
        getManifests(): IManifest[];
        getCollectionByIndex(collectionIndex: number): Promise<ICollection>;
        getManifestByIndex(manifestIndex: number): Promise<IManifest>;
        getTotalCollections(): number;
        getTotalManifests(): number;
        getTotalMembers(): number;
        /**
         * Get a tree of sub collections and manifests, using each child manifest's first 'top' range.
         */
        getDefaultTree(): ITreeNode;
        private _parseManifests(parentCollection);
        private _parseCollections(parentCollection);
    }
}

declare module Manifesto {
    class Range extends ManifestResource implements IRange {
        _canvases: ICanvas[];
        _ranges: IRange[];
        parentRange: Range;
        path: string;
        members: IManifestResource[];
        treeNode: ITreeNode;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getCanvasIds(): string[];
        getCanvases(): ICanvas[];
        getRanges(): IRange[];
        getViewingDirection(): ViewingDirection;
        getViewingHint(): ViewingHint;
        getTree(treeRoot: ITreeNode): ITreeNode;
        private _parseTreeNode(node, range);
    }
}

declare module Manifesto {
    class Rendering extends ManifestResource implements IRendering {
        constructor(jsonld?: any, options?: IManifestoOptions);
        getFormat(): RenderingFormat;
    }
}

declare var _last: any;
declare module Manifesto {
    class Sequence extends ManifestResource implements ISequence {
        private canvases;
        constructor(jsonld?: any, options?: IManifestoOptions);
        getCanvases(): ICanvas[];
        getCanvasById(id: string): ICanvas;
        getCanvasByIndex(canvasIndex: number): any;
        getCanvasIndexById(id: string): number;
        getCanvasIndexByLabel(label: string, foliated?: boolean): number;
        getLastCanvasLabel(alphanumeric?: boolean): string;
        getLastPageIndex(): number;
        getNextPageIndex(canvasIndex: number, pagingEnabled?: boolean): number;
        getPagedIndices(canvasIndex: number, pagingEnabled?: boolean): number[];
        getPrevPageIndex(canvasIndex: number, pagingEnabled?: boolean): number;
        getStartCanvasIndex(): number;
        getThumbs(width: number, height?: number): Manifesto.IThumb[];
        getStartCanvas(): string;
        getTotalCanvases(): number;
        getViewingDirection(): ViewingDirection;
        getViewingHint(): ViewingHint;
        isCanvasIndexOutOfRange(canvasIndex: number): boolean;
        isFirstCanvas(canvasIndex: number): boolean;
        isLastCanvas(canvasIndex: number): boolean;
        isMultiCanvas(): boolean;
        isPagingEnabled(): boolean;
        isTotalCanvasesEven(): boolean;
    }
}

declare var _isString: any;
declare module Manifesto {
    class Deserialiser {
        static parse(manifest: string, options?: IManifestoOptions): IIIIFResource;
        static parseJson(json: any, options?: IManifestoOptions): IIIIFResource;
        static parseCollection(json: any, options?: IManifestoOptions): ICollection;
        static parseCollections(collection: ICollection, options?: IManifestoOptions): void;
        static parseManifest(json: any, options?: IManifestoOptions): IManifest;
        static parseManifests(collection: ICollection, options?: IManifestoOptions): void;
        static parseMember(json: any, options?: IManifestoOptions): IIIIFResource;
        static parseMembers(collection: ICollection, options?: IManifestoOptions): void;
    }
    class Serialiser {
        static serialise(manifest: IManifest): string;
    }
}

declare var _endsWith: any;
declare var _isArray: any;
declare module Manifesto {
    class Service extends ManifestResource implements IService {
        constructor(jsonld?: any, options?: IManifestoOptions);
        getProfile(): ServiceProfile;
        getDescription(): string;
        getInfoUri(): string;
    }
}

declare module Manifesto {
    interface IThumb {
        data: any;
        height: number;
        index: number;
        label: string;
        uri: string;
        visible: boolean;
        width: number;
    }
}

declare module Manifesto {
    class Thumb implements IThumb {
        data: any;
        index: number;
        uri: string;
        label: string;
        width: number;
        height: number;
        visible: boolean;
        constructor(width: number, canvas: ICanvas);
    }
}

declare module Manifesto {
    interface ITreeNode {
        data: any;
        nodes: ITreeNode[];
        selected: boolean;
        expanded: boolean;
        id: string;
        label: string;
        navDate: Date;
        parentNode: ITreeNode;
        addNode(node: ITreeNode): void;
        isCollection(): boolean;
        isManifest(): boolean;
        isRange(): boolean;
    }
}

declare module Manifesto {
    class TreeNode implements ITreeNode {
        data: any;
        nodes: ITreeNode[];
        selected: boolean;
        expanded: boolean;
        id: string;
        label: string;
        navDate: Date;
        parentNode: ITreeNode;
        constructor(label?: string, data?: any);
        addNode(node: ITreeNode): void;
        isCollection(): boolean;
        isManifest(): boolean;
        isRange(): boolean;
    }
}

declare module Manifesto {
    class TreeNodeType extends StringValue {
        static COLLECTION: TreeNodeType;
        static MANIFEST: TreeNodeType;
        static RANGE: TreeNodeType;
        collection(): TreeNodeType;
        manifest(): TreeNodeType;
        range(): TreeNodeType;
    }
}

declare var http: any;
declare var https: any;
declare var url: any;
declare var manifesto: IManifesto;
declare module Manifesto {
    class Utils {
        static getImageQuality(profile: Manifesto.ServiceProfile): string;
        static getLocalisedValue(resource: any, locale: string): string;
        static generateTreeNodeIds(treeNode: ITreeNode, index?: number): void;
        static loadResource(uri: string): Promise<string>;
        static loadExternalResource(resource: IExternalResource, tokenStorageStrategy: string, clickThrough: (resource: IExternalResource) => Promise<void>, restricted: (resource: IExternalResource) => Promise<void>, login: (resource: IExternalResource) => Promise<void>, getAccessToken: (resource: IExternalResource, rejectOnError: boolean) => Promise<IAccessToken>, storeAccessToken: (resource: IExternalResource, token: IAccessToken, tokenStorageStrategy: string) => Promise<void>, getStoredAccessToken: (resource: IExternalResource, tokenStorageStrategy: string) => Promise<IAccessToken>, handleResourceResponse: (resource: IExternalResource) => Promise<any>, options?: IManifestoOptions): Promise<IExternalResource>;
        static createError(name: string, message: string): Error;
        static createAuthorizationFailedError(): Error;
        static createRestrictedError(): Error;
        static createInternalServerError(message: string): Error;
        static loadExternalResources(resources: IExternalResource[], tokenStorageStrategy: string, clickThrough: (resource: IExternalResource) => Promise<void>, restricted: (resource: IExternalResource) => Promise<void>, login: (resource: IExternalResource) => Promise<void>, getAccessToken: (resource: IExternalResource, rejectOnError: boolean) => Promise<IAccessToken>, storeAccessToken: (resource: IExternalResource, token: IAccessToken, tokenStorageStrategy: string) => Promise<void>, getStoredAccessToken: (resource: IExternalResource, tokenStorageStrategy: string) => Promise<IAccessToken>, handleResourceResponse: (resource: IExternalResource) => Promise<any>, options?: IManifestoOptions): Promise<IExternalResource[]>;
        static authorize(resource: IExternalResource, tokenStorageStrategy: string, clickThrough: (resource: IExternalResource) => Promise<void>, restricted: (resource: IExternalResource) => Promise<void>, login: (resource: IExternalResource) => Promise<void>, getAccessToken: (resource: IExternalResource, rejectOnError: boolean) => Promise<IAccessToken>, storeAccessToken: (resource: IExternalResource, token: IAccessToken, tokenStorageStrategy: string) => Promise<void>, getStoredAccessToken: (resource: IExternalResource, tokenStorageStrategy: string) => Promise<IAccessToken>): Promise<IExternalResource>;
        private static showAuthInteraction(resource, tokenStorageStrategy, clickThrough, restricted, login, getAccessToken, storeAccessToken, resolve, reject);
        static getService(resource: any, profile: ServiceProfile | string): IService;
        static getResourceById(parentResource: IJSONLDResource, id: string): IJSONLDResource;
        static getAllArrays(obj: any): exjs.IEnumerable<any>;
        static getServices(resource: any): IService[];
    }
}


/// <reference path="StringValue.d.ts" />
/// <reference path="AnnotationMotivation.d.ts" />
/// <reference path="ElementType.d.ts" />
/// <reference path="IIIFResourceType.d.ts" />
/// <reference path="ManifestType.d.ts" />
/// <reference path="RenderingFormat.d.ts" />
/// <reference path="ResourceFormat.d.ts" />
/// <reference path="ResourceType.d.ts" />
/// <reference path="ServiceProfile.d.ts" />
/// <reference path="ViewingDirection.d.ts" />
/// <reference path="ViewingHint.d.ts" />
/// <reference path="JSONLDResource.d.ts" />
/// <reference path="ManifestResource.d.ts" />
/// <reference path="Element.d.ts" />
/// <reference path="Canvas.d.ts" />
/// <reference path="IIIFResource.d.ts" />
/// <reference path="Manifest.d.ts" />
/// <reference path="Collection.d.ts" />
/// <reference path="Range.d.ts" />
/// <reference path="Rendering.d.ts" />
/// <reference path="Sequence.d.ts" />
/// <reference path="Serialisation.d.ts" />
/// <reference path="Service.d.ts" />
/// <reference path="IThumb.d.ts" />
/// <reference path="Thumb.d.ts" />
/// <reference path="ITreeNode.d.ts" />
/// <reference path="TreeNode.d.ts" />
/// <reference path="TreeNodeType.d.ts" />
/// <reference path="Utils.d.ts" />
/// <reference path="Manifesto.d.ts" />

declare module Manifesto {
    class Annotation extends ManifestResource implements IAnnotation {
        constructor(jsonld: any, options: IManifestoOptions);
        getMotivation(): AnnotationMotivation;
        getOn(): string;
        getResource(): Resource;
    }
}

declare module Manifesto {
    interface IAccessToken {
        accessToken: string;
        error: string;
        errorDescription: string;
        expiresIn: number;
        tokenType: string;
    }
}

declare module Manifesto {
    interface IAnnotation extends IJSONLDResource {
        getMotivation(): AnnotationMotivation;
        getOn(): string;
        getResource(): Resource;
    }
}

declare module Manifesto {
    interface ICanvas extends IElement {
        ranges: IRange[];
        getCanonicalImageUri(width?: number): string;
        getHeight(): number;
        getImages(): IAnnotation[];
        getIndex(): number;
        getWidth(): number;
    }
}

declare module Manifesto {
    interface ICollection extends IIIIFResource {
        getCollectionByIndex(index: number): Promise<ICollection>;
        getCollections(): ICollection[];
        getManifestByIndex(index: number): Promise<IManifest>;
        getManifests(): IManifest[];
        getTotalCollections(): number;
        getTotalManifests(): number;
        members: IIIIFResource[];
    }
}

declare module Manifesto {
    interface IElement extends IManifestResource {
        index: number;
        getResources(): IAnnotation[];
        getType(): ElementType;
    }
}

declare module Manifesto {
    interface IExternalResource {
        clickThroughService: IService;
        data: any;
        dataUri: string;
        error: any;
        getData(accessToken?: IAccessToken): Promise<IExternalResource>;
        height: number;
        isAccessControlled(): boolean;
        isResponseHandled: boolean;
        loginService: IService;
        logoutService: IService;
        restrictedService: IService;
        status: number;
        tokenService: IService;
        width: number;
        x: number;
        y: number;
    }
}

declare module Manifesto {
    interface IIIIFResource extends IManifestResource {
        defaultTree: ITreeNode;
        getAttribution(): string;
        getDefaultTree(): ITreeNode;
        getDescription(): string;
        getIIIFResourceType(): IIIFResourceType;
        getLabel(): string;
        getLicense(): string;
        getLogo(): string;
        getNavDate(): Date;
        getRelated(): any;
        getSeeAlso(): any;
        index: number;
        isCollection(): boolean;
        isLoaded: boolean;
        isManifest(): boolean;
        load(): Promise<IIIIFResource>;
        parentCollection: ICollection;
        parentLabel: string;
    }
}

declare module Manifesto {
    interface IJSONLDResource {
        context: string;
        id: string;
        __jsonld: any;
        getProperty(name: string): any;
    }
}

declare module Manifesto {
    interface IManifest extends Manifesto.IIIIFResource {
        getAllRanges(): IRange[];
        getManifestType(): ManifestType;
        getRangeById(id: string): Manifesto.IRange;
        getRangeByPath(path: string): IRange;
        getSequenceByIndex(index: number): ISequence;
        getSequences(): ISequence[];
        getTopRanges(): IRange[];
        getTotalSequences(): number;
        getTrackingLabel(): string;
        getViewingDirection(): Manifesto.ViewingDirection;
        getViewingHint(): ViewingHint;
        isMultiSequence(): boolean;
    }
}

interface IManifesto {
    AnnotationMotivation: Manifesto.AnnotationMotivation;
    create: (manifest: string, options?: Manifesto.IManifestoOptions) => Manifesto.IIIIFResource;
    ElementType: Manifesto.ElementType;
    getRenderings(resource: any): Manifesto.IRendering[];
    getService: (resource: any, profile: Manifesto.ServiceProfile | string) => Manifesto.IService;
    getTreeNode(): Manifesto.ITreeNode;
    IIIFResourceType: Manifesto.IIIFResourceType;
    isImageProfile(profile: Manifesto.ServiceProfile): boolean;
    isLevel0ImageProfile(profile: Manifesto.ServiceProfile): boolean;
    isLevel1ImageProfile(profile: Manifesto.ServiceProfile): boolean;
    isLevel2ImageProfile(profile: Manifesto.ServiceProfile): boolean;
    loadExternalResources: (resources: Manifesto.IExternalResource[], tokenStorageStrategy: string, clickThrough: (resource: Manifesto.IExternalResource) => Promise<void>, restricted: (resource: Manifesto.IExternalResource) => Promise<void>, login: (resource: Manifesto.IExternalResource) => Promise<void>, getAccessToken: (resource: Manifesto.IExternalResource, rejectOnError: boolean) => Promise<Manifesto.IAccessToken>, storeAccessToken: (resource: Manifesto.IExternalResource, token: Manifesto.IAccessToken, tokenStorageStrategy: string) => Promise<void>, getStoredAccessToken: (resource: Manifesto.IExternalResource, tokenStorageStrategy: string) => Promise<Manifesto.IAccessToken>, handleResourceResponse: (resource: Manifesto.IExternalResource) => Promise<any>, options?: Manifesto.IManifestoOptions) => Promise<Manifesto.IExternalResource[]>;
    loadManifest: (uri: string) => Promise<string>;
    ManifestType: Manifesto.ManifestType;
    RenderingFormat: Manifesto.RenderingFormat;
    ResourceFormat: Manifesto.ResourceFormat;
    ResourceType: Manifesto.ResourceType;
    ServiceProfile: Manifesto.ServiceProfile;
    StatusCodes: Manifesto.IStatusCodes;
    TreeNodeType: Manifesto.TreeNodeType;
    ViewingDirection: Manifesto.ViewingDirection;
    ViewingHint: Manifesto.ViewingHint;
}

declare module Manifesto {
    interface IManifestoOptions {
        defaultLabel: string;
        locale: string;
        index?: number;
        resource: IIIIFResource;
        navDate?: Date;
        pessimisticAccessControl: boolean;
    }
}

declare module Manifesto {
    interface IManifestResource extends IJSONLDResource {
        externalResource: Manifesto.IExternalResource;
        options: IManifestoOptions;
        getLabel(): string;
        getMetadata(): any;
        getRendering(format: RenderingFormat | string): IRendering;
        getRenderings(): IRendering[];
        getService(profile: ServiceProfile | string): IService;
        getServices(): IService[];
        isCanvas(): boolean;
        isRange(): boolean;
    }
}

declare module Manifesto {
    interface IRange extends IManifestResource {
        getCanvasIds(): string[];
        getCanvases(): ICanvas[];
        getRanges(): IRange[];
        getTree(treeRoot: ITreeNode): ITreeNode;
        getViewingDirection(): ViewingDirection;
        getViewingHint(): ViewingHint;
        members: IManifestResource[];
        parentRange: IRange;
        path: string;
        treeNode: ITreeNode;
    }
}

declare module Manifesto {
    interface IRendering extends IManifestResource {
        getFormat(): RenderingFormat;
    }
}

declare module Manifesto {
    interface IResource extends IManifestResource {
        getFormat(): ResourceFormat;
        getHeight(): number;
        getWidth(): number;
    }
}

declare module Manifesto {
    interface ISequence extends IManifestResource {
        getCanvases(): ICanvas[];
        getCanvasById(id: string): ICanvas;
        getCanvasByIndex(index: number): ICanvas;
        getCanvasIndexById(id: string): number;
        getCanvasIndexByLabel(label: string, foliated: boolean): number;
        getLastCanvasLabel(digitsOnly?: boolean): string;
        getLastPageIndex(): number;
        getNextPageIndex(index: number): number;
        getPagedIndices(index: number): number[];
        getPrevPageIndex(index: number): number;
        getRendering(format: RenderingFormat | string): IRendering;
        getStartCanvas(): string;
        getStartCanvasIndex(): number;
        getThumbs(width: number, height: number): Manifesto.IThumb[];
        getTotalCanvases(): number;
        getViewingDirection(): Manifesto.ViewingDirection;
        getViewingHint(): Manifesto.ViewingHint;
        isCanvasIndexOutOfRange(index: number): boolean;
        isFirstCanvas(index: number): boolean;
        isLastCanvas(index: number): boolean;
        isMultiCanvas(): boolean;
        isPagingEnabled(): boolean;
        isTotalCanvasesEven(): boolean;
    }
}

declare module Manifesto {
    interface IService extends IManifestResource {
        getProfile(): ServiceProfile;
        getInfoUri(): string;
    }
}

declare module Manifesto {
    interface IStatusCodes {
        AUTHORIZATION_FAILED: number;
        FORBIDDEN: number;
        INTERNAL_SERVER_ERROR: number;
        RESTRICTED: number;
    }
}

declare module Manifesto {
    class Resource extends ManifestResource implements IResource {
        constructor(jsonld?: any, options?: IManifestoOptions);
        getFormat(): ResourceFormat;
        getType(): ResourceType;
        getWidth(): number;
        getHeight(): number;
        getMaxWidth(): number;
        getMaxHeight(): number;
    }
}

interface Window {
    manifestCallback: any;
}
declare namespace Manifold {
    class StringValue {
        value: string;
        constructor(value?: string);
        toString(): string;
    }
}

declare namespace Manifold {
    class TreeSortType extends StringValue {
        static DATE: TreeSortType;
        static NONE: TreeSortType;
        date(): TreeSortType;
        none(): TreeSortType;
    }
}

/// <reference path="StringValue.d.ts" />
/// <reference path="TreeSortType.d.ts" />

declare namespace Manifold {
    class Bootstrapper {
        private _options;
        constructor(options: Manifold.IManifoldOptions);
        bootstrap(): Promise<Manifold.IHelper>;
        private _loaded(bootstrapper, json, resolve, reject);
        private _msieversion();
    }
}

declare namespace Manifold {
    class ExternalResource implements Manifesto.IExternalResource {
        clickThroughService: Manifesto.IService;
        data: any;
        dataUri: string;
        error: any;
        height: number;
        isResponseHandled: boolean;
        loginService: Manifesto.IService;
        logoutService: Manifesto.IService;
        restrictedService: Manifesto.IService;
        status: number;
        tokenService: Manifesto.IService;
        width: number;
        x: number;
        y: number;
        constructor(resource: Manifesto.IManifestResource, dataUriFunc: (r: Manifesto.IManifestResource) => string);
        private _parseAuthServices(resource);
        isAccessControlled(): boolean;
        hasServiceDescriptor(): boolean;
        getData(accessToken?: Manifesto.IAccessToken): Promise<Manifesto.IExternalResource>;
    }
}

declare namespace Manifold {
    class Helper implements IHelper {
        private _multiSelectState;
        iiifResource: Manifesto.IIIIFResource;
        iiifResourceUri: string;
        manifest: Manifesto.IManifest;
        collectionIndex: number;
        manifestIndex: number;
        canvasIndex: number;
        sequenceIndex: number;
        constructor(options: IManifoldOptions);
        getAutoCompleteService(): Manifesto.IService;
        getAttribution(): string;
        getCanvases(): Manifesto.ICanvas[];
        getCanvasById(id: string): Manifesto.ICanvas;
        getCanvasesById(ids: string[]): Manifesto.ICanvas[];
        getCanvasByIndex(index: number): Manifesto.ICanvas;
        getCanvasIndexById(id: string): number;
        getCanvasIndexByLabel(label: string): number;
        getCanvasMetadata(canvas: Manifesto.ICanvas): Manifold.IMetadataItem[];
        getCanvasRange(canvas: Manifesto.ICanvas, path?: string): Manifesto.IRange;
        getCanvasRanges(canvas: Manifesto.ICanvas): Manifesto.IRange[];
        getCollectionIndex(iiifResource: Manifesto.IIIIFResource): number;
        getCurrentCanvas(): Manifesto.ICanvas;
        getCurrentElement(): Manifesto.IElement;
        getCurrentSequence(): Manifesto.ISequence;
        getElementType(element?: Manifesto.IElement): Manifesto.ElementType;
        getFirstPageIndex(): number;
        getInfoUri(canvas: Manifesto.ICanvas): string;
        getLabel(): string;
        getLastCanvasLabel(alphanumeric?: boolean): string;
        getLastPageIndex(): number;
        getLicense(): string;
        getLogo(): string;
        getManifestType(): Manifesto.ManifestType;
        getMetadata(licenseFormatter?: Manifold.UriLabeller): Manifold.IMetadataItem[];
        getMultiSelectState(): Manifold.MultiSelectState;
        getRanges(): IRange[];
        getRangeByPath(path: string): any;
        getRangeCanvases(range: Manifesto.IRange): Manifesto.ICanvas[];
        getRelated(): any;
        getResources(): Manifesto.IAnnotation[];
        getSearchWithinService(): Manifesto.IService;
        getSeeAlso(): any;
        getSequenceByIndex(index: number): Manifesto.ISequence;
        getShareServiceUrl(): string;
        getSortedTreeNodesByDate(sortedTree: ITreeNode, tree: ITreeNode): void;
        getStartCanvasIndex(): number;
        getThumbs(width: number, height: number): Manifesto.IThumb[];
        getTopRanges(): Manifesto.IRange[];
        getTotalCanvases(): number;
        getTrackingLabel(): string;
        getTree(topRangeIndex?: number, sortType?: TreeSortType): ITreeNode;
        treeHasNavDates(tree: ITreeNode): boolean;
        getViewingDirection(): Manifesto.ViewingDirection;
        getViewingHint(): Manifesto.ViewingHint;
        hasParentCollection(): boolean;
        hasRelatedPage(): boolean;
        hasResources(): boolean;
        isBottomToTop(): boolean;
        isCanvasIndexOutOfRange(index: number): boolean;
        isContinuous(): boolean;
        isFirstCanvas(index?: number): boolean;
        isHorizontallyAligned(): boolean;
        isLastCanvas(index?: number): boolean;
        isLeftToRight(): boolean;
        isMultiCanvas(): boolean;
        isMultiSequence(): boolean;
        isPaged(): boolean;
        isPagingAvailable(): boolean;
        isPagingEnabled(): boolean;
        isRightToLeft(): boolean;
        isTopToBottom(): boolean;
        isTotalCanvasesEven(): boolean;
        isUIEnabled(name: string): boolean;
        isVerticallyAligned(): boolean;
        createDateNodes(rootNode: ITreeNode, nodes: ITreeNode[]): void;
        createDecadeNodes(rootNode: ITreeNode, nodes: ITreeNode[]): void;
        createMonthNodes(rootNode: ITreeNode, nodes: ITreeNode[]): void;
        createYearNodes(rootNode: ITreeNode, nodes: ITreeNode[]): void;
        getDecadeNode(rootNode: ITreeNode, year: number): ITreeNode;
        getMonthNode(yearNode: ITreeNode, month: Number): ITreeNode;
        getNodeDisplayDate(node: ITreeNode): string;
        getNodeDisplayMonth(node: ITreeNode): string;
        getNodeMonth(node: ITreeNode): number;
        getNodeYear(node: ITreeNode): number;
        getYearNode(decadeNode: ITreeNode, year: Number): ITreeNode;
        pruneDecadeNodes(rootNode: ITreeNode): void;
        sortDecadeNodes(rootNode: ITreeNode): void;
        sortMonthNodes(rootNode: ITreeNode): void;
        sortYearNodes(rootNode: ITreeNode): void;
    }
}

declare namespace Manifold {
    interface ICanvas extends IMultiSelectable, Manifesto.ICanvas {
    }
}

declare namespace Manifold {
    interface IHelper {
        iiifResource: Manifesto.IIIIFResource;
        iiifResourceUri: string;
        manifest: Manifesto.IManifest;
        collectionIndex: number;
        manifestIndex: number;
        canvasIndex: number;
        sequenceIndex: number;
        getAutoCompleteService(): Manifesto.IService;
        getAttribution(): string;
        getCanvases(): Manifesto.ICanvas[];
        getCanvasById(id: string): Manifesto.ICanvas;
        getCanvasesById(ids: string[]): Manifesto.ICanvas[];
        getCanvasByIndex(index: number): Manifesto.ICanvas;
        getCanvasIndexById(id: string): number;
        getCanvasIndexByLabel(label: string): number;
        getCanvasMetadata(canvas: Manifesto.ICanvas): Manifold.IMetadataItem[];
        getCanvasRange(canvas: Manifesto.ICanvas, path?: string): Manifesto.IRange;
        getCanvasRanges(canvas: Manifesto.ICanvas): Manifesto.IRange[];
        getCollectionIndex(iiifResource: Manifesto.IIIIFResource): number;
        getCurrentCanvas(): Manifesto.ICanvas;
        getCurrentElement(): Manifesto.IElement;
        getCurrentSequence(): Manifesto.ISequence;
        getElementType(element?: Manifesto.IElement): Manifesto.ElementType;
        getFirstPageIndex(): number;
        getInfoUri(canvas: Manifesto.ICanvas): string;
        getLabel(): string;
        getLastCanvasLabel(alphanumeric?: boolean): string;
        getLastPageIndex(): number;
        getLicense(): string;
        getLogo(): string;
        getManifestType(): Manifesto.ManifestType;
        getMetadata(): Manifold.IMetadataItem[];
        getMultiSelectState(): Manifold.MultiSelectState;
        getRanges(): IRange[];
        getRangeByPath(path: string): any;
        getRangeCanvases(range: Manifesto.IRange): Manifesto.ICanvas[];
        getRelated(): any;
        getResources(): Manifesto.IAnnotation[];
        getSearchWithinService(): Manifesto.IService;
        getSeeAlso(): any;
        getSequenceByIndex(index: number): Manifesto.ISequence;
        getShareServiceUrl(): string;
        getSortedTreeNodesByDate(sortedTree: ITreeNode, tree: ITreeNode): void;
        getStartCanvasIndex(): number;
        getThumbs(width: number, height: number): Manifesto.IThumb[];
        getTopRanges(): Manifesto.IRange[];
        getTotalCanvases(): number;
        getTrackingLabel(): string;
        getTree(topRangeIndex?: number, sortType?: TreeSortType): ITreeNode;
        getViewingDirection(): Manifesto.ViewingDirection;
        getViewingHint(): Manifesto.ViewingHint;
        hasParentCollection(): boolean;
        hasRelatedPage(): boolean;
        hasResources(): boolean;
        isBottomToTop(): boolean;
        isCanvasIndexOutOfRange(index: number): boolean;
        isContinuous(): boolean;
        isFirstCanvas(index?: number): boolean;
        isHorizontallyAligned(): boolean;
        isLastCanvas(index?: number): boolean;
        isLeftToRight(): boolean;
        isMultiCanvas(): boolean;
        isMultiSequence(): boolean;
        isPaged(): boolean;
        isPagingAvailable(): boolean;
        isPagingEnabled(): boolean;
        isRightToLeft(): boolean;
        isTopToBottom(): boolean;
        isTotalCanvasesEven(): boolean;
        isUIEnabled(name: string): boolean;
        isVerticallyAligned(): boolean;
        treeHasNavDates(tree: ITreeNode): boolean;
    }
}

interface IManifold {
    loadManifest: (options: Manifold.IManifoldOptions) => Promise<Manifold.IHelper>;
}

declare namespace Manifold {
    interface IManifoldOptions {
        iiifResourceUri: string;
        iiifResource: Manifesto.IIIIFResource;
        locale: string;
        manifest: Manifesto.IManifest;
        collectionIndex: number;
        manifestIndex: number;
        sequenceIndex: number;
        canvasIndex: number;
    }
}

declare namespace Manifold {
    interface IMetadataItem {
        label: string;
        value: string | IMetadataItem[];
        isRootLevel: boolean;
    }
}

declare namespace Manifold {
    interface IMultiSelectable {
        multiSelected: boolean;
        multiSelectEnabled: boolean;
    }
}

declare namespace Manifold {
    interface IRange extends IMultiSelectable, Manifesto.IRange {
    }
}

declare namespace Manifold {
    interface IThumb extends IMultiSelectable, Manifesto.IThumb {
        initialWidth: number;
        initialHeight: number;
    }
}

declare namespace Manifold {
    interface ITreeNode extends IMultiSelectable, Manifesto.ITreeNode {
    }
}

declare namespace Manifold {
    function loadManifest(options: any): Promise<IHelper>;
}

declare namespace Manifold {
    class MultiSelectState {
        isEnabled: boolean;
        ranges: IRange[];
        canvases: ICanvas[];
        allCanvasesSelected(): boolean;
        allRangesSelected(): boolean;
        allSelected(): boolean;
        getAll(): IMultiSelectable[];
        getAllSelectedCanvases(): ICanvas[];
        getAllSelectedRanges(): IRange[];
        getCanvasById(id: string): ICanvas;
        getCanvasesByIds(ids: string[]): ICanvas[];
        getRangeCanvases(range: Manifesto.IRange): Manifesto.ICanvas[];
        selectAll(selected: boolean): void;
        selectCanvas(canvas: ICanvas, selected: boolean): void;
        selectAllCanvases(selected: boolean): void;
        selectCanvases(canvases: ICanvas[], selected: boolean): void;
        selectRange(range: IRange, selected: boolean): void;
        selectAllRanges(selected: boolean): void;
        selectRanges(ranges: IRange[], selected: boolean): void;
        setEnabled(enabled: boolean): void;
    }
}

declare namespace Manifold {
    class UriLabeller {
        labels: Object;
        constructor(labels: Object);
        format(url: any): string;
    }
}

declare module Utils {
    class Async {
        static waitFor(test: () => boolean, successCallback: () => void, failureCallback?: () => void, interval?: number, maxTries?: number, numTries?: number): void;
    }
}
declare module Utils {
    class Bools {
        static getBool(val: any, defaultVal: boolean): boolean;
    }
}
declare module Utils {
    class Clipboard {
        static copy(text: string): void;
        static supportsCopy(): boolean;
    }
}
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
declare module Utils.Collections {
    import collections = Collections;
    /**
     * Function signature for comparing
     * <0 means a is smaller
     * = 0 means they are equal
     * >0 means a is larger
     */
    interface ICompareFunction<T> {
        (a: T, b: T): number;
    }
    /**
     * Function signature for checking equality
     */
    interface IEqualsFunction<T> {
        (a: T, b: T): boolean;
    }
    /**
     * Function signature for Iterations. Return false to break from loop
     */
    interface ILoopFunction<T> {
        (a: T): boolean;
    }
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare<T>(a: T, b: T): number;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals<T>(a: T, b: T): boolean;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item: any): string;
    /**
     * Joins all the properies of the object using the provided join string
     */
    function makeString<T>(item: T, join?: string): string;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func: any): boolean;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj: any): boolean;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj: any): boolean;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction<T>(compareFunction: ICompareFunction<T>): ICompareFunction<T>;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T>;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    module arrays {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): boolean;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency<T>(array: T[], item: T, equalsFunction?: collections.IEqualsFunction<T>): number;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals<T>(array1: T[], array2: T[], equalsFunction?: collections.IEqualsFunction<T>): boolean;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy<T>(array: T[]): T[];
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap<T>(array: T[], i: number, j: number): boolean;
        function toString<T>(array: T[]): string;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach<T>(array: T[], callback: (item: T) => boolean): void;
    }
    interface ILinkedListNode<T> {
        element: T;
        next: ILinkedListNode<T>;
    }
    class LinkedList<T> {
        /**
         * First node in the list
         * @type {Object}
         * @private
         */
        firstNode: ILinkedListNode<T>;
        /**
         * Last node in the list
         * @type {Object}
         * @private
         */
        private lastNode;
        /**
         * Number of elements in the list
         * @type {number}
         * @private
         */
        private nElements;
        /**
         * Creates an empty Linked List.
         * @class A linked list is a data structure consisting of a group of nodes
         * which together represent a sequence.
         * @constructor
         */
        constructor();
        /**
         * Adds an element to this list.
         * @param {Object} item element to be added.
         * @param {number=} index optional index to add the element. If no index is specified
         * the element is added to the end of this list.
         * @return {boolean} true if the element was added or false if the index is invalid
         * or if the element is undefined.
         */
        add(item: T, index?: number): boolean;
        /**
         * Returns the first element in this list.
         * @return {*} the first element of the list or undefined if the list is
         * empty.
         */
        first(): T;
        /**
         * Returns the last element in this list.
         * @return {*} the last element in the list or undefined if the list is
         * empty.
         */
        last(): T;
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        elementAtIndex(index: number): T;
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        indexOf(item: T, equalsFunction?: IEqualsFunction<T>): number;
        /**
         * Returns true if this list contains the specified element.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {boolean} true if this list contains the specified element, false
         * otherwise.
         */
        contains(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        remove(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Removes all of the elements from this list.
         */
        clear(): void;
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        equals(other: LinkedList<T>, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * @private
         */
        private equalsAux(n1, n2, eqF);
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        removeElementAtIndex(index: number): T;
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: (item: T) => boolean): void;
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        reverse(): void;
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        toArray(): T[];
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        size(): number;
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        isEmpty(): boolean;
        toString(): string;
        /**
         * @private
         */
        private nodeAtIndex(index);
        /**
         * @private
         */
        private createNode(item);
    }
    interface IDictionaryPair<K, V> {
        key: K;
        value: V;
    }
    class Dictionary<K, V> {
        /**
         * Object holding the key-value pairs.
         * @type {Object}
         * @private
         */
        protected table: {
            [key: string]: IDictionaryPair<K, V>;
        };
        /**
         * Number of elements in the list.
         * @type {number}
         * @private
         */
        protected nElements: number;
        /**
         * Function used to convert keys to strings.
         * @type {function(Object):string}
         * @protected
         */
        protected toStr: (key: K) => string;
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        constructor(toStrFunction?: (key: K) => string);
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        getValue(key: K): V;
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        setValue(key: K, value: V): V;
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        remove(key: K): V;
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        keys(): K[];
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        values(): V[];
        /**
         * Executes the provided function once for each key-value pair
         * present in this dictionary.
         * @param {function(Object,Object):*} callback function to execute, it is
         * invoked with two arguments: key and value. To break the iteration you can
         * optionally return false.
         */
        forEach(callback: (key: K, value: V) => any): void;
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        containsKey(key: K): boolean;
        /**
         * Removes all mappings from this dictionary.
         * @this {collections.Dictionary}
         */
        clear(): void;
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        size(): number;
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        isEmpty(): boolean;
        toString(): string;
    }
    class LinkedDictionary<K, V> extends Dictionary<K, V> {
        private head;
        private tail;
        constructor(toStrFunction?: (key: K) => string);
        /**
         * Inserts the new node to the 'tail' of the list, updating the
         * neighbors, and moving 'this.tail' (the End of List indicator) that
         * to the end.
         */
        private appendToTail(entry);
        /**
         * Retrieves a linked dictionary from the table internally
         */
        private getLinkedDictionaryPair(key);
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        getValue(key: K): V;
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * Also, if a value is present for this key, the entry is removed from the
         * insertion ordering.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        remove(key: K): V;
        /**
         * Removes all mappings from this LinkedDictionary.
         * @this {collections.LinkedDictionary}
         */
        clear(): void;
        /**
         * Internal function used when updating an existing KeyValue pair.
         * It places the new value indexed by key into the table, but maintains
         * its place in the linked ordering.
         */
        private replace(oldPair, newPair);
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * Updating of a key that already exists maintains its place in the
         * insertion order into the map.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        setValue(key: K, value: V): V;
        /**
         * Returns an array containing all of the keys in this LinkedDictionary, ordered
         * by insertion order.
         * @return {Array} an array containing all of the keys in this LinkedDictionary,
         * ordered by insertion order.
         */
        keys(): K[];
        /**
         * Returns an array containing all of the values in this LinkedDictionary, ordered by
         * insertion order.
         * @return {Array} an array containing all of the values in this LinkedDictionary,
         * ordered by insertion order.
         */
        values(): V[];
        /**
         * Executes the provided function once for each key-value pair
         * present in this LinkedDictionary. It is done in the order of insertion
         * into the LinkedDictionary
         * @param {function(Object,Object):*} callback function to execute, it is
         * invoked with two arguments: key and value. To break the iteration you can
         * optionally return false.
         */
        forEach(callback: (key: K, value: V) => any): void;
    }
    class MultiDictionary<K, V> {
        private dict;
        private equalsF;
        private allowDuplicate;
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
         *  return pet1.age===pet2.age;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        constructor(toStrFunction?: (key: K) => string, valuesEqualsFunction?: IEqualsFunction<V>, allowDuplicateValues?: boolean);
        /**
         * Returns an array holding the values to which this dictionary maps
         * the specified key.
         * Returns an empty array if this dictionary contains no mappings for this key.
         * @param {Object} key key whose associated values are to be returned.
         * @return {Array} an array holding the values to which this dictionary maps
         * the specified key.
         */
        getValue(key: K): V[];
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        setValue(key: K, value: V): boolean;
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        remove(key: K, value?: V): boolean;
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        keys(): K[];
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        values(): V[];
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        containsKey(key: K): boolean;
        /**
         * Removes all mappings from this dictionary.
         */
        clear(): void;
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        size(): number;
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        isEmpty(): boolean;
    }
    class Heap<T> {
        /**
         * Array used to store the elements od the heap.
         * @type {Array.<Object>}
         * @private
         */
        private data;
        /**
         * Function used to compare elements.
         * @type {function(Object,Object):number}
         * @private
         */
        private compare;
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        constructor(compareFunction?: ICompareFunction<T>);
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        private leftChildIndex(nodeIndex);
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        private rightChildIndex(nodeIndex);
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        private parentIndex(nodeIndex);
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        private minIndex(leftChild, rightChild);
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        private siftUp(index);
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        private siftDown(nodeIndex);
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        peek(): T;
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        add(element: T): boolean;
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        removeRoot(): T;
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        contains(element: T): boolean;
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        size(): number;
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this heap.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: (item: T) => boolean): void;
    }
    class Stack<T> {
        /**
         * List containing the elements.
         * @type collections.LinkedList
         * @private
         */
        private list;
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        constructor();
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        push(elem: T): boolean;
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        add(elem: T): boolean;
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        pop(): T;
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        peek(): T;
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        size(): number;
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this stack.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
    }
    class Queue<T> {
        /**
         * List containing the elements.
         * @type collections.LinkedList
         * @private
         */
        private list;
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        constructor();
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        enqueue(elem: T): boolean;
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        add(elem: T): boolean;
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        dequeue(): T;
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        peek(): T;
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        size(): number;
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this queue.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
    }
    class PriorityQueue<T> {
        private heap;
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        constructor(compareFunction?: ICompareFunction<T>);
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        enqueue(element: T): boolean;
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        add(element: T): boolean;
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        dequeue(): T;
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        peek(): T;
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        size(): number;
        /**
         * Removes all of the elements from this priority queue.
         */
        clear(): void;
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
    }
    class Set<T> {
        private dictionary;
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        constructor(toStringFunction?: (item: T) => string);
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        add(element: T): boolean;
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        intersection(otherSet: Set<T>): void;
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        union(otherSet: Set<T>): void;
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        difference(otherSet: Set<T>): void;
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        isSubsetOf(otherSet: Set<T>): boolean;
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        remove(element: T): boolean;
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        toArray(): T[];
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        size(): number;
        /**
         * Removes all of the elements from this set.
         */
        clear(): void;
        toString(): string;
    }
    class Bag<T> {
        private toStrF;
        private dictionary;
        private nElements;
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        constructor(toStrFunction?: (item: T) => string);
        /**
         * Adds nCopies of the specified object to this bag.
         * @param {Object} element element to add.
         * @param {number=} nCopies the number of copies to add, if this argument is
         * undefined 1 copy is added.
         * @return {boolean} true unless element is undefined.
         */
        add(element: T, nCopies?: number): boolean;
        /**
         * Counts the number of copies of the specified object in this bag.
         * @param {Object} element the object to search for..
         * @return {number} the number of copies of the object, 0 if not found
         */
        count(element: T): number;
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
         * Removes nCopies of the specified object to this bag.
         * If the number of copies to remove is greater than the actual number
         * of copies in the Bag, all copies are removed.
         * @param {Object} element element to remove.
         * @param {number=} nCopies the number of copies to remove, if this argument is
         * undefined 1 copy is removed.
         * @return {boolean} true if at least 1 element was removed.
         */
        remove(element: T, nCopies?: number): boolean;
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        toArray(): T[];
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        toSet(): Set<T>;
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        size(): number;
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        isEmpty(): boolean;
        /**
         * Removes all of the elements from this bag.
         */
        clear(): void;
    }
    class BSTree<T> {
        private root;
        private compare;
        private nElements;
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        constructor(compareFunction?: ICompareFunction<T>);
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        add(element: T): boolean;
        /**
         * Removes all of the elements from this tree.
         */
        clear(): void;
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        isEmpty(): boolean;
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        size(): number;
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        contains(element: T): boolean;
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        remove(element: T): boolean;
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        inorderTraversal(callback: ILoopFunction<T>): void;
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        preorderTraversal(callback: ILoopFunction<T>): void;
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        postorderTraversal(callback: ILoopFunction<T>): void;
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        levelTraversal(callback: ILoopFunction<T>): void;
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        minimum(): T;
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        maximum(): T;
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        forEach(callback: ILoopFunction<T>): void;
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        toArray(): T[];
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        height(): number;
        /**
         * @private
         */
        private searchNode(node, element);
        /**
         * @private
         */
        private transplant(n1, n2);
        /**
         * @private
         */
        private removeNode(node);
        /**
         * @private
         */
        private inorderTraversalAux(node, callback, signal);
        /**
         * @private
         */
        private levelTraversalAux(node, callback);
        /**
         * @private
         */
        private preorderTraversalAux(node, callback, signal);
        /**
         * @private
         */
        private postorderTraversalAux(node, callback, signal);
        /**
         * @private
         */
        private minimumAux(node);
        /**
         * @private
         */
        private maximumAux(node);
        /**
         * @private
         */
        private heightAux(node);
        private insertNode(node);
        /**
         * @private
         */
        private createNode(element);
    }
}
declare module Utils {
    class Colors {
        static float32ColorToARGB(float32Color: number): number[];
        private static _componentToHex(c);
        static rgbToHexString(rgb: number[]): string;
        static argbToHexString(argb: number[]): string;
        static coalesce(arr: any[]): void;
    }
}
declare module Utils {
    class Dates {
        static getTimeStamp(): number;
    }
}
declare module Utils {
    class Device {
        static getPixelRatio(ctx: CanvasRenderingContext2D): number;
        static isTouch(): boolean;
    }
}
declare module Utils {
    class Documents {
        static isInIFrame(): boolean;
        static supportsFullscreen(): boolean;
        static isHidden(): boolean;
        static getHiddenProp(): string;
    }
}
declare module Utils {
    class Events {
        static debounce(fn: any, debounceDuration: number): () => any;
    }
}
declare module Utils {
    class Files {
        static simplifyMimeType(mime: string): string;
    }
}
declare module Utils {
    class Keyboard {
        static getCharCode(e: KeyboardEvent): number;
    }
}
declare module Utils.Maths {
    class Vector {
        X: number;
        Y: number;
        constructor(x: number, y: number);
        get(): Vector;
        set(x: number, y: number): void;
        add(v: Vector): void;
        static add(v1: Vector, v2: Vector): Vector;
        sub(v: Vector): void;
        static sub(v1: Vector, v2: Vector): Vector;
        mult(n: number): void;
        static mult(v1: Vector, v2: Vector): Vector;
        static multN(v1: Vector, n: number): Vector;
        Div(n: number): void;
        static div(v1: Vector, v2: Vector): Vector;
        static divN(v1: Vector, n: number): Vector;
        mag(): number;
        magSq(): number;
        normalise(): void;
        limit(max: number): void;
        equals(v: Vector): boolean;
        heading(): number;
        static random2D(): Vector;
        static fromAngle(angle: number): Vector;
    }
}
declare module Utils.Measurements {
    class Size {
        width: number;
        height: number;
        constructor(width: number, height: number);
    }
    class Dimensions {
        static fitRect(width1: number, height1: number, width2: number, height2: number): Size;
        static hitRect(x: number, y: number, w: number, h: number, mx: number, my: number): boolean;
    }
}
declare module Utils {
    class Numbers {
        static numericalInput(event: any): boolean;
    }
}
declare module Utils {
}
declare module Utils {
    class Storage {
        private static _memoryStorage;
        static clear(storageType?: StorageType): void;
        static clearExpired(storageType?: StorageType): void;
        static get(key: string, storageType?: StorageType): StorageItem;
        private static _isExpired(item);
        static getItems(storageType?: StorageType): StorageItem[];
        static remove(key: string, storageType?: StorageType): void;
        static set(key: string, value: any, expirationSecs: number, storageType?: StorageType): StorageItem;
    }
}
declare module Utils {
    class StorageItem {
        key: string;
        value: any;
        expiresAt: number;
    }
}
declare module Utils {
    class StorageType {
        value: string;
        static memory: StorageType;
        static session: StorageType;
        static local: StorageType;
        constructor(value: string);
        toString(): string;
    }
}
declare module Utils {
    class Strings {
        static ellipsis(text: string, chars: number): string;
        static htmlDecode(encoded: string): string;
    }
}
declare module Utils {
    class Urls {
        static getHashParameter(key: string, doc?: Document): string;
        static setHashParameter(key: string, value: any, doc?: Document): void;
        static getQuerystringParameter(key: string, w?: Window): string;
        static getQuerystringParameterFromString(key: string, querystring: string): string;
        static setQuerystringParameter(key: string, value: any, doc?: Document): void;
        static updateURIKeyValuePair(uriSegment: string, key: string, value: string): string;
        static getUrlParts(url: string): any;
        static convertToRelativeUrl(url: string): string;
    }
}

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
