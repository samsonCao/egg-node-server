// This file is created by egg-ts-helper@1.24.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCommon from '../../../app/service/common';

declare module 'egg' {
  interface IService {
    common: ExportCommon;
  }
}
