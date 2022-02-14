import { TextField } from '@mui/material';
import { TartColors } from '../styles/TartStyles';

const AKTextFiled = (props) => {
  const {
    label,
    name,
    value,
    onChange,
    className,
    transition = true,
    disabled = false,
    error = false
  } = props;
  return (
    <div
      className={`${className} w-full ${
        transition && 'transition-all hover:scale-105'
      } ${error && 'border-red-400'}`}
    >
      <TextField
        error={error}
        disabled={disabled}
        label={label}
        name={name}
        variant="standard"
        value={value}
        sx={{
          '& .MuiInput-underline:before': {
            border: 'none'
          },
          '& .MuiInput-underline:after': {
            border: 'none'
          },
          '& .MuiInput-underline:hover:before': {
            border: 'none'
          }
        }}
        InputProps={{
          className: `text-black text-[18px]`,
          sx: {
            '&&:hover::before': {
              border: 'none'
            },
            '&&:before': {
              border: 'none'
            }
          }
        }}
        InputLabelProps={{
          style: {
            color: '#a2a2a280',
            fontSize: '14px',
            fontWeight: '400'
          }
        }}
        onChange={onChange}
        fullWidth
      />
    </div>
  );
};

export default AKTextFiled;
