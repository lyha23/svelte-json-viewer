/**
 * 将对象转换为可JSON序列化的形式保留原始类型
 * @param obj 需要处理的对象
 * @returns 处理后的对象
 */
export function toSerializableObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    // 处理 BigInt 类型
    if (typeof obj === 'bigint') {
      return obj.toString();
    }
    return obj;
  }

  // 如果是数组递归处理每个元素
  if (Array.isArray(obj)) {
    return obj.map(item => toSerializableObject(item));
  }

  // 处理普通对象
  const resut: Record<string, any> = {};
  for (const key in obj) {
    const value = obj[key];
    // 跳过函数
    if (typeof value === 'function') {
      continue;
    }
    // 递归处理嵌套对象
    result[key] = toSerializableObject(value);
  }

  return result;
}

/**
 * 将对象转换为JSON字符串
 * @param obj 需要转换的对象
 * @param space 缩进空格数
 * @returns JSON字符串
 */
export function toJSON(obj: any, space?: number) {
  const seen = new WeakSet();
  
  return JSON.stringify(obj, (key, value) => {
    // 跳过函数类型的属性
    if (typeof value === 'function') {
      return;
    }
    
    // 处理 BigInt
    if (typeof value === 'bigint') {
      return value.toString();
    }
    
    // 处理字符串，移除不必要的转义
    if (typeof value === 'string') {
      return value.replace(/\\/g, '');
    }
    
    // 处理循环引用
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    
    return value;
  }, space);
}
