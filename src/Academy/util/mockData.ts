export const mockCodeTree = () =>
  new Promise<CodeTree>(resolve => {
    setTimeout(() => {
      resolve({
        title: 'root',
        children: [
          {
            title: 'test.py',
            content: 'print("test")',
          },
          {
            title: 'a.py',
            content: 'def test(){}',
          },
          {
            title: 'ab.py',
            content: 'print("mmm");print("mmm");print("mmm");',
          },
          {
            title: 'abb.py',
            content: 'print("fff")',
          },
          {
            title: 'dir',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'files',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'afb',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'adad',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'fbfb',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'qtqt',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'zzzz',
            children: [
              {
                title: 'hello.py',
                content: 'this is hello.py',
              },
              {
                title: 'a.py',
                content: 'this is a.py',
              },
              {
                title: 'b.py',
                content: 'this is b.py',
              },
              {
                title: 'c.py',
                content: 'this is c.py',
              },
            ],
          },
          {
            title: 'bba.py',
            content: 'print("test")',
          },
          {
            title: 'qqq.py',
            content: 'print("test")',
          },
        ],
      });
    }, 1000);
  });
