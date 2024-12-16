import { writable } from 'svelte/store'

export const copiedData = writable<any>(null) 


export function copyValue(value: any) {
	copiedData.set(value)
}
