import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import Axios from "axios";

interface Values {
    email: string;
    password: string
}

interface Props {
    onSubmit: (values: Values) => void;
}

export const MyForm: React.FC<Props> = ({ onSubmit }) => {
    const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
    const checkData = ( values: Values ) => {
        if(values.email && values.password) {
            if((values.email.includes('@') && values.email.length > 8) && (values.password.length > 8 && values.password.match(reg))) {
                Axios.get("https://run.mocky.io/v3/9fbbfa37-ee95-44e3-b5e8-3483fcc2f320").then(res => {
                    if(res.data.hasOwnProperty(values.email)) {
                        const indexEmail = Object.keys(res.data).findIndex(x => x === values.email);
                        const indexPassword = Object.values(res.data).findIndex(x => x === values.password);
                        console.log(indexPassword, indexEmail)
                        if (indexEmail === indexPassword) {
                            alert ("You're logged in")
                        }
                        else {
                            alert ("Wrong email or password")
                        }
                    }
                    else {
                        alert ("Wrong email or password")
                    }
                })
            }
            else {
                alert("Invalid email and password")
            }
        }
        else {
            alert('Type email and password')
        }
    }

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {({ values, handleChange }) => (
                <Form>
                    <div className='formDives'>
                        <label>Email Address</label>
                        <TextField
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formDives'>
                        <label>Password</label>
                        <TextField
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" onClick={() => checkData(values)}>Log In</Button>
                </Form>
            )}
        </Formik>
    );
};