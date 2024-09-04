import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import { CloseIconBlack } from '../Icons';

const widgetConfig: WidgetConfig = {
    theme: {
        container: {
            border: '1px solid rgb(234, 234, 234)',
            borderRadius: '16px',
        },
    },
    integrator: 'Sky Trade'
};

export const LiFiComponent = ({onClose}:any) => {
  return (
    <div className='fixed left-0  md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[500] sm:z-50 backdrop-blur-md'>
        <div
            onClick={onClose}
            className=" absolute top-[8px] right-[8px] w-[10px] h-[10px] ml-auto cursor-pointer z-[500] sm:z-50"
          >
            <CloseIconBlack />
          </div>
        <LiFiWidget integrator="Sky Trade" config={widgetConfig} />
    </div>
  );
};