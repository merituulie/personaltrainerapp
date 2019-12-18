import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', duration: '', activity: '', customer: ''
    });

    const handleClickOpen = () => {
        setTraining({
            date: props.training.date,
            duration: props.training.duration,
            activity: props.training.activity,
            customerLink: props.trainingCustomer
        });
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleInputChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value});
      }

      const addTraining = () => {
        props.saveTraining(training);
        handleClose();
      }

    return(
        <div>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Training</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                type="date"
                                margin="dense"
                                name="date"
                                value={training.date}
                                onChange={e => handleInputChange(e)}
                                label="Date"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                name="duration"
                                value={training.duration}
                                onChange={e => handleInputChange(e)}
                                label="Duration"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                name="activity"
                                value={training.activity}
                                onChange={e => handleInputChange(e)}
                                label="Activity"
                                fullWidth
                            />
                            </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={addTraining} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
        </div>
    );
}