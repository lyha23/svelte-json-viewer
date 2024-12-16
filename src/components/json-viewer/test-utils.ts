function isJSONStringifiable(obj: any): boolean {
  // 检测循环引用
  const seen = new WeakSet();
  function detect(obj: any): boolean {
      // 处理基本类型
      if (obj === null || typeof obj !== 'object') {
          return true;
      }

      // 检测循环引用
      if (seen.has(obj)) {
          return false;
      }
      seen.add(obj);

      // 检查特殊类型
      if (obj instanceof Function ||
          obj instanceof WeakMap ||
          obj instanceof WeakSet ||
          obj instanceof Symbol ||
          obj instanceof BigInt) {
          return false;
      }

      // 递归检查对象的所有属性
      for (let key in obj) {
          if (!detect(obj[key])) {
              return false;
          }
      }

      return true;
  }

  return detect(obj);
}

function getData(data: any) {
  if (!isJSONStringifiable(data)) {
      // 对于不能 stringify 的对象，返回其基本信息
      const type = Object.prototype.toString.call(data);
      return [`[${type}]`, 'unserializable'];
  }
  
  try {
      return [JSON.stringify(data), typeof data];
  } catch (e) {
      console.log('Stringify failed:', data);
      return [Object.prototype.toString.call(data), typeof data];
  }
}

export { getData }
