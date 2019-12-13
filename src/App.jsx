import React, { useEffect, useState } from 'react';
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
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import {
  fade, Hidden, useMediaQuery, useTheme,
} from '@material-ui/core';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { bindMenu, bindToggle, usePopupState } from 'material-ui-popup-state/hooks';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SearchDialog from './SearchDialog';
import BookmarkDialog from './BookmarkDialog';

const useStyles = makeStyles((theme) => ({
  title: {
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
    overflow: 'hidden',
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
  noBookmarksText: {
    padding: theme.spacing(2, 2, 0),
  },
  userGeneratedText: {
    overflow: 'hidden',
  },
}));

export default function App() {
  const classes = useStyles();

  const [bookmarkCategories] = useLocalStorage('bookmarkCategories', [
    {
      id: 1,
      name: 'Uncategorized',
      bookmarks: [
        {
          id: 1,
          name: 'Edit me!',
          url: 'https://example.com',
          categoryName: 'Uncategorized',
        },
      ],
    },
  ]);

  const bookmarkMenu = usePopupState({
    variant: 'popover',
    popupId: 'bookmarkMenu',
  });

  // the bookmark whose 'more' button was clicked
  const [bookmarkMenuOpenOn, setBookmarkMenuOpenOn] = useState(null);

  // whether the bookmark can be moved up in the category
  const [bookmarkMenuCanBeMovedUp, setBookmarkMenuCanBeMovedUp] = useState(false);

  // whether the bookmark can be moved down in the category
  const [bookmarkMenuCanBeMovedDown, setBookmarkMenuCanBeMovedDown] = useState(false);

  const toggleBookmarkMenu = (bookmark, event) => {
    setBookmarkMenuOpenOn(bookmark);
    const bookmarkCategory = bookmarkCategories.find(
      (category) => category.name === bookmark.categoryName,
    );
    setBookmarkMenuCanBeMovedUp(bookmarkCategory.bookmarks[0] !== bookmark);
    setBookmarkMenuCanBeMovedDown(bookmarkCategory.bookmarks.slice(-1)[0] !== bookmark);
    bookmarkMenu.toggle(event);
  };
  const handleBookmarkMenuDelete = () => {
    // let's not mutate the state directly
    let bookmarkCategoriesAfterSave = bookmarkCategories.slice(0);

    const currentCategory = bookmarkCategoriesAfterSave.find(
      (category) => category.name === bookmarkMenuOpenOn.categoryName,
    );

    // delete the bookmark
    currentCategory.bookmarks = currentCategory.bookmarks.filter(
      (bookmark) => bookmark.id !== bookmarkMenuOpenOn.id,
    );

    // if the category the bookmark was in is left empty, delete it too
    bookmarkCategoriesAfterSave = bookmarkCategoriesAfterSave.filter(
      (category) => category.bookmarks.length !== 0,
    );

    writeStorage('bookmarkCategories', bookmarkCategoriesAfterSave);
  };
  const handleBookmarkMenuMoveUp = (moveBy) => {
    // let's not mutate the state directly
    const bookmarkCategoriesAfterSave = bookmarkCategories.slice(0);

    const currentCategory = bookmarkCategoriesAfterSave.find(
      (category) => category.name === bookmarkMenuOpenOn.categoryName,
    );

    const indexOfBookmark = currentCategory.bookmarks.indexOf(bookmarkMenuOpenOn);

    currentCategory.bookmarks.splice(
      indexOfBookmark - moveBy,
      0,
      currentCategory.bookmarks.splice(indexOfBookmark, 1)[0],
    );

    writeStorage('bookmarkCategories', bookmarkCategoriesAfterSave);
  };

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
  const editBookmark = (bookmark) => {
    setBookmarkDialogName(bookmark.name);
    setBookmarkDialogUrl(bookmark.url);
    setBookmarkDialogCategory(bookmark.categoryName);
    setEditingBookmarkId(bookmark.id);
    setCreatingNewBookmark(false);
    setBookmarkDialogOpen(true);
  };
  const handleBookmarkDialogSave = () => {
    // let's not mutate the state directly
    let bookmarkCategoriesAfterSave = bookmarkCategories.slice(0);

    // bookmark in a category without name is uncategorized
    const categoryFinalName = bookmarkDialogCategory === '' ? 'Uncategorized' : bookmarkDialogCategory;

    const bookmarkAfterEdit = {
      id: -1, // will be changed later
      name: bookmarkDialogName,
      url: bookmarkDialogUrl,
      categoryName: categoryFinalName,
    };

    if (creatingNewBookmark) {
      // the id is the highest id + 1
      bookmarkAfterEdit.id = Math.max(
        ...bookmarkCategoriesAfterSave.reduce(
          (ids, category) => ids.concat(category.bookmarks.map((bookmark) => bookmark.id)),
          [],
        ),
      ) + 1;
      // if there are no bookmarks (therefore no categories), Math.max will return -Infinity
      if (bookmarkAfterEdit.id === -Infinity) bookmarkAfterEdit.id = 1;
    } else {
      // the id doesn't change
      bookmarkAfterEdit.id = editingBookmarkId;

      // remove the bookmark from the current category
      // eslint-disable-next-line max-len
      const currentCategory = bookmarkCategoriesAfterSave.find((category) => category.bookmarks.map((bookmark) => bookmark.id).includes(editingBookmarkId));
      currentCategory.bookmarks = currentCategory.bookmarks.filter(
        (bookmark) => bookmark.id !== editingBookmarkId,
      );

      // if the category is left empty, remove it too
      bookmarkCategoriesAfterSave = bookmarkCategoriesAfterSave.filter(
        (category) => category.bookmarks.length !== 0,
      );
    }

    // add the bookmark to category (and create it if it doesn't exist)
    const categoryToAddBookmarkTo = bookmarkCategoriesAfterSave.find(
      (category) => category.name === categoryFinalName,
    );
    if (categoryToAddBookmarkTo === undefined) {
      const categoryToCreate = {
        // the id is the highest id + 1
        id:
          bookmarkCategoriesAfterSave.reduce(
            (highestId, category) => Math.max(category.id, highestId),
            0,
          ) + 1,
        name: categoryFinalName,
        bookmarks: [bookmarkAfterEdit],
      };

      // if creating the 'Uncategorized' category, add it to the beginning
      if (categoryFinalName === 'Uncategorized') {
        bookmarkCategoriesAfterSave.unshift(categoryToCreate);
      } else {
        bookmarkCategoriesAfterSave.push(categoryToCreate);
      }
    } else {
      categoryToAddBookmarkTo.bookmarks.push(bookmarkAfterEdit);
    }

    writeStorage('bookmarkCategories', bookmarkCategoriesAfterSave);
  };

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchDialogSearchTerm, setSearchDialogSearchTerm] = useState('');
  const [bookmarkCategoriesAppliedQuery, setBookmarkCategoriesAppliedQuery] = useState('');
  const [bookmarkCategoriesSearchResult, setBookmarkCategoriesSearchResult] = useState(
    bookmarkCategories,
  );
  useEffect(() => {
    if (bookmarkCategoriesAppliedQuery === '') {
      setBookmarkCategoriesSearchResult(bookmarkCategories);
    } else {
      let searchResult = bookmarkCategories.slice(0);

      searchResult = searchResult.map((category) => ({
        ...category,
        bookmarks: category.bookmarks.filter(
          // eslint-disable-next-line max-len
          (bookmark) => bookmark.name.toLowerCase().includes(bookmarkCategoriesAppliedQuery.toLowerCase())
            || bookmark.url.toLowerCase().includes(bookmarkCategoriesAppliedQuery.toLowerCase()),
        ),
      }));

      // remove empty categories
      searchResult = searchResult.filter((category) => category.bookmarks.length !== 0);

      setBookmarkCategoriesSearchResult(searchResult);
    }
  }, [bookmarkCategories, bookmarkCategoriesAppliedQuery]);

  const appMenu = usePopupState({
    variant: 'popover',
    popupId: 'appMenu',
  });

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}>
        <DialogTitle>About app</DialogTitle>
        <DialogContent>
          <Typography color="textSecondary">
            This web app was created using React and Material-UI. It uses your browsers local
            storage to store the bookmarks. It&apos;s also a PWA, which means you can install it
            like a native app and use it even offline.
            <br />
            See the source code on
            {' '}
            <a href="https://github.com/kokolem/bookmarkmanager/">Github</a>
