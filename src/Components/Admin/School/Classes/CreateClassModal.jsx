import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/Components/InputField/InputField";
import { Button } from "@/Components/ui/button";

const CreateClassModal = ({ onCreate, themeProperties }) => {
  return (
    <Dialog>
      <DialogTrigger
        className="mb-4 absolute bottom-5 right-5 px-6 rounded-lg py-2"
        style={{
          backgroundColor: themeProperties?.normal1,
          color: themeProperties?.textColorAlt,
        }}
      >
        Create Class
      </DialogTrigger>
      <DialogContent
        style={{
          backgroundColor: themeProperties?.boxBackgroundSolid,
          padding: "0px",
          overflow: "hidden",
          color: themeProperties?.textColorAlt,
        }}
      >
        <DialogHeader
          style={{
            backgroundColor: themeProperties?.boxBackgroundTop,
            color: themeProperties?.textColorAlt,
          }}
          className="p-4 "
        >
          Create Class
        </DialogHeader>
        <div className="p-4">
          <Formik
            initialValues={{
              class_code: "",
              class_name: "",
              capacity: "",
              pclass: "",
              school_id: 1,
              academic_year_id: 1,
            }}
            validationSchema={Yup.object({
              class_code: Yup.string().required("Class code is required"),
              class_name: Yup.string().required("Class name is required"),
              capacity: Yup.number()
                .required("Capacity is required")
                .positive("Capacity must be positive")
                .integer("Capacity must be an integer"),
              pclass: Yup.string().required("Class is required"),
            })}
            onSubmit={onCreate}
          >
            {({ values, handleChange }) => (
              <Form className="space-y-6">
                <div className="flex w-full justify-between">
                  <InputField
                    value={values.class_code}
                    htmlFor="class_code"
                    placeholder="Class Code"
                    name="class_code"
                    handleChange={handleChange}
                    required
                  />
                  <InputField
                    value={values.class_name}
                    htmlFor="class_name"
                    placeholder="Class Name"
                    name="class_name"
                    handleChange={handleChange}
                    required
                  />
                </div>
                <div className="flex w-full justify-between">
                  <InputField
                    value={values.capacity}
                    htmlFor="capacity"
                    placeholder="Capacity"
                    name="capacity"
                    handleChange={handleChange}
                    required
                    type="number"
                  />
                  <InputField
                    value={values.pclass}
                    htmlFor="pclass"
                    placeholder="Grade"
                    name="pclass"
                    handleChange={handleChange}
                    required
                  />
                </div>
                <DialogFooter>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md"
                    style={{
                      backgroundColor: themeProperties?.normal1,
                      color: themeProperties?.textColorAlt,
                    }}
                  >
                    Create
                  </button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
