import { Space } from '@arco-design/web-react';
import ReactTheory from './0_自定义事件与batchUpdate';

import Emitter from './2_state_manged/Emitter';
import GlobalState from './2_state_manged/GlobalState';
import ServerState from './2_state_manged/ServerState';
import { ReactHookDemo } from './1_mock_hooks/demo';

export default function App() {
  return (
    <Space direction="vertical" size="large">
      <ReactHookDemo />
      {/* <ReactTheory /> */}
      {/* <Emitter /> */}
      {/* <GlobalState /> */}
      {/* <ServerState /> */}
    </Space>
  );
}
