import * as yup from 'yup';
const phoneRegExp = /^\d{8,12}$/;
export const UserSchema = yup.object().shape({
    role: yup.string().required('Please select your role'),
    username: yup.string().required('Please enter your Username'),
    firstname: yup.string().required('Please enter your First Name'),
    lastname: yup.string().required('Please enter your Last Name'),
    email: yup.string().email('Invalid email').required("please enter your email"),
    mobile: yup.string().matches(phoneRegExp, 'Invalid mobile number'),
    landline: yup.string().matches(phoneRegExp, 'Invalid phone number'),
    password: yup.string().min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
    .required(),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
})
