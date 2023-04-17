import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// @ts-ignore
import { language as pythonLanguage } from 'monaco-editor/esm/vs/basic-languages/python/python.js';

monaco.languages.registerCompletionItemProvider('python', {
  provideCompletionItems: function () {
    let suggestions = [] as any[];
    // 这个keywords就是python.js文件中有的
    pythonLanguage.keywords.forEach((item: any) => {
      suggestions.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: item,
      });
    });
    return {
      // 最后要返回一个数组
      suggestions: suggestions,
    };
  },
});

self.MonacoEnvironment = {
  getWorker(_, label) {
    console.log({ label });
    if (label === 'json') {
      return new jsonWorker();
    } else if (label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });
