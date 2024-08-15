import Joi from "joi"

const validateDob = (dob: string, helpers: Joi.CustomHelpers) => {
    const dateOfBirth = new Date(dob);
    const today = new Date();

    if (isNaN(dateOfBirth.getTime())) {
        return helpers.error('dob.invalid');
    }

    // Calculate age
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    const isBirthdayPassed = monthDifference > 0 || (monthDifference === 0 && today.getDate() >= dateOfBirth.getDate());

    if (age < 19 || (age === 19 && !isBirthdayPassed)) {
        return helpers.error('dob.underage');
    }

    return dateOfBirth;
}

const DobSchema = Joi.string()
    .custom(validateDob, 'DateOfBirth Validation')
    .messages({
        'dob.underage': 'You must be over 19 years old.',
        'dob.invalid': "dob must be in ISO 8601 string format."
    });

export default DobSchema