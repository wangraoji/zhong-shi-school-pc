import _ from "lodash";
export function resetParam(times:any,item:any) {
    let param: any;
    if (times && times.length > 0) {
      param = _.cloneDeep(item);
      param.pubbegin = times[0];
      param.pubend = times[1];
    } else {
      param = _.cloneDeep(item);
    }
    return param;
}