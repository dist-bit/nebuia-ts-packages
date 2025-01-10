/**
 * Use some of the [Blob] or [Buffer] types depending on the environment.
 *
 * If you are using the browser, it must be [Blob].
 * If you are using Node.js, it must be [Buffer].
 */
export type IsomorphicBlob = Blob | Buffer;
