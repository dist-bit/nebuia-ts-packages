# @nebuia-ts/utils

Small utils for projects that use the Nebuia API to help with common tasks/operations.

This package is part of the [Nebuia](https://nebuia.com) organization.

## Installation

```bash
npm install @nebuia-ts/utils
```

## Usage - Content

### Keys

Convert common keys to api headers.

```typescript
import { NebuiaKeys } from '@nebuia-ts/models';
import { convertKeysToHeaders } from '@nebuia-ts/utils';

const myKeys: NebuiaKeys = {
  apiKeys: "my-api-key",
  apiSecret: "my-api-secret",
}

const headers = convertKeysToHeaders(myKeys); // { public_keys: "my-api-key", secret_key: "my-api-secret" }
```

### Report

Get the validity of a report based on the status.

```typescript
import { checkNebuiaReportValidity } from '@nebuia-ts/utils';
import { NebuiaReport } from '@nebuia-ts/models';

const myReport: NebuiaReport = {
  // Nebuia report
}

const { status, title, summary } = checkNebuiaReportValidity(myReport);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
