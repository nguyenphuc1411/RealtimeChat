import * as Yup from "yup"
const passwordRegex = /.*[!@#$%^&*(),.?":{}|<>].*/;
export const validationRegister = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(passwordRegex, 'Password must include least a special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Password not match")
        .required("Confirm Password is required")

});
export const validationLogin = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(passwordRegex, "Password must include least a special character")
        .required('Password is required')
});

export const validationGroup = Yup.object().shape({
    groupName: Yup.string().required("Group name is required")
        .min(5, "Room name min is 5")
        .max(100, "Max lenght group name is 100")
})
export const validationForgotPassword = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
})
export const validationChangePassword = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(passwordRegex, 'Password must include least a special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Password not match")
        .required("Confirm Password is required")
})

