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
            defaultChecked
            color="success"
            checked={selectedCheckbox === 'label'}
            onChange={() => handleCheckboxChange('label')}
          />
        }
        label="Category 1"
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            color="success"
            checked={selectedCheckbox === 'required'}
            onChange={() => handleCheckboxChange('required')}
          />
        }
        label="Category 2"
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            color="success"
            checked={selectedCheckbox === 'disabled'}
            onChange={() => handleCheckboxChange('disabled')}
          />
        }
        label="Category 3"
      />
    </FormGroup>
  );
}

export default CheckboxGroupCategory;
