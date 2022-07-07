"use strict";

import * as nodePackage from "../utils/nodePackage";
import * as models from "./models";

export class BaseDao {
  async save(modelName, data: any) {
    try {
      const ModelName: any = models[modelName];
      return await new ModelName(data).save();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async find(
    modelName,
    query: any,
    projection: any,
    options: any,
    sort,              
    paginate,
    populateQuery: any
  ) {
    try {
        return await modelName.find(query, projection, options).lean();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne(
    modelName,
    query: any,
    projection: any,
    options: any,
    populateQuery: any
  ) {
    try {
      const ModelName: any = models[modelName];
        return await ModelName.findOne(query, projection, options).lean();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneAndUpdate(
    modelName,
    query: any,
    update: any,
    options: any
  ) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.findOneAndUpdate(query, update, options).lean();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAndRemove(
    modelName,
    query: any,
    update: any,
    options: any
  ) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.findOneAndRemove(query, update, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(modelName, query: any, update: any, options: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.update(query, update, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne(modelName, query: any, update: any, options: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.updateOne(query, update, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateMany(modelName, query: any, update: any, options: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.updateMany(query, update, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(modelName, query: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.remove(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteMany(modelName, query: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.deleteMany(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne(modelName, query: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.deleteOne(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async count(modelName, query: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.count(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async countDocuments(modelName, query: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.countDocuments(query);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async aggregate(modelName, aggPipe, options: any) {
    try {
      const ModelName: any = models[modelName];
      const aggregation: any = ModelName.aggregate(aggPipe);
      if (options) {
        aggregation.options = options;
      }
      return await aggregation.exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async insert(modelName, data, options: any) {
    try {
      const ModelName: any = models[modelName];
      const obj = new ModelName(data);
      await obj.save();
      return obj;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async insertMany(modelName, data, options: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.collection.insertMany(data, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async aggregateDataWithPopulate(modelName, group, populateOptions) {
    try {
      const ModelName: any = models[modelName];
      const aggregate = await ModelName.aggregate(group);
      const populate = await ModelName.populate(aggregate, populateOptions);
      return populate;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async bulkFindAndUpdate(bulk, query: any, update: any, options: any) {
    try {
      return await bulk.find(query).upsert().update(update, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async bulkFindAndUpdateOne(bulk, query: any, update: any, options: any) {
    try {
      return await bulk.find(query).upsert().updateOne(update, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByIdAndUpdate(
    modelName,
    query: any,
    update: any,
    options: any
  ) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.findByIdAndUpdate(query, update, options).lean();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async populate(modelName, data: any, populateQuery: any) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.populate(data, populateQuery);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async populateData(
    modelName,
    query: any,
    projection: any,
    options: any,
    collectionOptions
  ) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.find(query, projection, options)
        .populate(collectionOptions)
        .exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async multiplePopulateData(
    modelName,
    query: any,
    projection: any,
    options: any,
    collectionOptionOne,
    collectionOptionTwo
  ) {
    try {
      let ModelName: any = models[modelName];
      return await ModelName.find(query, projection, options)
        .populate(collectionOptionOne)
        .populate(collectionOptionTwo)
        .exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Add skip and limit to pipleine
   */
  addSkipLimit = (limit, pageNo, ignorLimit = false) => {
    if (limit) {
      limit = Math.abs(limit);
      // If limit exceeds max limit
      if (limit > 100 && !ignorLimit) {
        limit = 100;
      }
    } else {
      limit = 10;
    }
    if (pageNo && pageNo !== 0) {
      pageNo = Math.abs(pageNo);
    } else {
      pageNo = 1;
    }
    let skip = limit * (pageNo - 1);
    return [
      { $skip: skip },
      // { "$limit": limit + 1 }
      { $limit: limit },
    ];
  };

  paginate = async (
    modelName,
    pipeline: Array<Object>,
    limit: number,
    pageNo: number,
    options: any = {},
    pageCount = true,
    ignorLimit = false
  ) => {
    try {
      pipeline = [...pipeline, ...this.addSkipLimit(limit, pageNo, ignorLimit)];
      let ModelName: any = models[modelName];
      if (limit) {
        limit = Math.abs(limit);
        // If limit exceeds max limit
        if (limit > 100 && !ignorLimit) {
          limit = 100;
        }
      } else {
        limit = 10;
      }
      if (pageNo && pageNo !== 0) {
        pageNo = Math.abs(pageNo);
      } else {
        pageNo = 1;
      }
      let promiseAll = [];
        promiseAll = [ModelName.aggregate(pipeline).allowDiskUse(true)];
      if (pageCount) {
        for (let index = 0; index < pipeline.length; index++) {
          if ("$skip" in pipeline[index]) {
            pipeline = pipeline.slice(0, index);
          } else {
            pipeline = pipeline;
          }
        }
        pipeline.push({ $count: "total" });
        promiseAll.push(ModelName.aggregate(pipeline).allowDiskUse(true));
      }
      let result = await Promise.all(promiseAll);
      let nextHit = 0;
      let total = 0;
      let totalPage = 0;

      if (pageCount) {
        total = result[1] && result[1][0] ? result[1][0]["total"] : 0;
        totalPage = Math.ceil(total / limit);
      }

      let data: any = result[0];
      if (result[0].length > limit) {
        nextHit = pageNo + 1;
        data = result[0].slice(0, limit);
      }
      return {
        data: data || [],
        total: total,
        pageNo: pageNo,
        totalPage: totalPage,
        nextHit: nextHit,
        limit: limit,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  async findAll(modelName) {
    try {
      const ModelName: any = models[modelName];
      return await ModelName.find();
    } catch (error) {
      throw error;
    }
  }
}

export const baseDao = new BaseDao();
