import { memo } from "react";
import MainInfoForm from "components/organisms/main-info/MainInfoForm";

const MainInfoPage: React.FC = () => {
  return (
    <>
      <MainInfoForm
        avatarUrl="https://placehold.co/400"
        firstName="John"
        lastName="Doe"
        phoneNumber="1234567890"
        email="john.doe@example.com"
        aboutMe="Frontend developer passionate about creating beautiful user interfaces."
        onSubmit={() => ({})}
        onAvatarInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) console.log(URL.createObjectURL(file));
        }}
      />
    </>
  );
};

export default memo(MainInfoPage);
