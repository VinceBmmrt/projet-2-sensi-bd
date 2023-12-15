import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import leafIcon from '../../assets/feuille.png';
import './CreditPage.scss';

const steps = ['Vos 10 crédits', 'Vos demandes', 'Vos dons'];

const stepContent = [
  'À votre inscription, vous avez reçu d office 10 crédit feuilles, c est cadeau ! Ces petites feuilles vous permettront de prendre et de donner de façon équilibrer sur cette plateforme. Ainsi, il ni a pas que des preneurs ou que des donneurs.',
  'À chaque entrée en contact avec un donneur, vous utilisez un crédit feuille. Ainsi, vous avez dès le début la possibilité de contacter 10 personnes, c est pas formidable ?',
  'À chaque fois que vous postez une annonce de don, vous recevez 2 crédit feuilles. Ainsi tout s équilibre. Vous prenez, vous utilisez une feuille, vous donnez, vous en récupérez 2 ! Bonne lectures à vous !',
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      <img
        src={leafIcon}
        className="header__topContainer-credit-logo"
        alt="Logo Leeaf"
        style={{
          margin: 'auto',
          minHeight: '0vh',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <Typography variant="h5" sx={{ marginTop: 2, textAlign: 'center' }}>
        Les Crédits :{' '}
      </Typography>
      <div
        style={{
          width: '50%',
          margin: 'auto',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '90vh',
          }}
        >
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={completed[index]}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: '#95C23D', // circle color (COMPLETED)
                  },
                  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                    {
                      color: '#95C23D', // Just text label (COMPLETED)
                    },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: '#95C23D', // circle color (ACTIVE)
                  },
                  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                    {
                      color: 'common.white', // Just text label (ACTIVE)
                    },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'black', // circle's number (ACTIVE)
                  },
                }}
              >
                <StepButton
                  className="custom-step-button"
                  color="inherit"
                  onClick={handleStep(index)}
                  sx={{ marginX: 10 }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {stepContent[activeStep]}
            </Typography>
          </div>
        </Box>
      </div>
    </div>
  );
}
