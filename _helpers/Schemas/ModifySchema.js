import Joi from "joi";

export default Joi.object({
  username: Joi.string().required(),
  password: Joi.string().empty(""),
  firstName: Joi.string().empty(""),
  lastName: Joi.string().empty(""),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .empty(""),
  role: Joi.string(),
  active: Joi.boolean(),
  guest: Joi.boolean(),
  room: Joi.number().empty(""),
});
