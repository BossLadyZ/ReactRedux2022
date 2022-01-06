import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUser, updateUser } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));


export default function EditUser() {
    const classes = useStyles();

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();
    const { user } = useSelector(state => state.data);

    const [state, setstate] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",
    });

    const [error, setError] = useState("");

    const { name, email, phone, website } = state;

    useEffect(() => {
        dispatch(getUser(id));
    }, []);

    useEffect(() => {
        if (user) {
            setstate({ ...user });
        }
    }, []);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setstate({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !website) {
            setError("Please fill all the fields");
        } else {
            dispatch(updateUser(state, id));
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
            <h2>Edit User</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Name" type="text" value={name || ""} name="name" onChange={handleInputChange} />
                <TextField id="standard-basic" label="Email" type="email" value={email || ""} name="email" onChange={handleInputChange} />
                <TextField id="standard-basic" label="Contact" type="text" value={phone || ""} name="phone" onChange={handleInputChange} />
                <TextField id="standard-basic" label="Address" type="text" value={website || ""} name="website" onChange={handleInputChange} />
                <br></br>
                <Button
                    style={{ width: "100px" }}
                    variant="contained"
                    color="primary"
                    type="submit">
                    Update
                </Button>
            </form>
        </div>
    );
}
