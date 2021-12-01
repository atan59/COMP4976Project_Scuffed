import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { registerWithEmailAndPassword } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import classes from './RegisterPage.module.css';

const RegisterPage = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setForm({
            'email': '',
            'firstName': '',
            'lastName': '',
            'password': '',
            'confirmPassword': '',
            'role': '',
            'position': ''
        })
    }, [])

    const setField = (name, value) => {
        setForm({ ...form, [name]: value })

        if (errors[name]) setErrors({ ...errors, [name]: null })
    }

    const findFormErrors = () => {
        const { email, firstName, lastName, password,
            confirmPassword, role, position } = form;
        const newErrors = {};

        if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = "Your email must be a valid email";
        if (!email) newErrors.email = "Your email cannot be blank";
        if (!firstName) newErrors.firstName = "Your first name cannot be blank";
        if (!lastName) newErrors.lastName = "Your last name cannot be blank";
        if (password.length < 8) newErrors.password = "Your password must be at least 8 characters";
        if (!password) newErrors.password = "Your password cannot be blank";
        if (newErrors.password === undefined && password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!role) newErrors.role = "Please choose a role";

        if (role === 'Player' && !position) newErrors.position = "Your position cannot be blank";

        return newErrors;
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        registerWithEmailAndPassword(form.email, form.password, form).then(() => {
            navigate("/home")
        }).catch(err => console.error(err));
    };

    return (
        <>
            <div className={classes.registerContainer}>
                <div className={classes.logoContainer}>
                </div>
                <div className={classes.formContainer}>
                    <Form onSubmit={handleRegister}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
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
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                isInvalid={errors.firstName}
                                type="text"
                                value={form.firstName}
                                onChange={e => setField('firstName', e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                isInvalid={errors.lastName}
                                type="text"
                                value={form.lastName}
                                onChange={e => setField('lastName', e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                isInvalid={errors.password}
                                type="text"
                                value={form.password}
                                onChange={e => setField('password', e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                isInvalid={errors.confirmPassword}
                                type="text"
                                value={form.confirmPassword}
                                onChange={e => setField('confirmPassword', e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                isInvalid={errors.role}
                                as="select"
                                value={form.role}
                                onChange={e => setField('role', e.target.value)}>
                                <option value="">Select one</option>
                                <option value="Coach">Coach</option>
                                <option value="Player">Player</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.role}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {form.role === 'Player' ? (
                            <Form.Group>
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    isInvalid={errors.position}
                                    type="text"
                                    value={form.position}
                                    onChange={e => setField('position', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.position}
                                </Form.Control.Feedback>
                            </Form.Group>
                        ) : <></>}
                        <Button type="submit">Register</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
