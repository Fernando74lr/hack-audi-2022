import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgImg from '../../assets/img/auth/audi-wallpaper.jpg';
import avatarImg from '../../assets/img/auth/audi-avatar.jpg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startLogout, startRegisterWithEmailPasswordName } from '../../actions/auth';

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

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        "red-audi": {
            main: '#d60e3b',
            contrastText: '#d60e399f',
        },
    },
});

export const Authentication = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const btnRegister = () => {
        dispatch(startRegisterWithEmailPasswordName(email, password, name));
    };

    const btnLogin = () => {
        dispatch(startLoginEmailPassword(email, password));
    };

    // const btnLogout = () => {
    //     dispatch(startLogout());
    // };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{ m: 1, border: '1px solid black', width: '50px', height: '50px' }}
                            src={avatarImg}
                            alt="avatar"
                        />
                        <Typography component="h1" variant="h5">
                            {(isLogin) ? 'Log in' : 'Sign in'}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            {
                                (!isLogin) && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full name"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={({ target }) => setName(target.value)}
                                        autoFocus
                                    />
                                )
                            }
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                autoFocus={isLogin}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'white' }}
                                color="red-audi"
                                onClick={isLogin ? btnLogin : btnRegister}
                            >
                                {isLogin ? 'Log in' : 'Sign in'}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        href="#"
                                        variant="body2"
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {
                                            (isLogin)
                                                ? "Don't have an account? Sign Up"
                                                : "I have an account"
                                        }
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}