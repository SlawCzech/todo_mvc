import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTaskApi, updateTaskApi} from "../../helpers/api";
import {Formik} from "formik";

function DetailsEdit() {
    const [task, setTask] = useState({});
    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        getTaskApi(id).then((data) => setTask({...data, createdAt: new Date(data.createdAt)}));
    }, [])

    return (
        <>
            {!Object.keys(task).length ? (
                <h3>Loading...</h3>
            ) : (
                <Formik
                    initialValues={{description: '', ...task}}
                    validate={(values) => {
                        const errors = {};

                        if (values.name.length < 3){
                            errors.name = 'Something is no yes!'
                        }
                        return errors;
                    }}
                    onSubmit={async (values, {setSubmitting}) => {
                        await updateTaskApi({...task, ...values, id: task.id})
                        navigate(`/details/${task.id}`);
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                          errors,
                          touched,
                          isSubmitting
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name && errors.name}

                            <input
                                type='datetime-local'
                                name='createdAt'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.createdAt}
                            />
                            {errors.createdAt && touched.createdAt && errors.createdAt}

                            <textarea
                                name='description'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            />
                            {errors.description && touched.description && errors.description}

                            <button type="submit" disabled={isSubmitting}>
                                Update
                            </button>
                        </form>
                    )}
                </Formik>
            )}
        </>
    );
}

export default DetailsEdit;