import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { registerWithEmailAndPassword } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import classes from './RegisterPage.module.css';
import TeamLogo from '../../Assets/Images/ScuffedImage.gif';

const RegisterPage = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setForm({
            'email': '',
            'name': '',
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
        const { email, name, password, confirmPassword,
            role, position } = form;
        const newErrors = {};

        if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) newErrors.email = "Your email must be a valid email";
        if (!email) newErrors.email = "Your email cannot be blank";
        if (!name) newErrors.name = "Your name cannot be blank";
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
                    <img src={TeamLogo} alt="Logo" />
                </div>
                <div className={classes.formContainer}>
                    <Form className={classes.registerForm} onSubmit={handleRegister}>
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
                                <Form.Label><i class="fas fa-user"></i> Name</Form.Label>
                                <Form.Control
                                    isInvalid={errors.name}
                                    type="text"
                                    value={form.name}
                                    onChange={e => setField('name', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
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
                        <div className={classes.inputElements}>
                            <Form.Group>
                                <Form.Label><i class="fas fa-lock"></i> Confirm Password</Form.Label>
                                <Form.Control
                                    isInvalid={errors.confirmPassword}
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={e => setField('confirmPassword', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className={classes.inputElements}>
                            <Form.Group>
                                <Form.Label><i class="fas fa-tags"></i> Role</Form.Label>
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
                        </div>
                        {form.role === 'Player' ? (
                            <div className={classes.inputElements}>
                                <Form.Group>
                                    <Form.Label><i class="fas fa-running"></i> Position</Form.Label>
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
                            </div>
                        ) : <></>}
                        <Button variant='dark' type="submit">Register</Button>
                    </Form>
                    <p>Already have an account? <a href="/">Login now!</a></p>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
