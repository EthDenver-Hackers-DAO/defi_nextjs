import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';

const AKLoadingButton = (props) => {
  const {
    id,
    size = 'medium',
    sx,
    loading,
    onClick,
    children,
    variant,
    className,
    loadingIndicatorSize = 16
  } = props;
  return (
    <LoadingButton
      id={id}
      size={size}
      className={className}
      loading={loading}
      loadingPosition="center"
      loadingIndicator={
        <CircularProgress color="inherit" size={loadingIndicatorSize} />
      }
      // endIcon={icon}
      variant={variant}
      sx={{
        // color: 'black',
        fontWeight: 'bold',
        transition: 'all 0.2s',
        ':hover': {
          opacity: '0.5',
          bgcolor: '#13293d',
          color: '#ffffff'
        },
        ...sx
      }}
      onClick={onClick}
    >
      {children}
    </LoadingButton>
  );
};

export default AKLoadingButton;
