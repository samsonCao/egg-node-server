// This file is created by egg-ts-helper@1.24.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommon from '../../../app/controller/common';
import ExportBcAgreement from '../../../app/controller/bc/agreement';
import ExportBcArticle from '../../../app/controller/bc/article';
import ExportBcAuth from '../../../app/controller/bc/auth';
import ExportBcIndex from '../../../app/controller/bc/index';
import ExportBcPrivacy from '../../../app/controller/bc/privacy';
import ExportOpAuth from '../../../app/controller/op/auth';
import ExportOpBrowser from '../../../app/controller/op/browser';
import ExportOpDownload from '../../../app/controller/op/download';
import ExportOpIndex from '../../../app/controller/op/index';
import ExportOpWebsocket from '../../../app/controller/op/websocket';

declare module 'egg' {
  interface IController {
    common: ExportCommon;
    bc: {
      agreement: ExportBcAgreement;
      article: ExportBcArticle;
      auth: ExportBcAuth;
      index: ExportBcIndex;
      privacy: ExportBcPrivacy;
    }
    op: {
      auth: ExportOpAuth;
      browser: ExportOpBrowser;
      download: ExportOpDownload;
      index: ExportOpIndex;
      websocket: ExportOpWebsocket;
    }
  }
}
