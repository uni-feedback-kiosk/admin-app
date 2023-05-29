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
  VStack,
} from '@chakra-ui/react';
import { MdHelp } from 'react-icons/md';
import { memo } from 'react';
import Upload from './steps/Upload';
import ShowAndHide from './steps/ShowAndHide';
import Rename from './steps/Rename';
import Overview from './steps/Overview';

const steps = [
  { title: 'Overview', component: <Overview /> },
  { title: 'Upload', component: <Upload /> },
  { title: 'Show and Hide', component: <ShowAndHide /> },
  { title: 'Rename', component: <Rename /> },
];

const HelpButton = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, setActiveStep } = useSteps({
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
          <ModalBody as={VStack}>
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
            <Box width="0" minWidth="fit-content">
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
});

export default HelpButton;
