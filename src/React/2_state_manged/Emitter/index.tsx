import { Button, Card, Input } from '@arco-design/web-react';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';

import { useRef, useState } from 'react';
import { useEmitter } from './useEmitter';

export default function Emitter() {
  const emitJumpToFile = useEmitter('JumpToFile');
  const inputRef = useRef<RefInputType>(null);

  return (
    <Card title="Emitter">
      <Button
        children="jump to"
        onClick={() => emitJumpToFile(inputRef.current?.dom.value ?? '')}
      />
      <Input  ref={inputRef} />
      <Editor />
    </Card>
  );
}

function Editor() {
  const [path, setPath] = useState('-');

  useEmitter('JumpToFile', setPath);

  return <div>current path is {path || '-'}</div>;
}
