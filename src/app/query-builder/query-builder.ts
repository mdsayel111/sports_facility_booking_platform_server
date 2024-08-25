/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose"

// create Query builder query
class QueryBuilder<T> {
    // query obj
    query: Record<string, any>;
    // query model
    modelQuery: Query<T[], T>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
        this.modelQuery = modelQuery
        this.query = query
    }

    // create search method for search data
    search(feilds: string[]) {
        let searchObj: Record<string, object> = {};

        // create feildExist variable for check which feilds exist in this.query
        const feildExist: string[] = [];

        // check feild exist or not in query
        feilds.forEach(feild => {
            // if feild exist in query, store it in feildExist
            if (this.query[feild]) {
                feildExist.push(feild)
            }
        })

        // if feildExist.length > 0, means feilds inside feildExist array is exist in this.query, then prepare search obj by feildExist
        if (feildExist.length > 0) {
            searchObj = {
                $and: feildExist.map(feild => {
                    return {
                        [feild]: { $regex: this.query[feild], $options: "i" }
                    }
                })
            }
        }
        this.modelQuery.find(searchObj as FilterQuery<T>)

        return this
    }

    // create sort method for sort
    sort(feild: string) {
        // if feild exist in query
        if (this.query[feild]) {
            this.modelQuery.sort({ [feild]: this.query[feild] })
        }

        return this
    }
}

export default QueryBuilder