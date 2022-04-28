import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ULTS } from '../../helpers/ults';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DialogFormSmall } from '../forms/DialogFormSmall';
import { getOrders } from '../../actions/order';
import { ScannerDialog } from '../scanner/ScannerDialog';
import { Chart } from './Chart';


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
    { field: 'col1', headerName: 'Part Number', width: 150, align: 'center' },
    { field: 'col2', headerName: 'PN with Index', width: 150, align: 'center' },
    { field: 'col3', headerName: 'Description', width: 150, align: 'center' },
    { field: 'col4', headerName: 'Pieces / Car', width: 150, align: 'center' },
    { field: 'col5', headerName: 'EBR', width: 150, align: 'center' },
    { field: 'col6', headerName: 'Cars / Day', width: 150, align: 'center' },
    { field: 'col7', headerName: 'DUNS', width: 150, align: 'center' },
    { field: 'col8', headerName: 'Supplier', width: 150, align: 'center' },
    { field: 'col9', headerName: 'Land', width: 150, align: 'center' },
    { field: 'col10', headerName: 'Zip Code', width: 150, align: 'center' },
    { field: 'col11', headerName: 'City', width: 150, align: 'center' },
    { field: 'col12', headerName: 'LT Type / Project', width: 150, align: 'center' },
    { field: 'col13', headerName: 'LT', width: 150, align: 'center' },
    { field: 'col14', headerName: 'QTY KLT / SLT per Pallet', width: 150, align: 'center' },
    { field: 'col15', headerName: 'QTY PN per Container', width: 150, align: 'center' },
    { field: 'col16', headerName: 'Containers needed considering Pzs/Car, EBR & Cars/Day', width: 150, align: 'center' },
    { field: 'col17', headerName: 'Gebinde', width: 150, align: 'center' },
    { field: 'col18', headerName: 'PN per Pallet', width: 150, align: 'center' },
    { field: 'col19', headerName: 'Pallet', width: 150, align: 'center' },
    { field: 'col20', headerName: 'Top', width: 150, align: 'center' },
    { field: 'col21', headerName: 'Subzone', width: 150, align: 'center' },
    { field: 'col22', headerName: 'FTL / LTL', width: 150, align: 'center' },
    { field: 'col23', headerName: 'Pick up Frequency (each X day)', width: 150, align: 'center' },
    { field: 'col24', headerName: 'Transport (Vollgut)', width: 150, align: 'center' },
    { field: 'col25', headerName: 'Transport (Leergut)', width: 150, align: 'center' },
    { field: 'col26', headerName: 'Supplier', width: 150, align: 'center' },
    { field: 'col27', headerName: 'Inhouse', width: 150, align: 'center' },
    { field: 'col28', headerName: 'Trailer Yard', width: 150, align: 'center' },
    { field: 'col29', headerName: 'WH (Vollgut)', width: 150, align: 'center' },
    { field: 'col30', headerName: 'WH (Leergut)', width: 150, align: 'center' },
    { field: 'col31', headerName: 'ULT', width: 150, align: 'center' },
    { field: 'col32', headerName: 'Containers Soll', width: 150, align: 'center' },
    { field: 'col33', headerName: 'Containers Considering Gebinde Round Up', width: 150, align: 'center' },
    { field: 'col34', headerName: 'Gebinden (Pallets + Tops)', width: 150, align: 'center' },
    { field: 'col35', headerName: 'Total Gebinden', width: 150, align: 'center' },
    { field: 'col36', headerName: 'Total Containers', width: 150, align: 'center' },

];

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state);
    // dispatch(setCurrentPage('Dashboard'));

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])

    const generateRows = () => {
        const rows = [];
        const flag = (orders?.length > 0);
        const array = flag ? orders : ULTS
        array.forEach((ult, i) => {
            rows.push({
                id: flag ? `${ult.partNumber}-${i}` : ult["Part Number"],
                col1: flag ? ult.partNumber : ult["Part Number"],
                col2: flag ? ult.pnWithIndex : ult["PN with Index"],
                col3: flag ? ult.description : ult["Description"],
                col4: flag ? ult.piecesPerCar : ult["Pieces / Car"],
                col5: flag ? ult.ebr : ult["EBR"],
                col6: flag ? ult.carsPerDay : ult["Cars / Day"],
                col7: flag ? ult.duns : ult["DUNS"],
                col8: flag ? ult.supplierText : ult["Supplier (text)"],
                col9: flag ? ult.land : ult["Land"],
                col10: flag ? ult.zipCode : ult["Zip Code"],
                col11: flag ? ult.city : ult["City"],
                col12: flag ? ult.ltTypePerProject : ult["LT Type / Project"],
                col13: flag ? ult.lt : ult["LT"],
                col14: flag ? ult.kltPerSlt : ult["Qty KLT/SLT per Pallet"],
                col15: flag ? ult.pnPerContainer : ult["QTY PN per Container"],
                col16: flag ? ult.containersNeeded : ult["Containers needed considering Pzs/Car, EBR & Cars/Day"],
                col17: flag ? ult.gebinde : ult["Gebinde"],
                col18: flag ? ult.pnPerPallet : ult["PN per Pallet"],
                col19: flag ? ult.pallet : ult["Pallet"],
                col20: flag ? ult.top : ult["Top"],
                col21: flag ? ult.subzone : ult["SubZone"],
                col22: flag ? ult.FTLOrLTL : ult["FTL / LTL"],
                col23: flag ? ult.pickUpFrequency : ult["Pick Up Frecuency (each X day)"],
                col24: flag ? ult.transportVollgut : ult["Transport (Vollgut)"],
                col25: flag ? ult.transportLeergut : ult["Transport (Leergut)"],
                col26: flag ? ult.supplier : ult["Supplier (number)"],
                col27: flag ? ult.inhouse : ult["Inhouse"],
                col28: flag ? ult.trailerYard : ult["Trailer Yard"],
                col29: flag ? ult.whVollgut : ult["WH Vollgut"],
                col30: flag ? ult.whLeergut : ult["WH Leergut"],
                col31: flag ? ult.ULT : ult["ULT"],
                col32: flag ? ult.containerSoll : ult["Containers Soll"],
                col33: flag ? ult.containersConsideringGebinde : ult["Containers considering Gebinde Round Up"],
                col34: flag ? ult.gebindenPalletsAndTops : ult["Gebinden (pallets + tops)"],
                col35: flag ? ult.totalGebinden : ult["Total Gebinden"],
                col36: flag ? ult.totalContainers : ult["Total Containers"],
            });
        });

        return rows;
    };

    const handleClickOpenForm = () => {
        setOpen(true);
    };

    const handleCloseForm = () => {
        setOpen(false);
    };

    const handleClickOpenScann = () => {
        setOpen2(true);
    };

    const handleCloseScann = () => {
        setOpen2(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <DialogFormSmall
                open={open}
                handleClose={handleCloseForm}
            />
            <ScannerDialog
                open={open2}
                handleClose={handleCloseScann}
            />
            <Grid container spacing={3}>
                {/* Table */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Buttons */}
                        <Grid sx={{ mt: 3, mb: 3, width: '95%' }}>
                            <Grid item xs={12}>
                                <Button variant="outlined" color="primary" onClick={handleClickOpenForm}>
                                    Create new register
                                </Button>
                                <Button sx={{ ml: 2 }} variant="outlined" color="red-audi" onClick={handleClickOpenScann}>
                                    Scan part number
                                </Button>
                            </Grid>
                        </Grid>
                        {/* <Orders /> */}
                        <div style={{ height: 400, width: '95%' }}>
                            <DataGrid
                                rows={generateRows()} columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                onRowDoubleClick={({ id }) => navigate(`/ult-detail/${id.split('-')[0]}`)}
                            />
                        </div>
                    </Paper>
                </Grid>
                {/* Chart */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 340,
                        }}
                    >
                        <Chart orders={orders} />
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
}