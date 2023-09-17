import type NodeFormData from 'form-data';

export class IsomorphicFormData {
  private _formData: NodeFormData | FormData | undefined;
  async init(): Promise<void> {
    const env = this._env;
    if (env === 'browser') {
      this._formData = new FormData();
    }

    if (env === 'node') {
      const { default: FormData } = await import('form-data');
      this._formData = new FormData();
    }
  }

  get headers(): Record<string, string> {
    const env = this._env;
    if (env === 'browser') {
      return {
        'Content-Type': 'multipart/form-data',
      };
    }

    return (this.formData as NodeFormData).getHeaders();
  }

  append(name: string, value: Blob | Buffer, fileName: string): void;
  append(name: string, value: string): void;

  append(name: string, value: Blob | Buffer | string, fileName?: string): void {
    const env = this._env;
    if (typeof value !== 'string') {
      this._checkTypeValidity(value);
    }
    if (env === 'node') {
      (this.formData as NodeFormData).append(name, value, {
        filename: fileName,
      });

      return;
    }
    if (fileName) {
      (this.formData as FormData).append(name, value as Blob, fileName);
    } else {
      (this.formData as FormData).append(name, value as string);
    }
  }

  get formData(): NodeFormData | FormData {
    if (!this._formData) {
      throw new Error('FormData is not initialized');
    }

    return this._formData;
  }

  private get _env() {
    const isBrowser = typeof window !== 'undefined';
    const isNode = typeof process !== 'undefined';

    if (isBrowser) {
      return 'browser';
    }

    if (isNode) {
      return 'node';
    }

    throw new Error('Unknown environment');
  }

  private _checkTypeValidity(value: Blob | Buffer) {
    const _env = this._env;
    if (_env === 'browser' && !(value instanceof Blob)) {
      throw new Error('Invalid value type');
    }

    if (_env === 'node' && !(value instanceof Buffer)) {
      throw new Error('Invalid value type');
    }
  }
}
