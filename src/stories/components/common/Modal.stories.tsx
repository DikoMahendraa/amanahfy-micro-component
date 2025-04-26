import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "components";

const meta: Meta<typeof Modal> = {
  title: "Components/common/Modal",
  tags: ["autodocs"],
  component: Modal,
  argTypes: {
    size: {
      control: "select",
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <button
          className="mb-4 rounded bg-primary px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          Open Modal
        </button>
        <Modal {...args} show={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Hello from Modal</h2>
            <p>This is a sample modal content. You can customize it.</p>
            <button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    size: "md",
  },
};

export const Default = Template;
