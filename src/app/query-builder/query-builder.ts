/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

// create Query builder query
class QueryBuilder<T> {
  // query obj
  query: Record<string, any>;
  // query model
  modelQuery: Query<T[], T>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // create search method for search data
  search(feilds: string[]) {
    const searchObj: Record<string, object> = {};

    // check feild exist or not in query
    feilds.forEach((feild) => {
      // if feild exist in query, store it in feildExist
      if (this.query[feild]) {
        searchObj[feild] = { $regex: this.query[feild], $options: "i" };
      }
    });

    this.modelQuery.find(searchObj as FilterQuery<T>);

    return this;
  }

  // create sort method for sort
  sort(feild: string) {
    // if feild exist in query
    if (this.query[feild]) {
      this.modelQuery.sort({ [feild]: this.query[feild] });
    }

    return this;
  }

  // create document count method for count document
  async documentCount() {
    // get query from modelQuery
    const query = this.modelQuery.getQuery();

    // get total document
    const totalDocument = await this.modelQuery.model.countDocuments(query);

    return totalDocument;
  }

  // create paginate method for pagination
  paginate() {
    // get page number from query
    const page = Number(this.query.page);

    this.modelQuery.skip(10 * (page - 1)).limit(10);
  }
}

export default QueryBuilder;
