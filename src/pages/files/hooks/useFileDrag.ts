import { useBoolean } from '@chakra-ui/react';
import { DragEventHandler } from 'react';

interface FileDragOptions {
  fileTypeFilter?: string;
  dropEffect?: DataTransfer['dropEffect'];
}

/**
 * Provides a state and toggle functions for a DropArea functionality.
 * @param {FileDragOptions=} options
 * @param {string=} options.fileTypeFilter Accepted file types for the transfer (optional).
 * @param {DataTransfer["dropEffect"]=} options.dropEffect Visual effect to be assigned to the transfer (optional).
 * @returns {boolean} Boolean indicating if the drop area should be shown, and functions to show and hide it.
 */
const useFileDrag = (
  options?: FileDragOptions,
): readonly [boolean, { show: DragEventHandler; hide: VoidFunction }] => {
  const [isDropAreaShown, { on: showDropArea, off: hideDropArea }] = useBoolean();

  const show: DragEventHandler = (event) => {
    if (options?.dropEffect) {
      // The value below can be only changed by assignment
      // eslint-disable-next-line no-param-reassign
      event.dataTransfer.effectAllowed = options.dropEffect;
    }
    if (!options?.fileTypeFilter || event.dataTransfer.types.includes(options.fileTypeFilter)) {
      showDropArea();
    }
  };

  return [isDropAreaShown, { show, hide: hideDropArea }] as const;
};

export default useFileDrag;
