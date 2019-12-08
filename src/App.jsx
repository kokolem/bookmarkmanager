import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import { fade, Hidden } from '@material-ui/core';
import BookmarkDialog from './BookmarkDialog';

const bookmarks = [
  {
    id: 1,
    name: 'Google',
    url: 'https://google.com',
  },
  {
    id: 2,
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/',
  },
  {
    id: 3,
    name: 'Google Codein',
    url: 'https://codein.withgoogle.com',
  },
  {
    id: 4,
    name: 'Fedora Project',
    url: 'https://getfedora.org/',
  },
];
const bookmarkCategories = [
  {
    id: 1,
    name: 'Search engines',
    contains: [1, 2],
  },
  {
    id: 2,
    name: 'Programming',
    contains: [3, 4],
  },
];

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: 'auto',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

export default function App() {
  const classes = useStyles();

  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const handleBookmarkDialogOpen = () => {
    setBookmarkDialogOpen(true);
  };
  const handleBookmarkDialogClose = () => {
    setBookmarkDialogOpen(false);
  };

  return (
    <>
      <BookmarkDialog
        open={bookmarkDialogOpen}
        creatingNew
        bookmarkCategories={bookmarkCategories}
        onClose={handleBookmarkDialogClose}
        onDataSave={handleBookmarkDialogClose}
      />
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Your bookmarks
        </Typography>
        <List>
          {bookmarkCategories.map(
            ({ id: categoryId, name: categoryName, contains: categoryContains }) => (
              <React.Fragment key={categoryId}>
                <ListSubheader className={classes.subheader}>{categoryName}</ListSubheader>
                {bookmarks.map(({ id: bookmarkId, name: bookmarkName, url: bookmarkUrl }) => (
                  <React.Fragment key={bookmarkId}>
                    {categoryContains.includes(bookmarkId) && (
                      <ListItem button component="a" href={bookmarkUrl}>
                        <ListItemAvatar>
                          <Avatar
                            alt="Bookmarked websites favicon"
                            src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmarkUrl}`}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={bookmarkName} secondary={bookmarkUrl} />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ),
          )}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Hidden xsDown>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
          <Hidden smUp>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Hidden>
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
            onClick={handleBookmarkDialogOpen}
          >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
