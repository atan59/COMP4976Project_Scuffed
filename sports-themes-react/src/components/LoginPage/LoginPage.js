import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { signIn } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import classes from './LoginPage.module.css';
import TeamLogo from '../../Assets/Images/ScuffedImage.gif';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const LoginPage = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 5000,
        position: {
            x: 'right',
            y: 'top',
        }
    });

    useEffect(() => {
        setForm({
            'email': '',
            'password': ''
        })
    }, [])

    const setField = (name, value) => {
        setForm({ ...form, [name]: value })

        if (errors[name]) setErrors({ ...errors, [name]: null })
    }

    const findFormErrors = () => {
        const { email, password } = form;
        const newErrors = {};

        if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = "Your email must be a valid email";
        if (!email) newErrors.email = "Your email cannot be blank";
        if (!password) newErrors.password = "Your password cannot be blank";

        return newErrors;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const firebaseInstance = await signIn(form.email, form.password);

        if (firebaseInstance) {
            navigate("/home")
            return;
        }

        notyf.error("Your credentials did not match our records");
    };

    return (
        <>
            <div className={classes.loginContainer}>
                <div className={classes.logoContainer}>
                    <img src={TeamLogo} alt="Logo" />
                </div>
                <div className={classes.formContainer}>
                    <Form onSubmit={handleLogin}>
                        <h1>Team Scuffed</h1>
                        <div className={classes.inputElements}>
                            <Form.Group>
                                <Form.Label><i class="fas fa-envelope"></i> Email</Form.Label>
                                <Form.Control
                                    isInvalid={errors.email}
                                    type="text"
                                    value={form.email}
                                    onChange={e => setField('email', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className={classes.inputElements}>
                            <Form.Group>
                                <Form.Label><i class="fas fa-lock"></i> Password</Form.Label>
                                <Form.Control
                                    isInvalid={errors.password}
                                    type="password"
                                    value={form.password}
                                    onChange={e => setField('password', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <Button variant='dark' type="submit">Login</Button>
                    </Form>
                    <p>Need an account? <a href="/register">Sign up now!</a></p>
                </div>
            </div>
        </>
    )
}

export default LoginPage
