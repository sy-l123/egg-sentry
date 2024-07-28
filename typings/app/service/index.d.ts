// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportMetaData = require('../../../app/service/metaData');
import ExportNews = require('../../../app/service/news');
import ExportProject = require('../../../app/service/project');
import ExportTopics = require('../../../app/service/topics');
import ExportUsers = require('../../../app/service/users');

declare module 'egg' {
  interface IService {
    metaData: AutoInstanceType<typeof ExportMetaData>;
    news: AutoInstanceType<typeof ExportNews>;
    project: AutoInstanceType<typeof ExportProject>;
    topics: AutoInstanceType<typeof ExportTopics>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
