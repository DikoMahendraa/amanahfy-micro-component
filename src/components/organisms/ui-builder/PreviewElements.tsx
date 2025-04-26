import { memo } from "react";
import { IoMdClose } from "react-icons/io";
import RenderElements from "./RenderElements";
import { UIBuilderElementProperties } from "types/ui-builder";
import { Modal } from "components/common";

type PreviewElementsProps = {
  show?: boolean;
  elements?: UIBuilderElementProperties[];
  onClose?: () => void;
};

const PreviewElements: React.FC<PreviewElementsProps> = ({
  show,
  elements,
  onClose,
}) => {
  return (
    <Modal show={show} size="7xl" onClose={onClose}>
      <div className="w-full space-y-5">
        <div className="w-full flex justify-between gap-4">
          <div className="text-lg font-semibold">Preview Elements</div>
          <div>
            {/* @ts-ignore */}
            <IoMdClose size={26} className="cursor-pointer" onClick={onClose} />
          </div>
        </div>
        <hr />
        <div className="w-full h-[calc(100dvh-12rem)] overflow-y-auto">
          <div className="w-full grid grid-cols-12 gap-4">
            <div className="col-span-9 space-y-6">
              <div className="text-4xl font-semibold">Campaign Title</div>
              <img
                alt=""
                className="w-full rounded-xl"
                src="https://dummyimage.com/600x200/9e9e9e/fff"
              />
              <div className="w-full flex items-center gap-4">
                <img
                  alt=""
                  className="w-20 aspect-square rounded-full"
                  src="https://dummyimage.com/100x100/9e9e9e/fff"
                />
                <div className="space-y-1">
                  <div className="text-xl font-semibold">Abdul Hammad</div>
                  <div className="text-sm text-gray-400">Organizer</div>
                </div>
              </div>
              <hr />
              <RenderElements elements={elements} />
            </div>
            <div className="col-span-3">
              <div className="w-full rounded-xl border-2 h-[calc(100dvh-20rem)] grid place-content-center">
                <div>Donation Widget</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(PreviewElements);
