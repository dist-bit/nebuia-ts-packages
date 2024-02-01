import { parseArgs } from 'util';

const files = [
  'packages/models/package.json',
  'packages/api/package.json',
  'packages/sdk/package.json',
];
type Pkg = {
  name: string;
  version: string;
  path: string;
};
const [models, api, sdk] = await Promise.all(
  files.map(async (path) => {
    const file = Bun.file(path);

    const contents = (await file.json()) as {
      name: string;
      version: string;
    };

    return {
      name: contents.name,
      version: contents.version,
      path,
    };
  }) as [Promise<Pkg>, Promise<Pkg>, Promise<Pkg>],
);
const ToUpdate = ['models', 'api', 'sdk', 'all'];
const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    minor: {
      type: 'boolean',
    },
    major: {
      type: 'boolean',
    },
    patch: {
      type: 'boolean',
    },
  },
  strict: true,
  allowPositionals: true,
});

if (!values.minor && !values.major && !values.patch) {
  throw new Error('You must specify a version bump type');
}
const resource = positionals[2];
if (!resource) {
  throw new Error('You must specify a resource to update');
}
if (!ToUpdate.includes(resource)) {
  throw new Error('Invalid resource');
}

type Versions = {
  name: string;
  versions: [string, string, string];
  path: string;
  minName: string;
};

const versions = [models, api, sdk].reduce<Versions[]>((acc, pkg) => {
  acc.push({
    name: pkg.name,
    versions: pkg.version.split('.') as [string, string, string],
    path: pkg.path,
    minName: pkg.name.split('/')[1]!,
  });

  return acc;
}, [] as Versions[]);

if (values.minor) {
  versions.forEach((pkg) => {
    if (pkg.minName === resource || resource === 'all') {
      pkg.versions[1] = (parseInt(pkg.versions[1], 10) + 1).toString();
      pkg.versions[2] = '0';
    }
  });
}

if (values.major) {
  versions.forEach((pkg) => {
    if (pkg.minName === resource || resource === 'all') {
      pkg.versions[0] = (parseInt(pkg.versions[0], 10) + 1).toString();
      pkg.versions[1] = '0';
      pkg.versions[2] = '0';
    }
  });
}

if (values.patch) {
  versions.forEach((pkg) => {
    if (pkg.minName === resource || resource === 'all') {
      pkg.versions[2] = (parseInt(pkg.versions[2], 10) + 1).toString();
    }
  });
}

await Promise.all(
  versions.map(async (pkg) => {
    const file = Bun.file(pkg.path);

    const contents = await file.json();

    contents.version = pkg.versions.join('.');

    await Bun.write(pkg.path, JSON.stringify(contents, null, 2));
  }),
);
