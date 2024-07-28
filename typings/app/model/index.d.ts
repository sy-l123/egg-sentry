// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportProject = require('../../../app/model/Project');
import ExportLcp = require('../../../app/model/lcp');
import ExportMetaData = require('../../../app/model/meta_data');
import ExportTiming = require('../../../app/model/timing');
import ExportUsers = require('../../../app/model/users');

declare module 'egg' {
  interface IModel {
    Project: ReturnType<typeof ExportProject>;
    Lcp: ReturnType<typeof ExportLcp>;
    MetaData: ReturnType<typeof ExportMetaData>;
    Timing: ReturnType<typeof ExportTiming>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
