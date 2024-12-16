export function getType(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Number.isNaN(value)) return 'nan';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof RegExp) return 'regexp';
    if (value instanceof Error) return 'error';
    if (value instanceof Map) return 'map';
    if (value instanceof Set) return 'set';
    if (ArrayBuffer.isView(value)) {
        if (value instanceof DataView) return 'dataview';
        return 'typedarray';
    }
    if (typeof value === 'symbol') return 'symbol';
    if (typeof value === 'bigint') return 'bigint';
    if (typeof value === 'function') return 'function';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'object') return 'object';
    return typeof value;
}

export function isEmpty(value: any): boolean {
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length === 0;
    return false;
} 

export const typeCheckers = {
    isNull: (value: any): value is null => value === null,
    isUndefined: (value: any): value is undefined => value === undefined,
    isNaN: (value: any): boolean => Number.isNaN(value),
    isArray: Array.isArray,
    isDate: (value: any): value is Date => value instanceof Date,
    isRegExp: (value: any): value is RegExp => value instanceof RegExp,
    isError: (value: any): value is Error => value instanceof Error,
    isMap: (value: any): value is Map<any, any> => value instanceof Map,
    isSet: (value: any): value is Set<any> => value instanceof Set,
    isTypedArray: (value: any): boolean => ArrayBuffer.isView(value) && !(value instanceof DataView),
    isDataView: (value: any): value is DataView => value instanceof DataView,
    isSymbol: (value: any): value is symbol => typeof value === 'symbol',
    isBigInt: (value: any): value is bigint => typeof value === 'bigint',
    isFunction: (value: any): value is Function => typeof value === 'function',
    isString: (value: any): value is string => typeof value === 'string',
    isNumber: (value: any): value is number => typeof value === 'number',
    isBoolean: (value: any): value is boolean => typeof value === 'boolean',
    isObject: (value: any): value is object => typeof value === 'object' && value !== null
};

export const DATA_TYPES = {
    NULL: 'null',
    UNDEFINED: 'undefined',
    NAN: 'nan',
    ARRAY: 'array',
    DATE: 'date',
    REGEXP: 'regexp',
    ERROR: 'error',
    MAP: 'map',
    SET: 'set',
    TYPED_ARRAY: 'typedarray',
    DATAVIEW: 'dataview',
    SYMBOL: 'symbol',
    BIGINT: 'bigint',
    FUNCTION: 'function',
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    OBJECT: 'object'
} as const;

export type DataTypeString = typeof DATA_TYPES[keyof typeof DATA_TYPES];

export function isComplexType(value: any): boolean {
  const type = getType(value);
  return (type === 'object' || type === 'array');
}

export function shouldShowComma(value: any): boolean {
  return !(isComplexType(value));
}
