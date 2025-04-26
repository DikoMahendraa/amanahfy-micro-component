import WrappedUIBuilder from "components/organisms/ui-builder/WrappedUIBuilder";
import { memo } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const FundraisingEditDescriptionPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full space-y-4">
      <div className="w-full flex justify-between items-start gap-4">
        <div className="inline-flex items-center gap-4">
          {/* @ts-ignore */}
          <HiOutlineArrowLongLeft
            title="Back"
            onClick={() => navigate(-1)}
            className="w-12 h-12 cursor-pointer"
          />
          <div className="text-2xl font-semibold">Back</div>
        </div>
      </div>
      <WrappedUIBuilder elements={[]} onSubmit={() => console.log("")} />
    </div>
  );
};

export default memo(FundraisingEditDescriptionPage);
