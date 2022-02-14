import swal from '@sweetalert/with-react';

export const NetworkError = () => {
  swal('Network Error', 'Please reload this page', 'error', {
    buttons: {
      reload: {
        text: 'Reload'
      }
    }
  }).then((value) => {
    switch (value) {
      case 'reload':
        window.location.reload();
        break;
      default:
        break;
    }
  });
};
