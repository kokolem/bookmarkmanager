import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formField: {
    marginTop: theme.spacing(2),
  },
}));

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function BookmarkDialog({
  open,
  creatingNew,
  bookmarkCategories,
  bookmarkData,
  onClose,
  onDataSave,
}) {
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'));

  const [name, setName] = useState(bookmarkData.name);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [url, setUrl] = useState(bookmarkData.url);
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  let bookmarkCategoryFromProps;
  if (creatingNew) {
    bookmarkCategoryFromProps = '';
  } else {
    // eslint-disable-next-line max-len
    bookmarkCategoryFromProps = bookmarkCategories.filter(({ contains }) => contains.includes(bookmarkData.id));
  }
  const [bookmarkCategory, setBookmarkCategory] = useState(bookmarkCategoryFromProps);
  const handleBookmarkCategoryChange = (event) => {
    setBookmarkCategory(event.target.action);
  };

  const formFields = (
    <>
      <TextField label="Name" variant="outlined" fullWidth className={classes.formField} />
      <TextField label="URL" variant="outlined" fullWidth className={classes.formField} />
      <Autocomplete
        freeSolo
        options={bookmarkCategories.map((category) => category.name)}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField
            {...params}
            label="Category"
            variant="outlined"
            fullWidth
            className={classes.formField}
          />
        )}
      />
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} TransitionComponent={Transition}>
      {fullScreen ? (
        <>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {creatingNew ? 'Add bookmark' : 'Edit Bookmark'}
              </Typography>
              <Button color="inherit" onClick={onDataSave}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>{formFields}</DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>{creatingNew ? 'Add bookmark' : 'Edit Bookmark'}</DialogTitle>
          <DialogContent>{formFields}</DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onDataSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

BookmarkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  creatingNew: PropTypes.bool.isRequired,
  bookmarkCategories: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      name: PropTypes.string,
      contains: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  bookmarkData: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onDataSave: PropTypes.func.isRequired,
};

BookmarkDialog.defaultProps = {
  bookmarkData: {
    name: '',
    url: '',
  },
};
