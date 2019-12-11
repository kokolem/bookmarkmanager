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
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BookmarkDialog from './BookmarkDialog';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    margin: 'auto',
    marginTop: theme.spacing(3),
    maxWidth: '80vw',
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      maxWidth: '100vw',
    },
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

  const [bookmarks] = useLocalStorage('bookmarks', [
    {
      id: 1,
      name: 'Edit me!',
      url: 'https://example.com',
    },
  ]);
  const [bookmarkCategories] = useLocalStorage('bookmarkCategories', [
    {
      id: 1,
      name: 'Uncategorized',
      contains: [1],
    },
  ]);

  const [bookmarkDialogName, setBookmarkDialogName] = useState('');
  const [bookmarkDialogUrl, setBookmarkDialogUrl] = useState('https://');
  const [bookmarkDialogCategory, setBookmarkDialogCategory] = useState('');
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const [editingBookmarkId, setEditingBookmarkId] = useState(-1);
  const [creatingNewBookmark, setCreatingNewBookmark] = useState(false);
  const createNewBookmark = () => {
    setBookmarkDialogName('');
    setBookmarkDialogUrl('https://');
    setBookmarkDialogCategory('');
    setEditingBookmarkId(-1);
    setCreatingNewBookmark(true);
    setBookmarkDialogOpen(true);
  };
  const handleBookmarkDialogSave = () => {
    if (creatingNewBookmark) {
      const bookmarkToCreate = {
        id: bookmarks.length + 1,
        name: bookmarkDialogName,
        url: bookmarkDialogUrl,
      };
      bookmarks.push(bookmarkToCreate);
    } else {
      const bookmarkToUpdate = bookmarks.find((bookmark) => bookmark.id === editingBookmarkId);
      bookmarkToUpdate.name = bookmarkDialogName;
      bookmarkToUpdate.url = bookmarkDialogUrl;

      // remove the bookmark from current category
      // eslint-disable-next-line max-len
      const currentCategory = bookmarkCategories.find((bookmarkCategory) => bookmarkCategory.contains.includes(editingBookmarkId));
      // eslint-disable-next-line max-len
      currentCategory.contains = currentCategory.contains.filter(
        (bookmarkId) => bookmarkId !== editingBookmarkId,
      );
    }

    // add the bookmark to a new category (and create it if it doesn't exist)
    const categoryFinalName = bookmarkDialogCategory === '' ? 'Uncategorized' : bookmarkDialogCategory;
    const categoryToAddBookmarkTo = bookmarkCategories.find(
      (category) => category.name === categoryFinalName,
    );
    if (categoryToAddBookmarkTo !== undefined) {
      categoryToAddBookmarkTo.contains.push(
        editingBookmarkId === -1 ? bookmarks.length : editingBookmarkId,
      );
    } else {
      const bookmarkCategoryToCreate = {
        id: bookmarkCategories.length + 1,
        name: bookmarkDialogCategory,
        contains: [creatingNewBookmark ? bookmarks.length : editingBookmarkId],
      };
      bookmarkCategories.push(bookmarkCategoryToCreate);
    }
    writeStorage('bookmarks', bookmarks);
    writeStorage('bookmarkCategories', bookmarkCategories);
    setBookmarkDialogOpen(false);
  };

  const bookmarkMenu = usePopupState({
    variant: 'popover',
    popupId: 'bookmarkEdit',
  });
  const [bookmarkMenuBookmarkId, setBookmarkMenuBookmarkId] = useState(-1);
  const toggleBookmarkMenu = (bookmarkId, event) => {
    setBookmarkMenuBookmarkId(bookmarkId);
    bookmarkMenu.toggle(event);
  };

  return (
    <>
      <BookmarkDialog
        open={bookmarkDialogOpen}
        creatingNew={creatingNewBookmark}
        name={bookmarkDialogName}
        onNameChange={(e) => setBookmarkDialogName(e.target.value)}
        url={bookmarkDialogUrl}
        onUrlChange={(e) => setBookmarkDialogUrl(e.target.value)}
        category={bookmarkDialogCategory}
        onCategoryChange={(e, value) => setBookmarkDialogCategory(value)}
        bookmarkCategories={bookmarkCategories}
        onClose={() => setBookmarkDialogOpen(false)}
        onSave={handleBookmarkDialogSave}
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Menu {...bindMenu(bookmarkMenu)}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Move up</MenuItem>
        <MenuItem>Move down</MenuItem>
      </Menu>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Your bookmarks
        </Typography>
        <List>
          {bookmarkCategories.map(
            ({ id: categoryId, name: categoryName, contains: categoryContains }) => (
              <React.Fragment key={`category${categoryId}`}>
                <ListSubheader className={classes.subheader}>{categoryName}</ListSubheader>
                {bookmarks.map(({ id: bookmarkId, name: bookmarkName, url: bookmarkUrl }) => (
                  <React.Fragment key={`bookmark${bookmarkId}in${categoryId}`}>
                    {categoryContains.includes(bookmarkId) && (
                      <ListItem button component="a" href={bookmarkUrl}>
                        <ListItemAvatar>
                          <Avatar
                            alt="Bookmarked websites favicon"
                            src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmarkUrl}`}
                          >
                            {bookmarkName[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bookmarkName} secondary={bookmarkUrl} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={(event) => toggleBookmarkMenu(bookmarkId, event)}
                          >
                            <MoreIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
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
            onClick={createNewBookmark}
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
