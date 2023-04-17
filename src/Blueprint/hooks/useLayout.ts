import { useMemoizedFn } from 'ahooks';
import dagre from 'dagre';
import { Position } from 'react-flow-renderer';
import { UseNodeEdge } from '.';

/**
 * 蓝图节点自动布局
 * @param props
 * @returns
 */
export function useOnLayout({
  nodes,
  edges,
  setNodes,
}: Pick<UseNodeEdge, 'nodes' | 'setNodes' | 'edges'>) {
  return useMemoizedFn((direction: 'TB' | 'LR' = 'LR') => {
    const Graph = new dagre.graphlib.Graph();
    Graph.setDefaultEdgeLabel(() => ({}));
    const isHorizontal = direction === 'LR';
    Graph.setGraph({ rankdir: direction });

    nodes.forEach(node => {
      Graph.setNode(node.id, { width: node.width || nodeWidth, height: node.height || nodeHeight });
    });

    edges.forEach(edge => {
      Graph.setEdge(edge.source, edge.target);
    });

    dagre.layout(Graph);

    setNodes(
      nodes.map(node => {
        const nodeWithPosition = Graph.node(node.id);
        return {
          ...node,
          // targetHandle 的位置
          targetPosition: isHorizontal ? Position.Left : Position.Top,
          // sourceHandle 的位置
          sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
          position: {
            x: nodeWithPosition.x,
            y: nodeWithPosition.y,
          },
        };
      })
    );
  });
}

const nodeWidth = 172;
const nodeHeight = 224;
