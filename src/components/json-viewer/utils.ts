export function getType(value: any): string {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    if (Number.isNaN(value)) return 'nan';
    return typeof value;
}

export function isEmpty(value: any): boolean {
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length === 0;
    return false;
} 
