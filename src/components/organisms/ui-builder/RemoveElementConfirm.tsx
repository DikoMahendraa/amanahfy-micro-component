import { memo } from "react";

import { IoMdClose } from "react-icons/io";
import { Modal, Button } from "components";
import { IconTrashDanger } from "components/icons";

type RemoveElementConfirmProps = {
  show?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

const RemoveElementConfirm: React.FC<RemoveElementConfirmProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} size="lg" onClose={onClose}>
      <div className="w-full space-y-6">
        <div className="w-full flex items-start gap-4">
          <IconTrashDanger size={80} />
          <div className="w-full space-y-1">
            <div className="w-full flex items-start gap-4 pb-2">
              <div className="w-full text-2xl pt-2">Delete section</div>
              {/* @ts-ignore */}
              <IoMdClose
                onClick={onClose}
                className="w-10 h-10 text-gray-500 cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-500 text-light">
              Are you sure you want to delete this sections? This action cannot
              be undone.
            </p>
            <div className="w-full flex items-stretch gap-4 pt-4">
              <Button
                type="button"
                variant="white"
                className="w-full"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                className="w-full"
                onClick={onConfirm}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(RemoveElementConfirm);
