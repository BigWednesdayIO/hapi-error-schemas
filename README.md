# hapi-error-schemas

Currently supports the following http error statuses:
  - 400
  - 401
  - 404
  - 404

## Usage

Install

```sh
npm install --save hapi-error-schemas
```

Use default statuses

```node
const server = new hapi.Server({
  connections: {
    routes: {
      response: {
        status: require('hapi-error-schemas').statuses()
      }
    }
  }
});
```

Override statuses

```node
const server = new hapi.Server({
  connections: {
    routes: {
      response: {
        status: require('hapi-error-schemas').statuses([400, 404, 500])
      }
    }
  }
});
```
