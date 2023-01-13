import { FileInfo } from '../../../store/models';

export default interface FileButtonProps {
  file: FileInfo;
  onError: (message: string) => void;
}
