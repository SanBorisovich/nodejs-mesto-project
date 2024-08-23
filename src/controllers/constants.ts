import { celebrate, Joi } from 'celebrate';

export const notFoundUserMessage = 'Пользователь с таким id не существует';
export const notFoundCardMessage = 'Карточка с таким id не существует';

export const idValidationRules = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});
