import React from "react";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";
import { Button } from "components";
import {
  UIBuilderElementType,
  UIBuilderElementProperties,
} from "types/ui-builder";
import PreviewElements from "./PreviewElements";
import UIBuilderElement from "./UIBuilderElement";
import { addSectionOptions } from "constants/ui-builder";

type UIBuilderProps = {
  elements?: UIBuilderElementProperties[];
  errors?: { elements?: string };
  showPreview?: boolean;
  onAddSection?: (type: UIBuilderElementType) => void;
  onDragEnd?: (result: DropResult) => void;
  onPreview?: () => void;
  onClosePreview?: () => void;
  onSubmit?: () => void;
};

const UIBuilder: React.FC<UIBuilderProps> = ({
  elements,
  errors,
  showPreview,
  onAddSection,
  onDragEnd,
  onPreview,
  onClosePreview,
  onSubmit,
}) => {
  return (
    <div className="w-full text-gray-600 bg-white min-h-screen lg:p-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-2 lg:border-r-2">
          <div className="sticky top-0">
            <div className="text-lg font-semibold py-2 text-left lg:text-center">
              Add Sections
            </div>
            <div className="flex flex-row lg:flex-col gap-4 lg:p-12">
              {addSectionOptions.map((r) => (
                <div
                  key={r.type}
                  onClick={() => onAddSection?.(r.type)}
                  className="w-36 aspect-square border-2 rounded-xl flex flex-col gap-2 items-center justify-center text-gray-500 cursor-pointer hover:bg-primary hover:text-white hover:border-primary"
                >
                  {/* @ts-ignore */}
                  <r.icon className="w-12 h-12" />
                  <div>{r.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-10 py-4 lg:py-12 space-y-6">
          {elements?.length === 0 ? (
            <div className="w-full h-[60vh] flex flex-col justify-center items-center">
              <p className="text-gray-500">No elements have been added.</p>
              {errors?.elements && (
                <p className="text-red-500">{errors.elements}</p>
              )}
            </div>
          ) : (
            // @ts-ignore
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-elements">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {elements?.map((_, index) => (
                      <UIBuilderElement key={index} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          <p className="text-base text-gray-400">
            A long form description of your campaign...
          </p>

          <div className="flex flex-col lg:flex-row justify-end gap-4">
            <Button
              size="lg"
              variant="outline-primary"
              className="w-full lg:w-fit"
              disabled={elements?.length === 0}
              onClick={onPreview}
            >
              Preview
            </Button>
            <Button
              size="lg"
              variant="primary"
              className="w-full lg:w-fit"
              disabled={elements?.length === 0}
              onClick={onSubmit}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <PreviewElements
        show={showPreview}
        elements={elements}
        onClose={onClosePreview}
      />
    </div>
  );
};

export default UIBuilder;
