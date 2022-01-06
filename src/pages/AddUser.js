import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));


export default function AddUser() {
    const classes = useStyles();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [state, setstate] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
    });

    const [error, setError] = useState("");

    const { name, email, phone, website } = state;
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setstate({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !website) {
            setError("Please fill all the fields");
        } else {
            dispatch(addUser(state));
            navigate("/");
            setError("");
        }
    };
    return (
        <div>
            <Button
                style={{ width: "100px", marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate('/')}>
                Back
            </Button>
            <h2>Add User</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name" type="text" value={name} name="name" onChange={handleInputChange} />
                <TextField id="standard-basic" label="Email" type="email" value={email} name="email" onChange={handleInputChange} />
                <TextField id="standard-basic" label="Contact" type="text" value={phone} name="phone" onChange={handleInputChange} />
                <TextField id="standard-basic" label="Address" type="text" value={website} name="website" onChange={handleInputChange} />
                <br></br>
                <Button
                    style={{ width: "100px" }}
                    variant="contained"
                    color="primary"
                    type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}
