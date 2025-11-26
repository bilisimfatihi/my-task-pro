import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../../redux/cards/operations";
import { selectCurrentBoard } from "../../redux/boards/selectors";
import { getBoardById } from "../../redux/boards/operations";
import { CardButton } from "../CardButton/CardButton";
import CustomDatePicker from "../Calendar/Calendar";
import {
  FormWrapper,
  Error,
  Label,
  Input,
  DescriptionArea,
  FormRadioWrapper,
  TitleForRadio,
  WrappRadioButtons,
  RadioButton,
  LabelRadio,
  DeadlineWrapper,
  DeadlineTitle,
} from "./AddCardForm.styled";

const schema = Yup.object().shape({
  title: Yup.string()
    .required("Please fill the title field")
    .max(25, "Must be no more than 25 characters long"),
  description: Yup.string().required("Please add a description"),
});

export const AddCardForm = ({ columnId }) => {
  const [labelChecked, setLabelChecked] = useState("without");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formKey, setFormKey] = useState(Date.now());
  const dispatch = useDispatch();
  const { board } = useSelector(selectCurrentBoard);

  const handleLabelChange = (e) => {
    setLabelChecked(e.target.value);
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    if (!board?._id) return;

    const cardData = {
      title: values.title,
      description: values.description,
      priority: labelChecked === "without" ? "none" : labelChecked,
      deadline: selectedDate,
      boardId: board._id,
      columnId,
    };

    try {
      await dispatch(addCard(cardData)).unwrap();
      await dispatch(getBoardById(board._id));

      toast.success("Card successfully added!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Formu sıfırla ama modal açık kalsın
      resetForm();
      setLabelChecked("without");
      setSelectedDate(new Date());
      setFormKey(Date.now()); // formik yeniden render
    } catch (error) {
      toast.error(
        error?.message || "Could not add the card. Check fields and try again.",
        { position: "top-right" }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      key={formKey}
      initialValues={{ title: "", description: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormWrapper>
          <Label htmlFor="title">
            <Input autoFocus type="text" name="title" placeholder="Title" />
            <Error>
              <ErrorMessage name="title" />
            </Error>
          </Label>
          <Label htmlFor="description">
            <DescriptionArea
              component="textarea"
              name="description"
              rows="5"
              placeholder="Description"
            />
            <Error>
              <ErrorMessage name="description" />
            </Error>
          </Label>
        </FormWrapper>

        <FormRadioWrapper>
          <TitleForRadio>Label color</TitleForRadio>
          <WrappRadioButtons role="group">
            {["low", "medium", "high", "without"].map((val) => (
              <LabelRadio key={val} htmlFor={val}>
                <RadioButton
                  type="radio"
                  name="priority"
                  value={val}
                  onChange={handleLabelChange}
                  checked={labelChecked === val}
                />
              </LabelRadio>
            ))}
          </WrappRadioButtons>
        </FormRadioWrapper>

        <DeadlineWrapper>
          <DeadlineTitle>Deadline</DeadlineTitle>
          <CustomDatePicker setSelectedDate={setSelectedDate} />
        </DeadlineWrapper>

        <CardButton btnText="Add" />
      </Form>
    </Formik>
  );
};

AddCardForm.propTypes = {
  columnId: PropTypes.string.isRequired,
};
