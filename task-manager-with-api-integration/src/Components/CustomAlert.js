import { Alert, Snackbar } from "@mui/material"

const CustomAlert = (props) => {
    const { isSnackbarOpen,
        handleSnackbarClose,
        alertMessage,
        severity,
        hideDuration
    } = props;
    return <Snackbar
        anchorOrigin={{
            vertical: 'top', horizontal: 'right'
        }}
        open={isSnackbarOpen}
        autoHideDuration={hideDuration || 2000} // Auto-hide after 2 seconds
        onClose={handleSnackbarClose}
    >
        <Alert
            onClose={handleSnackbarClose}
            severity={severity || "success"}>
            {alertMessage}
        </Alert>
    </Snackbar>
}
export default CustomAlert;