.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setInfoDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <SearchDialog
        open={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
        searchTerm={searchDialogSearchTerm}
        onSearchTermChange={(e) => setSearchDialogSearchTerm(e.target.value)}
        onSearch={() => {
          setSearchDialogOpen(false);
          setBookmarkCategoriesAppliedQuery(searchDialogSearchTerm);
        }}
      />
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
        onSave={() => {
          setBookmarkDialogOpen(false);
          handleBookmarkDialogSave();
        }}
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Menu {...bindMenu(appMenu)}>
        <MenuItem
          onClick={() => {
            appMenu.close();
            setInfoDialogOpen(true);
          }}
        >
          About app
        </MenuItem>
      </Menu>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Menu {...bindMenu(bookmarkMenu)}>
        <MenuItem
          onClick={() => {
            bookmarkMenu.close();
            editBookmark(bookmarkMenuOpenOn);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            bookmarkMenu.close();
            handleBookmarkMenuDelete();
          }}
        >
          Delete
        </MenuItem>
        {bookmarkMenuCanBeMovedUp && (
          <MenuItem
            onClick={() => {
              bookmarkMenu.close();
              handleBookmarkMenuMoveUp(1);
            }}
          >
            Move up
          </MenuItem>
        )}
        {bookmarkMenuCanBeMovedDown && (
          <MenuItem
            onClick={() => {
              bookmarkMenu.close();
              handleBookmarkMenuMoveUp(-1);
            }}
          >
            Move down
          </MenuItem>
        )}
      </Menu>
      <CssBaseline />
      <Paper className={classes.paper} square={useMediaQuery(useTheme().breakpoints.down('xs'))}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Your bookmarks
        </Typography>
        <List>
          {bookmarkCategoriesSearchResult.map((category) => (
            <React.Fragment key={`category${category.id}`}>
              <ListSubheader className={classes.subheader}>{category.name}</ListSubheader>
              {category.bookmarks.map((bookmark) => (
                <React.Fragment key={`bookmark${bookmark.id}`}>
                  <ListItem button component="a" href={bookmark.url}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Bookmarked websites favicon"
                        src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`}
                      >
                        {bookmark.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={bookmark.name}
                      secondary={bookmark.url}
                      className={classes.userGeneratedText}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={(event) => toggleBookmarkMenu(bookmark, event)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
        {bookmarkCategoriesSearchResult.length === 0 && (
          <>
            {bookmarkCategoriesAppliedQuery === '' ? (
              <Typography color="textSecondary" className={classes.noBookmarksText}>
                No bookmarks saved. Go add some!
              </Typography>
            ) : (
              <Typography color="textSecondary" className={classes.noBookmarksText}>
                No bookmarks found for your query.
              </Typography>
            )}
          </>
        )}
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
                value={bookmarkCategoriesAppliedQuery}
                onChange={(e) => setBookmarkCategoriesAppliedQuery(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
          <Hidden smUp>
            <IconButton color="inherit" onClick={() => setSearchDialogOpen(true)}>
              <SearchIcon />
            </IconButton>
            {bookmarkCategoriesAppliedQuery !== '' && (
              <IconButton
                color="inherit"
                onClick={() => {
                  setBookmarkCategoriesAppliedQuery('');
                  setSearchDialogSearchTerm('');
                }}
              >
                <ClearIcon />
              </IconButton>
            )}
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
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <IconButton edge="end" color="inherit" {...bindToggle(appMenu)}>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
