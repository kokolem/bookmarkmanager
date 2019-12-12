import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default function SearchDialog({
  open, onClose, searchTerm, onSearchTermChange, onSearch,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search</DialogTitle>
      <ValidatorForm onSubmit={onSearch}>
        <DialogContent>
          <TextValidator
            label="Name or URL"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={onSearchTermChange}
            validators={['required']}
            errorMessages={['This field is required']}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Search
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

SearchDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
