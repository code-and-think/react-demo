// 下划线改驼峰
function camelCase(str) {
  return str.replace(/_+(\w)/g, (_, $2) => {
    return $2.toUpperCase();
  });
}
