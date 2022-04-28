import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ULTS } from '../../helpers/ults';
import { useDispatch } from 'react-redux';
import { Alert, AlertTitle, Autocomplete, Button, Divider, TextField } from '@mui/material';
import { useState } from 'react';
import { ZIPS } from '../../helpers/zips';
import { SUBZONES } from '../../helpers/subzones';
import { toastSW } from '../../helpers/sweetAlert2';
import { createOrder, getOrders } from '../../actions/order';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Typography from '@mui/material/Typography';

const partNumberComponent = (params) => (
    <TextField
        required
        margin="normal"
        {...params}
        label="Part number"
        id="partNumber"
        name="partNumber"
        variant="outlined"
    />
);

export const FormItem = () => {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();

    const [order, setOrder] = useState(null);
    const [partNumber, setPartNumber] = useState(null);
    const [piecesPerCar, setPiecesPerCar] = useState('');
    const [ebr, setEBR] = useState('');
    const [carsPerDay, setCarsPerDay] = useState('');
    const [kltPerSlt, setKltPerSlt] = useState('');
    const [pnPerContainer, setPnPerContainer] = useState('');
    const [zip, setZip] = useState('');

    const calculateZip = () => {
        return ZIPS.find((item) => {
            let range = item["ZIP-Code"].split(' - ');
            return parseInt(zip) >= parseInt(range[0]) && parseInt(zip) <= parseInt(range[1])
        });
    };

    const getFTLOrLTL = (subzone) => {
        const data = SUBZONES.find((item) => item["Subzone"] === subzone);
        return (Math.random() === 0) ? { key: "FTL", value: data.FTL } : { key: "LTL", value: data.LTL };
        // return { key: "FTL", value: 0.7 };
    };

    const getTotalGebinden = (gebinden) => {
        return (gebinden === 0 || gebinden >= 4) ? gebinden : 4;
    };

    const notE = (text) => text?.length > 0;

    const resetForm = () => {
        setPartNumber(null);
        setPiecesPerCar('');
        setEBR('');
        setCarsPerDay('');
        setKltPerSlt('');
        setPnPerContainer('');
        setZip('');
    };

    const calculateContainers = () => {
        const zipCode = calculateZip();
        const FTLOrLTL = getFTLOrLTL(zipCode.Zone);
        console.log(`Math.round((${piecesPerCar} * ${(Number(ebr) / 100)} * ${carsPerDay} / ${pnPerContainer};`)
        const containersNeeded = Number(Math.ceil((Number(piecesPerCar) * (Number(ebr) / 100) * Number(carsPerDay)) / Number(pnPerContainer)));
        const transportVollgut = Number(FTLOrLTL.value) / 2;
        const transportLeergut = Number(FTLOrLTL.value) / 2;
        const pickUpFrequency = 1;
        const supplier = 2;
        const inhouse = 0.88;
        const trailerYard = 1;
        const whVollgut = 2;
        const whLeergut = 1;
        const UTL = Number((Number(FTLOrLTL.value) + supplier + inhouse + trailerYard + whVollgut + whLeergut).toFixed(2));
        const containerSoll = Math.round(UTL * containersNeeded);
        const containersConsideringGebinde = Math.ceil(containerSoll / kltPerSlt) * kltPerSlt;
        const gebindenPalletsAndTops = containersConsideringGebinde / kltPerSlt;
        const totalGebinden = getTotalGebinden(gebindenPalletsAndTops);
        const newOrder = {
            partNumber: partNumber,
            pnWithIndex: partNumber,
            description: 'HALTER',
            piecesPerCar: Number(piecesPerCar),
            ebr: ebr,
            carsPerDay: Number(carsPerDay),
            duns: 816843914,
            supplierText: 'Allgaier',
            land: 'MX',
            zipCode: zip,
            city: 'Puebla',
            ltTypePerProject: 'Universal',
            lt: 568839,
            kltPerSlt: kltPerSlt,
            pnPerContainer: Number(pnPerContainer),
            containersNeeded: containersNeeded,
            gebinde: 'GT5368',
            pnPerPallet: Number(kltPerSlt * pnPerContainer),
            pallet: 568392,
            top: 567294,
            subzone: zipCode.Zone,
            FTLOrLTL: FTLOrLTL.key,
            pickUpFrequency: pickUpFrequency,
            transportVollgut: transportVollgut,
            transportLeergut: transportLeergut,
            supplier: supplier,
            inhouse: inhouse,
            trailerYard: trailerYard,
            whVollgut: whVollgut,
            whLeergut: whLeergut,
            ULT: UTL,
            containerSoll: containerSoll,
            containersConsideringGebinde: containersConsideringGebinde,
            gebindenPalletsAndTops: gebindenPalletsAndTops,
            totalGebinden: totalGebinden,
            totalContainers: totalGebinden * kltPerSlt,
        };
        resetForm();
        dispatch(createOrder(newOrder));
        dispatch(getOrders());
        setOrder(newOrder);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
            <Typography gutterBottom>
                Fill the form with the <b>input data required</b> to calculate the number of containers.
            </Typography>
            <Grid container spacing={(width < 680) ? 0 : 3}>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <Autocomplete
                        value={partNumber}
                        name="state"
                        onChange={(e, value) => setPartNumber(value)}
                        disablePortal
                        options={ULTS.map((item) => item["Part Number"])}
                        renderInput={(params) => partNumberComponent(params)}
                    />
                </Grid>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <TextField
                        margin="normal"
                        required
                        type="number"
                        fullWidth
                        id="piecesPerCar"
                        label="Pieces / Car"
                        name="piecesPerCar"
                        value={piecesPerCar}
                        onChange={({ target }) => setPiecesPerCar(target.value)}
                    />
                </Grid>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="ebr"
                        label="EBR (%)"
                        name="ebr"
                        value={ebr}
                        onChange={({ target }) => setEBR(target.value)}
                    />
                </Grid>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="carsPerDay"
                        label="Cars / Day"
                        name="carsPerDay"
                        value={carsPerDay}
                        onChange={({ target }) => setCarsPerDay(target.value)}
                    />
                </Grid>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="kltPerSlt"
                        label="QTY KLT / SLT per Pallet"
                        name="kltPerSlt"
                        value={kltPerSlt}
                        onChange={({ target }) => setKltPerSlt(target.value)}
                    />
                </Grid>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="pnPerContainer"
                        label="QTY PN per Container"
                        name="pnPerContainer"
                        value={pnPerContainer}
                        onChange={({ target }) => setPnPerContainer(target.value)}
                    />
                </Grid>
                <Grid item xs={(width < 680) ? 12 : 4}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="zip"
                        label="Zip"
                        name="zip"
                        value={zip}
                        onChange={({ target }) => setZip(target.value)}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className="fw"
                >
                    {
                        (order) && (<>
                            <Alert severity="success">
                                <AlertTitle><b>Total Containers:</b> {order.totalContainers}</AlertTitle>
                                <AlertTitle><b>Total Gebinden:</b> {order.totalGebinden}</AlertTitle>
                            </Alert>
                        </>)
                    }
                    <Divider variant="middle" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    {
                        (order) && (
                            <Button
                                variant="outlined"
                                color="warning"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    resetForm();
                                    setOrder(null);
                                }}
                            >
                                Clean
                            </Button>
                        )
                    }
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            if (notE(partNumber) && notE(piecesPerCar) && notE(ebr) && notE(carsPerDay) && notE(kltPerSlt) && notE(pnPerContainer) && notE(zip)) {
                                calculateContainers();
                            } else {
                                toastSW('error', 'Missing fields');
                            }
                        }}
                    >
                        Calculate & Save
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}