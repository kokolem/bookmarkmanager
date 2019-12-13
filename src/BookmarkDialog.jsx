import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Close as CloseIcon } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import isURL from 'validator/es/lib/isURL';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formFieldTopMargin: {
    marginTop: theme.spacing(2),
  },
}));

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function BookmarkDialog({
  open,
  creatingNew,
  name,
  onNameChange,
  url,
  onUrlChange,
  category,
  onCategoryChange,
  bookmarkCategories,
  onClose,
  onSave,
}) {
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

  useEffect(() => {
    ValidatorForm.addValidationRule('isURL', (value) => isURL(value));
    return () => ValidatorForm.removeValidationRule('isURL');
  }, []);

  const formFields = (
    <>
      <TextValidator
        label="Name"
        variant="outlined"
        fullWidth
        className={fullScreen ? classes.formFieldTopMargin : null}
        value={name}
        onChange={onNameChange}
        validators={['required']}
        errorMessages={['This field is required.']}
      />
      <TextValidator
        label="URL"
        variant="outlined"
        fullWidth
        className={classes.formFieldTopMargin}
        value={url}
        onChange={onUrlChange}
        validators={['required', 'isURL']}
        errorMessages={['This field is required.', 'This is not a URL.']}
      />
      <Autocomplete
        freeSolo
        options={bookmarkCategories.map((categoryToChoose) => categoryToChoose.name)}
        defaultValue={category}
        inputValue={category}
        onInputChange={onCategoryChange}
        disableClearable
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="Category"
            variant="outlined"
            fullWidth
            className={classes.formFieldTopMargin}
          />
        )}
      />
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} TransitionComponent={Transition}>
      {fullScreen ? (
        <>
          <ValidatorForm onSubmit={onSave}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {creatingNew ? 'Add bookmark' : 'Edit Bookmark'}
                </Typography>
                <Button color="inherit" type="submit">
                  Save
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent>{formFields}</DialogContent>
          </ValidatorForm>
        </>
      ) : (
        <>
          <DialogTitle>{creatingNew ? 'Add bookmark' : 'Edit Bookmark'}</DialogTitle>
          <ValidatorForm onSubmit={onSave}>
            <DialogContent>{formFields}</DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </DialogActions>
          </ValidatorForm>
        </>
      )}
    </Dialog>
  );
}

BookmarkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  creatingNew: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  bookmarkCategories: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      bookmarks: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string,
        categoryName: PropTypes.string,
      })),
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
