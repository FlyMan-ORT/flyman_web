// import { Snackbar } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';
// import { forwardRef } from 'react';

// const Alert = forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

// export function SnackBarFlyMan({severity, message, open, handleClick}) {
//     return (
//     <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClick}>
//         <Alert onClose={handleClick} severity={severity} sx={{ width: '100%' }}>
//             {message}
//         </Alert>
//     </Snackbar>);
// }