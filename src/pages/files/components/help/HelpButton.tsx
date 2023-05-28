import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  IconButton,
  Stepper,
  useSteps,
  Step,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  Box,
} from '@chakra-ui/react';
import { MdHelp } from 'react-icons/md';
import Upload from './steps/Upload';
import Show from './steps/Show';
import RenameOrHide from './steps/RenameOrHide';
import Overview from './steps/Overview';

const steps = [
  { title: 'Overview', component: <Overview /> },
  { title: 'Upload', component: <Upload /> },
  { title: 'Show', component: <Show /> },
  { title: 'Rename or hide', component: <RenameOrHide /> },
];

const HelpButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <>
      <IconButton
        size="sm"
        onClick={onOpen}
        colorScheme="gray"
        icon={<Icon boxSize="5" as={MdHelp} />}
        aria-label="Get help"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="fit-content">
          <ModalHeader>Help</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stepper index={activeStep} colorScheme="green" marginBottom={4} gap={0}>
              {steps.map((step, index) => (
                <Step
                  as={Button}
                  colorScheme="gray"
                  variant="ghost"
                  minWidth="fit-content"
                  key={step.title}
                  onClick={() => setActiveStep(index)}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepNumber />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <StepTitle>{step.title}</StepTitle>
                </Step>
              ))}
            </Stepper>
            <Box width="0" minWidth="100%">
              {steps[activeStep].component}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HelpButton;
