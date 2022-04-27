import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { ULTS } from '../../helpers/ults';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../actions/page';

const generateRows = (ults) => {
    const rows = [];
    ults.forEach((ult) => {
        rows.push({
            id: ult["Part Number"],
            col1: ult["Part Number"],
            col2: ult["PN with Index"],
            col3: ult["Description"],
            col4: ult["Pieces / Car"],
            col5: ult["EBR"],
            col6: ult["Cars / Day"],
            col7: ult["DUNS"],
            col8: ult["Supplier (text)"],
            col9: ult["Land"],
            col10: ult["Zip Code"],
            col11: ult["City"],
            col12: ult["LT Type / Project"],
            col13: ult["LT"],
            col14: ult["Qty KLT/SLT per Pallet"],
            col15: ult["QTY PN per Container"],
            col16: ult["Containers needed considering Pzs/Car, EBR & Cars/Day"],
            col17: ult["Gebinde"],
            col18: ult["PN per Pallet"],
            col19: ult["Pallet"],
            col20: ult["Top"],
            col21: ult["SubZone"],
            col22: ult["FTL / LTL"],
            col23: ult["Pick Up Frecuency (each X day)"],
            col24: ult["Transport (Vollgut)"],
            col25: ult["Transport (Leergut)"],
            col26: ult["Supplier (number)"],
            col27: ult["Inhouse"],
            col28: ult["Trailer Yard"],
            col29: ult["WH Vollgut"],
            col30: ult["WH Leergut"],
            col31: ult["ULT"],
            col32: ult["Containers Soll"],
            col33: ult["Containers considering Gebinde Round Up"],
            col34: ult["Gebinden (pallets + tops)"],
            col35: ult["Total Gebinden"],
            col36: ult["Total Containers"],
        });
    });

    return rows;
};

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
    { field: 'col1', headerName: 'Part Number', width: 150 },
    { field: 'col2', headerName: 'PN with Index', width: 150 },
    { field: 'col3', headerName: 'Description', width: 150 },
    { field: 'col4', headerName: 'Pieces / Car', width: 150 },
    { field: 'col5', headerName: 'EBR', width: 150 },
    { field: 'col6', headerName: 'Cars / Day', width: 150 },
    { field: 'col7', headerName: 'DUNS', width: 150 },
    { field: 'col8', headerName: 'Supplier', width: 150 },
    { field: 'col9', headerName: 'Land', width: 150 },
    { field: 'col10', headerName: 'Zip Code', width: 150 },
    { field: 'col11', headerName: 'City', width: 150 },
    { field: 'col12', headerName: 'LT Type / Project', width: 150 },
    { field: 'col13', headerName: 'LT', width: 150 },
    { field: 'col14', headerName: 'QTY KLT / SLT per Pallet', width: 150 },
    { field: 'col15', headerName: 'QTY PN per Container', width: 150 },
    { field: 'col16', headerName: 'Containers needed considering Pzs/Car, EBR & Cars/Day', width: 150 },
    { field: 'col17', headerName: 'Gebinde', width: 150 },
    { field: 'col18', headerName: 'PN per Pallet', width: 150 },
    { field: 'col19', headerName: 'Pallet', width: 150 },
    { field: 'col20', headerName: 'Top', width: 150 },
    { field: 'col21', headerName: 'Subzone', width: 150 },
    { field: 'col22', headerName: 'FTL / LTL', width: 150 },
    { field: 'col23', headerName: 'Pick up Frequency (each X day)', width: 150 },
    { field: 'col24', headerName: 'Transport (Vollgut)', width: 150 },
    { field: 'col25', headerName: 'Transport (Leergut)', width: 150 },
    { field: 'col26', headerName: 'Supplier', width: 150 },
    { field: 'col27', headerName: 'Inhouse', width: 150 },
    { field: 'col28', headerName: 'Trailer Yard', width: 150 },
    { field: 'col29', headerName: 'WH (Vollgut)', width: 150 },
    { field: 'col30', headerName: 'WH (Leergut)', width: 150 },
    { field: 'col31', headerName: 'ULT', width: 150 },
    { field: 'col32', headerName: 'Containers Soll', width: 150 },
    { field: 'col33', headerName: 'Containers Considering Gebinde Round Up', width: 150 },
    { field: 'col34', headerName: 'Gebinden (Pallets + Tops)', width: 150 },
    { field: 'col35', headerName: 'Total Gebinden', width: 150 },
    { field: 'col36', headerName: 'Total Containers', width: 150 },

];

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(setCurrentPage('Dashboard'));
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
                {/* <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Chart />
                                </Paper>
                            </Grid> */}
                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Deposits />
                                </Paper>
                            </Grid> */}
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        {/* <Orders /> */}
                        <div style={{ height: 400, width: '95%' }}>
                            <DataGrid
                                // {...data}
                                rows={generateRows(ULTS)} columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                onRowDoubleClick={({ id }) => navigate(`/ult-detail/${id}`)}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
}