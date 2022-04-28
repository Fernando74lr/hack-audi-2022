import PropTypes from 'prop-types';
import { styled as styledMui } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toastSW } from '../../helpers/sweetAlert2';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { updateUserType } from '../../actions/user';

const BootstrapDialog = styledMui(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        height: '220px',
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const userTypeComponent = (params) => (
    <TextField
        required
        margin="normal"
        {...params}
        label="User type"
        id="userType"
        name="userType"
        variant="outlined"
    />
);

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const EditUserDialog = ({ open, handleClose, currentUid, setUsers }) => {
    const [userType, setUserType] = useState([]);
    const dispatch = useDispatch();

    const handleUpdateUser = () => {
        dispatch(updateUserType(currentUid, userType));
        setUsers([]);
    };

    /*
        1: proveedor
        2: operador
        3: admin
    */

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Update user's type
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={userType}
                            name="state"
                            onChange={(e, value) => setUserType(value)}
                            disablePortal
                            options={["1", "2", "3"]}
                            renderInput={(params) => userTypeComponent(params)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={() => {
                                if (userType.length > 0) {
                                    handleUpdateUser();
                                    handleClose();
                                } else {
                                    toastSW('error', 'Missing fields');
                                }
                            }}
                        >
                            Update user
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </BootstrapDialog>
    );
};
