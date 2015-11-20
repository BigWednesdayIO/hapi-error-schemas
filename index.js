'use strict';

const joi = require('joi');

const errorSchema = joi.object({
  message: joi.string().description('A message explaining the error'),
  error: joi.string().description('An error message'),
  statusCode: joi.number().integer().description('An HTTP status code')
}).meta({className: 'Error'});

const statusErrors = {
  400: errorSchema.description('Bad request'),
  401: errorSchema.description('Unauthorized'),
  404: errorSchema.description('Not found'),
  500: errorSchema.description('Internal error')
};

module.exports = {
  schema: errorSchema,
  statuses: statuses => {
    if (statuses && statuses.length) {
      return statuses.reduce((result, status) => {
        if (statusErrors[status]) {
          result[status] = statusErrors[status];
        }
        return result;
      }, {});
    }

    return {
      400: statusErrors['400'],
      500: statusErrors['500']
    };
  }
};
