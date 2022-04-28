import PropTypes from 'prop-types';
import { styled as styledMui } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toastSW } from '../../helpers/sweetAlert2';

const BootstrapDialog = styledMui(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

export const ScannerDialog = ({ open, handleClose }) => {
    const [scanned, setScanned] = useState(false);
    const navigate = useNavigate();
    // QR
    const [qrText, setData] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state);

    const onScan = (data) => {
        setData(data);
        setScanned(true);
    }

    const scanQr = () => {
        onScan({
            pay: false,
            sampleTaked: true
        });
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Find order by part number
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <QrReader
                    containerStyle={containerStyle}
                    videoContainerStyle={videoContainerStyle}
                    videoStyle={videoStyle}
                    id="qr-video"
                    onResult={async (result) => {
                        if (!!result) {
                            console.log('RES: ', result);
                            const ult = orders.find((item) => result.text === item.partNumber) || null;
                            if (ult.partNumber) {
                                navigate(`/ult-detail/${ult.partNumber}`)
                            } else {
                                toastSW('warning', 'Part number not found')
                            }
                            setShowScanner(!showScanner);
                        }
                    }}
                />
            </DialogContent>
        </BootstrapDialog>
    );
};

const containerStyle = {
    // border: '3px solid red',
    width: '286px',
    borderRadius: '15px',
    margin: '0',
    padding: '0px',
};

const videoContainerStyle = {
    borderRadius: '15px',
    width: '101%',
    height: '215px',
    padding: '0px',
    // border: '3px solid blue',
    margin: '0px',
};

const videoStyle = {
    borderRadius: '15px',
    width: '100%',
    height: '100%',
    display: 'block',
    transform: 'scaleX(-1)',
    // border: '3px solid green',
    padding: '0px',
    margin: '0px',
};