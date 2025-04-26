import React, { useState } from "react";
import { v4 } from "uuid";
import UIBuilder from "./UIBuilderElement";
import {
  UIBuilderElementProperties,
  UIBuilderElementType,
  UIBuilderPayload,
  UIBuilderElementVideoPlatformType,
} from "types/ui-builder";
import { DropResult } from "react-beautiful-dnd";

const getDefaultSectionElement = (
  type: UIBuilderElementType
): UIBuilderElementProperties => {
  const base = { id: v4(), type, name: "" };
  switch (type) {
    case UIBuilderElementType.TEXT:
      return { ...base, content: "" };
    case UIBuilderElementType.IMAGE:
      return { ...base, images: [] };
    case UIBuilderElementType.VIDEO:
      return {
        ...base,
        videoPlatform: UIBuilderElementVideoPlatformType.YOUTUBE,
        videoUrl: "",
      };
    default:
      throw new Error("Unknown element type");
  }
};

const UIBuilderContainer: React.FC = () => {
  const [elements, setElements] = useState<UIBuilderElementProperties[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{ elements?: string }>({});

  const handleAddSection = (type: UIBuilderElementType) => {
    const newElement = getDefaultSectionElement(type);
    setElements([...elements, newElement]);
    setErrors({});
  };

  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const updated = Array.from(elements);
    const [removed] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, removed);
    setElements(updated);
  };

  const handleSubmit = () => {
    if (elements.length === 0) {
      setErrors({ elements: "At least one element is required." });
      return;
    }

    const payload: UIBuilderPayload = { elements };
    console.log("Submitting payload:", payload);
    alert("Changes submitted successfully!");
  };

  return (
    <UIBuilder
      // @ts-ignore
      elements={elements}
      errors={errors}
      showPreview={showPreview}
      onAddSection={handleAddSection}
      onDragEnd={handleDragEnd}
      onPreview={() => setShowPreview(true)}
      onClosePreview={() => setShowPreview(false)}
      onSubmit={handleSubmit}
    />
  );
};

export default UIBuilderContainer;
