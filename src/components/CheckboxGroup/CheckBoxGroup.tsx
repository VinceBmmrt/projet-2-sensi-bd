import React, { useState } from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';

function CheckboxGroupCategory() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleCheckboxChange = (name: string) => {
    // Si la case à cocher actuelle est déjà sélectionnée, décochez-la
    // Sinon, mettez à jour l'état pour la sélection actuelle
    setSelectedCheckbox((prev) => (prev === name ? null : name));
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            color="success"
            checked={selectedCheckbox === 'Category1'}
            onChange={() => handleCheckboxChange('Category1')}
          />
        }
        label="Category 1"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="success"
            checked={selectedCheckbox === 'Category2'}
            onChange={() => handleCheckboxChange('Category2')}
          />
        }
        label="Category 2"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="success"
            checked={selectedCheckbox === 'Category3'}
            onChange={() => handleCheckboxChange('Category3')}
          />
        }
        label="Category 3"
      />
    </FormGroup>
  );
}

export default CheckboxGroupCategory;
