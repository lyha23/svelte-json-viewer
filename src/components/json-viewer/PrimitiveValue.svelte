<script lang="ts">
    export let data: string | number | boolean | null;
    export let type: string;

    function getValuePreview(value: any): string {
        switch (type) {
            case 'string':
                return `"${value}"`;
            case 'nan':
                return 'NaN';
            default:
                return String(value);
        }
    }
</script>

<span
    class="
    {type === 'string' ? 'text-red-600' : ''}
    {type === 'number' ? 'text-blue-700' : ''}
    {type === 'boolean' ? 'text-blue-600' : ''}
    {type === 'null' || type === 'nan'
        ? 'text-gray-600 bg-gray-200 text-sm font-bold rounded px-2 py-0.5'
        : ''}
    {!['string', 'number', 'boolean', 'null', 'nan'].includes(type)
        ? 'text-blue-800'
        : ''}
    "
>
    {getValuePreview(data)}
</span> 
