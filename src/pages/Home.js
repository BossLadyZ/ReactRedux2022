import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, loadUsers } from '../redux/actions';
import { Button, ButtonGroup } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900,
    },
});



export default function Home() {
    const classes = useStyles();
    const buttonStyles = useButtonStyles();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const { users } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user ?")) {
            dispatch(deleteUser(id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`)
    }
    return (
        <div>
            <div className={buttonStyles.root}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/add')}>
                    Add User
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                <StyledTableCell align="center">{user.website}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className={buttonStyles.root}>

                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="contained primary button group">
                                            <Button style={{ marginRight: "5px" }} color="primary" onClick={() => navigate(`/editUser/${user.id}`)}>Edit</Button>
                                            <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                                        </ButtonGroup>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
