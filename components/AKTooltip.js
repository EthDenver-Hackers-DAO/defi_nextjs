import { Tooltip } from '@mui/material';
import QuestionIcon from '../public/assets/global-question-icon.png';
import Image from 'next/image';
const AKToolTip = (props) => {
  const { parent, tooltipElement } = props;
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            maxWidth: 'none'
          }
        }
      }}
      title={tooltipElement}
    >
      {parent || (
        <div className="w-[18px] h-[18px] cursor-help mx-[8px]">
          <Image src={QuestionIcon} alt="icon" />
        </div>
      )}
    </Tooltip>
  );
};

export default AKToolTip;
