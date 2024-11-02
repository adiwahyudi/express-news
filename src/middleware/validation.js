const requestValidation = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]); // Updated line
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            console.log("Validation error:", message);
            res.status(400).json({ error: message });
        }
    };
}

export {
    requestValidation
}
