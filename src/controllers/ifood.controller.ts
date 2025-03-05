import { Controller, Get } from '@nestjs/common';
const axios = require('axios');

@Controller('ifood')
export class IfoodController {
  private readonly accessToken = 'eyJraWQiOiJlZGI4NWY2Mi00ZWY5LTExZTktODY0Ny1kNjYzYmQ4NzNkOTMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI4MDlhYWUwNS03N2ZkLTQ3MjUtYjIyZC02Y2I0MDAwZWRjY2YiLCJvd25lcl9uYW1lIjoiODA5YWFlMDUtNzdmZC00NzI1LWIyMmQtNmNiNDAwMGVkY2NmIiwiaXNzIjoiaUZvb2QiLCJjbGllbnRfaWQiOiI4MDlhYWUwNS03N2ZkLTQ3MjUtYjIyZC02Y2I0MDAwZWRjY2YiLCJhdWQiOlsiaXRlbSIsImZpbmFuY2lhbCIsImNhdGFsb2ciLCJtZXJjaGFudCIsImxvZ2lzdGljcyIsInBpY2tpbmciLCJvYXV0aC1zZXJ2ZXIiLCJzaGlwcGluZyIsInJldmlldyIsImdyb2NlcmllcyIsImV2ZW50cyIsInByb21vdGlvbiIsIm9yZGVyIl0sImFwcF9uYW1lIjoiODA5YWFlMDUtNzdmZC00NzI1LWIyMmQtNmNiNDAwMGVkY2NmIiwic2NvcGUiOlsiaXRlbSIsInNoaXBwaW5nIiwiY2F0YWxvZyIsInJldmlldyIsIm1lcmNoYW50IiwibG9naXN0aWNzIiwicGlja2luZyIsImdyb2NlcmllcyIsImV2ZW50cyIsInByb21vdGlvbiIsImNvbmNpbGlhdG9yIiwib3JkZXIiXSwidHZlciI6InYyIiwibWVyY2hhbnRfc2NvcGUiOlsiNzNhZmRmMGUtNDg1ZS00MjAwLWJkM2MtM2QyOTNmMjljYWU3OnBpY2tpbmciLCI3M2FmZGYwZS00ODVlLTQyMDAtYmQzYy0zZDI5M2YyOWNhZTc6cHJvbW90aW9uIiwiNzNhZmRmMGUtNDg1ZS00MjAwLWJkM2MtM2QyOTNmMjljYWU3Om1lcmNoYW50IiwiNzNhZmRmMGUtNDg1ZS00MjAwLWJkM2MtM2QyOTNmMjljYWU3Omdyb2NlcmllcyIsIjczYWZkZjBlLTQ4NWUtNDIwMC1iZDNjLTNkMjkzZjI5Y2FlNzpjb25jaWxpYXRvciIsIjczYWZkZjBlLTQ4NWUtNDIwMC1iZDNjLTNkMjkzZjI5Y2FlNzpzaGlwcGluZyIsIjczYWZkZjBlLTQ4NWUtNDIwMC1iZDNjLTNkMjkzZjI5Y2FlNzpjYXRhbG9nIiwiNzNhZmRmMGUtNDg1ZS00MjAwLWJkM2MtM2QyOTNmMjljYWU3OmxvZ2lzdGljcyIsIjczYWZkZjBlLTQ4NWUtNDIwMC1iZDNjLTNkMjkzZjI5Y2FlNzppdGVtIiwiNzNhZmRmMGUtNDg1ZS00MjAwLWJkM2MtM2QyOTNmMjljYWU3Om9yZGVyIiwiNzNhZmRmMGUtNDg1ZS00MjAwLWJkM2MtM2QyOTNmMjljYWU3OnJldmlldyIsIjczYWZkZjBlLTQ4NWUtNDIwMC1iZDNjLTNkMjkzZjI5Y2FlNzpldmVudHMiXSwiZXhwIjoxNzQxMTU0Nzc1LCJpYXQiOjE3NDExMzMxNzUsImp0aSI6IjgwOWFhZTA1LTc3ZmQtNDcyNS1iMjJkLTZjYjQwMDBlZGNjZiIsIm1lcmNoYW50X3Njb3BlZCI6dHJ1ZX0.GoOBiLiorkES1NIBDeIrkR6-KI-O2xlgjVRu1pCviZ8tv6BIKZ9Do7nkewNvvmEAN0n5yEuH_JKFKUGqtNvX7uhK1GV_TWcINcI9K3e3nd66joH_GellNZ4xo8A0XT23K7CT9ZGDfceL7MPENuYVM_35tnkea6Aqp__iz6gC-Dc';

  private readonly merchantId = '73afdf0e-485e-4200-bd3c-3d293f29cae7'

  @Get()
  async getDataFromIfood() {
    try {

      const response = await axios.get(`https://merchant-api.ifood.com.br/merchant/v1.0/merchants/${this.merchantId}/opening-hours`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      console.log('----------', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados da API do iFood', error);
      throw error;
    }
  }
}

// delim@Alexandre_PC MINGW64 /d/Projetos/api-auto-dash (main)
// $ git remote -v
// upstream        https://github.com/geisslerdev/api-auto-dash.git (fetch)
// upstream        https://github.com/geisslerdev/api-auto-dash.git (push)

// delim@Alexandre_PC MINGW64 /d/Projetos/api-auto-dash (main)
// git remote add origin https://github.com:geisslerdev/api-auto-dash.git
// git remote add origin https://github.com:Alexandre-Konrath/api-auto-dash.git
// git@github.com:geisslerdev/api-auto-dash.git

// git config --global Alexandre-Konrath
// git config --global delimakonrath@
