import ReactDOM from 'react-dom';
import { ReactFlowProvider } from 'react-flow-renderer';
import './index.less';
import App from './aution/App';

ReactDOM.render(
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>,
  document.getElementById('root')
);
