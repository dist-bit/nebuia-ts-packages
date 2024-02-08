import { NebuiaApiResponse, NebuiaSignerRepository } from '../../api';

export class NebuiaSignature extends NebuiaSignerRepository {
  initToken(token: string): void {
    this.token = token;
  }

  override async verifyEmail(arg0: {
    email: string;
    documentId: string;
    code: string;
  }): NebuiaApiResponse<string> {
    const response = await super.verifyEmail(arg0);
    if (response.status) {
      this.token = response.payload;
    }

    return response;
  }
}
