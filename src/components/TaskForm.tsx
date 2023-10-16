import { Button, Row, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import categories from "../categories";

interface AddTaskProps {
  onAdd: (title: string, dueDate: string, category: string) => void;
}

const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title should be at least 3 characters.")
    .required("Required"),
  dueDate: Yup.date().required("Invalid date."),
  category: Yup.string().required("Category is required."),
});

const TaskForm: React.FC<AddTaskProps> = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{ title: "", dueDate: "", category: "" }}
      validationSchema={TaskSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("value", values);
        resetForm();
        onAdd(values.title, values.dueDate, values.category);
      }}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <Field type="text" name="title" className="form-control" />
          <ErrorMessage name="title" component="div" className="text-danger" />
        </div>
        <Row>
          <Col>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <Field type="date" name="dueDate" className="form-control" />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-danger"
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Field as="select" name="category" className="form-select">
                <option key="default" value=""></option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-danger"
              />
            </div>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
