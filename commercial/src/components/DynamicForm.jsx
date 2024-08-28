import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';

// Function to render form field based on type
const renderField = (field, value, handleChange) => {
  const { name, label, type, options, required } = field;

  switch (type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <TextField
          key={name}
          name={name}
          label={label}
          type={type}
          value={value[name] || ''}
          onChange={handleChange}
          required={required}
          fullWidth
          margin="normal"
        />
      );
    case 'select':
      return (
        <FormControl key={name} fullWidth margin="normal">
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            value={value[name] || ''}
            onChange={handleChange}
            required={required}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    default:
      return null;
  }
};

const DynamicForm = ({ fields, onSubmit, fieldsPerLine, btnTitle }) => {
  const [formValues, setFormValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  // Split fields into rows based on fieldsPerLine
  const rows = [];
  for (let i = 0; i < fields.length; i += fieldsPerLine) {
    rows.push(fields.slice(i, i + fieldsPerLine));
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      {rows.map((row, rowIndex) => (
        <Grid container spacing={2} key={rowIndex}>
          {row.map((field) => (
            <Grid item xs={12 / fieldsPerLine} key={field.name}>
              {renderField(field, formValues, handleChange)}
            </Grid>
          ))}
        </Grid>
      ))}
   

      <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: { xs: '100%', sm: '250px' }, // Largeur responsive
                height: '40px', // Hauteur du bouton
                mb: 2, // Marge en bas
                
              }}
            >
               {btnTitle}
            </Button>
    </Box>
  );
};

export default DynamicForm;
