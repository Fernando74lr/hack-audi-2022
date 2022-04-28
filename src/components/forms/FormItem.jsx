import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ULTS } from '../../helpers/ults';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../actions/page';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { ZIPS } from '../../helpers/zips';
// import { SUBZONES } from '../../helpers/subzones';
import { toastSW } from '../../helpers/sweetAlert2';
import { createOrder } from '../../actions/order';

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
    const dispatch = useDispatch();
    dispatch(setCurrentPage('Form'));

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
        // const data = SUBZONES.find((item) => item["Subzone"] === subzone);
        // return (Math.random() === 0) ? { key: "FTL", value: data.FTL } : { key: "LTL", value: data.LTL };
        return { key: "FTL", value: 0.7 };
    };

    const getTotalGebinden = (gebinden) => {
        return (gebinden === 0 || gebinden >= 4) ? gebinden : 4;
    };

    const notE = (text) => text?.length > 0;

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
        const order = {
            partNumber: partNumber,
            pnWithIndex: partNumber,
            description: '',
            piecesPerCar: Number(piecesPerCar),
            ebr: ebr,
            carsPerDay: Number(carsPerDay),
            duns: '',
            supplierText: '',
            land: '',
            zipCode: zip,
            city: '',
            ltTypePerProject: '',
            lt: '',
            kltPerSlt: kltPerSlt,
            pnPerContainer: Number(pnPerContainer),
            containersNeeded: containersNeeded,
            gebinde: '',
            pnPerPallet: Number(kltPerSlt * pnPerContainer),
            pallet: '',
            top: '',
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
        dispatch(createOrder(order));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <h1>New item form</h1>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Autocomplete
                        name="state"
                        onChange={(e, value) => setPartNumber(value)}
                        disablePortal
                        options={ULTS.map((item) => item["Part Number"])}
                        renderInput={(params) => partNumberComponent(params)}
                    />
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                <Grid item xs={3}>
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
                    xs={3}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        variant="outlined"
                        color="red-audi"
                        onClick={() => {
                            if (notE(partNumber) && notE(piecesPerCar) && notE(ebr) && notE(carsPerDay) && notE(kltPerSlt) && notE(pnPerContainer) && notE(zip)) {
                                calculateContainers();
                            } else {
                                toastSW('error', 'Missing fields');
                            }
                        }}
                    >
                        Calculate
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}