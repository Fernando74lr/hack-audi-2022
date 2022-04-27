import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ULTS } from '../../helpers/ults';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../actions/page';

export const ULTDetail = () => {
    const { ultId } = useParams();
    const dispatch = useDispatch();
    dispatch(setCurrentPage('Detalle'));
    const ult = ULTS.find((item) => String(ultId) === item['Part Number']);

    const isEmpty = (text) => text?.length > 0 ? text : 'No disponible';

    const paperStyle = { p: 2, display: 'flex', flexDirection: 'column', height: '180px' };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {
                (ult) ? (<>
                    <h1>ULT Part Number: {ult['Part Number']} </h1>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">PN with index</h2>
                                <p className="p-text">{isEmpty(ult["PN with Index"])}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">Description</h2>
                                <p className="p-text">{isEmpty(ult["Description"])}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">DUNS</h2>
                                <p className="p-text">{isEmpty(ult["DUNS"])}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">Supplier</h2>
                                <p className="p-text">{isEmpty(ult["Supplier (text)"])}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">LT</h2>
                                <p className="p-text">{isEmpty(ult["LT"])}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">Gebinde</h2>
                                <p className="p-text">{ult["Gebinde"]}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">PN per Pallet</h2>
                                <p className="p-text">{ult["PN per Pallet"]}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">Pallet</h2>
                                <p className="p-text">{ult["Pallet"]}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">Top</h2>
                                <p className="p-text">{ult["Top"]}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">Subzone</h2>
                                <p className="p-text">{ult["SubZone"]}</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={paperStyle}>
                                <h2 className="h-text">FTL / LTL</h2>
                                <p className="p-text">{ult["FTL / LTL"]}</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </>)
                    : <h2 className="h-text">Part number not found</h2>
            }
        </Container>
    );
}