import Joi from "joi";

export default Joi.object({
  defaultUsername: Joi.boolean(),
  username: Joi.string().when("defaultUsername", {
    is: false,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().empty(""),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .empty(""),
  sendWelcomeEmail: Joi.boolean(),
  role: Joi.string().required(),
  active: Joi.boolean().required(),
  room: Joi.number().empty(""),
  guest: Joi.boolean(),
  diet: Joi.any(),
});
