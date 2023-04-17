import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker&inline';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker&inline';
// @ts-ignore
import { language as pythonLanguage } from 'monaco-editor/esm/vs/basic-languages/python/python.js';

monaco.languages.registerCompletionItemProvider('python', {
  provideCompletionItems: function () {
    let suggestions = [] as any[];
    // 提供 keywords
    pythonLanguage.keywords.forEach((item: any) => {
      suggestions.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: item,
      });
    });
    return {
      suggestions: suggestions,
    };
  },
});

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });
