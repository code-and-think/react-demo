import { DatePicker, Input, message } from 'antd';
import { pick } from 'lodash';
import moment from 'moment';
import { FC } from 'react';
import create from 'zustand';
import { ITableRow } from '../Content';

export const useParams = create<
  ITableRow & { onParamsChange: (partial?: Record<string, any>) => void }
>(set => ({
  desc: '',
  name: '',
  startPrice: '',
  startTime: undefined,
  endTime: undefined,
  img: '',
  onParamsChange: partial => {
    set(pre => partial ?? pick(pre, 'onParamsChange'), !Boolean(partial));
  },
}));

export const withFilterItem = <Props extends { label: string; paramsKey: keyof ITableRow }>(
  Component: FC<Props & { value: any; onChange: (newValue: any) => void }>
) => {
  return ({ paramsKey, ...props }: Props) => {
    const { [paramsKey]: value, onParamsChange } = useParams();

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.label && <div style={{ color: '#999999', width: '25%' }}>{props.label}</div>}
        <div style={{ flex: 1, display: 'flex', columnGap: 16 }}>
          <Component
            {...{
              ...(props as any),
              paramsKey,
              value,
              onChange: newValue => onParamsChange({ [paramsKey]: newValue }),
            }}
          />
        </div>
      </div>
    );
  };
};

export const Search = withFilterItem(({ value, label, onChange }) => {
  return (
    <Input.Search
      allowClear
      placeholder={`请输入${label}`}
      defaultValue={value}
      // 输入触发 onChange，enter触发onSearch，清除时先触发 onSearch 再触发 onChange
      onSearch={onChange}
      onBlur={e => onChange(e.target.value)}
    />
  );
});

export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const DateTime = withFilterItem(({ label, onChange, value, paramsKey }) => {
  return (
    <DatePicker
      allowClear
      showTime
      placeholder={`请选择${label}`}
      style={{ width: '100%' }}
      value={value && moment(new Date(value), TIME_FORMAT)}
      onChange={moment => {
        const timeStamp = moment?.valueOf();
        const { startTime, endTime } = useParams.getState();
        if (
          (
            {
              startTime: Number(timeStamp) > Number(endTime),
              endTime: Number(timeStamp) < Number(startTime),
            } as any
          )[paramsKey]
        ) {
          message.error('必须保证开始时间再结束时间之前！');
        } else {
          onChange(timeStamp);
        }
      }}
    />
  );
});
