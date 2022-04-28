import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ULTS } from '../../helpers/ults';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../actions/page';
import { Typography } from '@mui/material';

export const ULTDetail = () => {
    const { ultId } = useParams();
    const dispatch = useDispatch();
    dispatch(setCurrentPage('Detail'));
    const ult = ULTS.find((item) => String(ultId) === item['Part Number']);

    const isEmpty = (text) => text?.length > 0 ? text : 'No disponible';

    const paperStyle = { p: 4, display: 'flex', flexDirection: 'column', height: '100%' };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {
                (ult) ? (<>
                    <Paper sx={paperStyle}>
                        <Typography gutterBottom variant="h4" component="div" sx={{ mb: 3 }}>
                            ULT Part Number: {ult['Part Number']}
                        </Typography>
                        <Grid container spacing={5}>
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    PN with index
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {isEmpty(ult["PN with Index"])}
                                </Typography>

                            </Grid>
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Description
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {isEmpty(ult["Description"])}
                                </Typography>

                            </Grid>
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    DUNS
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {isEmpty(ult["DUNS"])}
                                </Typography>

                            </Grid>
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Supplier
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {isEmpty(ult["Supplier (text)"])}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    LT
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {isEmpty(ult["LT"])}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Gebinde
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {ult["Gebinde"]}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    PN per Pallet
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {ult["PN per Pallet"]}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Pallet
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {ult["Pallet"]}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Top
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {ult["Top"]}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Subzone
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {ult["SubZone"]}
                                </Typography>

                            </Grid >
                            <Grid item xs={3}>
                                <Typography gutterBottom variant="h6" component="div">
                                    FTL / LTL
                                </Typography>
                                <Typography color="text.secondary" variant="p">
                                    {ult["FTL / LTL"]}
                                </Typography>
                            </Grid >
                        </Grid >
                    </Paper>
                </>)
                    : <Typography gutterBottom variant="h6" component="div">
                        Part number not found
                    </Typography>
            }
        </Container >
    );
}