import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TeamsEditForm } from "components";

export default {
  title: "Components/organisms/TeamsEditForm",
  component: TeamsEditForm,
} as Meta<typeof TeamsEditForm>;

const defaultValues = {
  team_name: "",
  team_code: "",
  team_default_fundraising_amount: undefined,
  team_story: "",
  team_profile_image: null,
  team_join_permission: "open",
};

const defaultErrors = {
  team_name: "",
  team_code: "",
  team_default_fundraising_amount: "",
  team_story: "",
  team_profile_image: "",
  team_join_permission: "",
};

const defaultTouched = {
  team_name: false,
  team_code: false,
  team_default_fundraising_amount: false,
  team_story: false,
  team_profile_image: false,
  team_join_permission: false,
};

const joinOptions = [
  { label: "Anyone can join", value: "open" },
  { label: "Invite only", value: "invite" },
];

export const Template: StoryObj = {
  render: () => {
    const [formState, setFormState] = useState(defaultValues);
    const [errors] = useState(defaultErrors);
    const [touched, setTouched] = useState(defaultTouched);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleDropImage = (acceptedFiles: File[]) => {
      console.log("Dropped image:", acceptedFiles);
    };

    const handleRadioChange = (value: string) => {
      setFormState((prev) => ({ ...prev, team_join_permission: value }));
    };

    const handleSubmit = () => {
      alert("Form submitted! (not really)");
    };

    return (
      <TeamsEditForm
        values={formState}
        errors={errors}
        touched={touched}
        onChange={handleChange}
        onBlur={handleBlur}
        onDropImage={handleDropImage}
        onRadioChange={handleRadioChange}
        onSubmit={handleSubmit}
        joinOptions={joinOptions}
      />
    );
  },
};
