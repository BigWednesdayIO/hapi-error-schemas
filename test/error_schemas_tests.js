'use strict';

const expect = require('chai').expect;

const errorSchemas = require('../index');

describe('schema', () => {
  it('accepts message', () => {
    expect(errorSchemas.schema.validate({message: 'some message'}).error).to.eql(null);
  });

  it('accepts error', () => {
    expect(errorSchemas.schema.validate({error: 'some_error'}).error).to.eql(null);
  });

  it('accepts statusCode', () => {
    expect(errorSchemas.schema.validate({statusCode: '400'}).error).to.eql(null);
  });

  it('rejects unknown property', () => {
    expect(errorSchemas.schema.validate({unknown: 'unknown'}).error.toString()).to.eql('ValidationError: "unknown" is not allowed');
  });
});

describe('statuses', () => {
  it('returns 400 and 500 status codes by default', () => {
    expect(Object.keys(errorSchemas.statuses())).to.eql(['400', '500']);
  });

  it('supports overriding returned statues', () => {
    expect(Object.keys(errorSchemas.statuses([400, 404]))).to.eql(['400', '404']);
  });

  it('supports 400 status', () => {
    expect(errorSchemas.statuses()[400]).to.eql(errorSchemas.schema.description('Bad request'));
  });

  it('supports 401 status', () => {
    expect(errorSchemas.statuses([401])['401']).to.eql(errorSchemas.schema.description('Unauthorized'));
  });

  it('supports 403 status', () => {
    expect(errorSchemas.statuses([403])['403']).to.eql(errorSchemas.schema.description('Forbidden'));
  });

  it('supports 404 status', () => {
    expect(errorSchemas.statuses([404])['404']).to.eql(errorSchemas.schema.description('Not found'));
  });

  it('supports 409 status', () => {
    expect(errorSchemas.statuses([409])['409']).to.eql(errorSchemas.schema.description('Conflict'));
  });

  it('supports 500 status', () => {
    expect(errorSchemas.statuses()[500]).to.eql(errorSchemas.schema.description('Internal error'));
  });
});
