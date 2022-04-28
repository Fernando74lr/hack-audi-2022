
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ULTS } from '../../helpers/ults';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../actions/page';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DialogFormSmall } from '../forms/DialogFormSmall';
import { getOrders } from '../../actions/order';
import { ScannerDialog } from '../scanner/ScannerDialog';
import { Chart } from './Chart';
import { getAllUsers } from '../../actions/user';
import { EditUserDialog } from './EditUserDialog';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Tec de Monterrey, Campus Puebla
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const columns = [
    { field: 'col1', headerName: 'Uid', width: 210, align: 'center' },
    { field: 'col2', headerName: 'Name', width: 210, align: 'center' },
    { field: 'col3', headerName: 'Email', width: 210, align: 'center' },
    { field: 'col4', headerName: 'User type', width: 210, align: 'center' },
];

export const TableProfiles = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentUid, setCurrentUid] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (users?.length === 0) {
            getAllUsers()
                .then((users) => {
                    setUsers(users);
                });
        }
    }, [dispatch, users])

    const generateRows = () => {
        const rows = [];
        users.forEach((user, i) => {
            rows.push({
                id: user.uid,
                col1: user.uid,
                col2: user.name,
                col3: user.email,
                col4: user.userType,
            });
        });

        return rows;
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <EditUserDialog
                open={open}
                handleClose={handleClose}
                currentUid={currentUid}
                setUsers={setUsers}
            />
            <Grid container spacing={3}>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Users */}
                        <div style={{ height: 400, width: '90%' }}>
                            <DataGrid
                                rows={generateRows()} columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                onRowDoubleClick={({ id }) => {
                                    setCurrentUid(id);
                                    handleOpen();
                                }}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
}