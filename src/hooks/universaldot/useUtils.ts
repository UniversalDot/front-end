import utils from '../../substrate-lib/utils';

const useUtils = () => {
  const transformParams = (
    paramFields: any[],
    inputParams: any[],
    opts = { emptyAsNull: true }
  ) => {
    const isNumType = (type: string) =>
      utils.paramConversion.num.some(el => type.indexOf(el) >= 0);
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map(inputParam => {
      // To cater the js quirk that `null` is a type of `object`.
      if (
        typeof inputParam === 'object' &&
        inputParam !== null &&
        typeof inputParam.value === 'string'
      ) {
        return inputParam.value.trim();
      } else if (typeof inputParam === 'string') {
        return inputParam.trim();
      }
      return inputParam;
    });
    const params = paramFields.map((field, ind) => ({
      ...field,
      value: paramVal[ind] || null,
    }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '') {
        return opts.emptyAsNull ? [...memo, null] : memo;
      }

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map((e: string) => e.trim());
        converted = converted.map((single: string) =>
          isNumType(type)
            ? single.indexOf('.') >= 0
              ? Number.parseFloat(single)
              : Number.parseInt(single)
            : single
        );
        return [...memo, converted];
      }

      // @TODO: check if correct;
      // Deal with a bounded vector
      if (type.indexOf('BoundedVec<') >= 0) {
        converted = converted.split(',').map((e: string) => e.trim());
        converted = converted.map((single: string) =>
          isNumType(type)
            ? single.indexOf('.') >= 0
              ? Number.parseFloat(single)
              : Number.parseInt(single)
            : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted =
          converted.indexOf('.') >= 0
            ? Number.parseFloat(converted)
            : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };

  const getErrorInfo = (apiResponse: any, api: any) => {
    let txFailed = false;
    let failureText: string = '';

    apiResponse.events
      // find/filter for failed events
      .filter(({ event }: any) =>
        api.events.system.ExtrinsicFailed.is(event)
      )
      // we know that data for system.ExtrinsicFailed is
      // (dispatchError, dispatchInfo)
      .forEach(({ event: { data: [error] } }: any) => {
        if (error.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(error.asModule)
          const { docs, method, section } = decoded
          // console.log(`${section}.${method}: ${docs.join(' ')}`)

          txFailed = true
          failureText = `${docs.join(' ')}`
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          // console.log(error.toString())
          txFailed = true
          failureText = error.toString();
        }
      })

    return {
      txFailed,
      failureText
    }
  }

  return {
    transformParams,
    getErrorInfo
  };
};

export { useUtils };
