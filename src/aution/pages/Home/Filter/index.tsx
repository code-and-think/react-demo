import { DateTime, Search } from './FilterItem';

export default function Filter() {
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridAutoRows: '1fr',
          gridTemplateColumns: 'repeat(3,30%)',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: '#fff',
          padding: '30px 20px',
          rowGap: 24,
        }}
      >
        <Search paramsKey="name" label="名称" />
        <Search paramsKey="desc" label="描述" />
        <DateTime paramsKey="startTime" label="开始时间" />
        <DateTime paramsKey="endTime" label="结束时间" />
        <Search paramsKey="startPrice" label="起拍价" />
      </div>
    </>
  );
}
