export {};
function simplifyPath(path: string): string {
  const res = [''];

  for (const part of path.split('/')) {
    switch (part) {
      case '':
      case '.':
        break;
      case '..':
        if (res.length > 1) {
          res.pop();
        }
        break;
      default:
        res.push(part);
    }
  }

  return res.join('/') || '/';
}

console.log(simplifyPath("/a/../../b/../c//.//"));
