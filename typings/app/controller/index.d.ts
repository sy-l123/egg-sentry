// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportMetaData = require('../../../app/controller/metaData');
import ExportNews = require('../../../app/controller/news');
import ExportProject = require('../../../app/controller/project');
import ExportTopics = require('../../../app/controller/topics');
import ExportUsers = require('../../../app/controller/users');

declare module 'egg' {
  interface IController {
    metaData: ExportMetaData;
    news: ExportNews;
    project: ExportProject;
    topics: ExportTopics;
    users: ExportUsers;
  }
}
