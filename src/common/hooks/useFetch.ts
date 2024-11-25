import {useEffect, useRef, useState} from "react";
import axios, {AxiosError, AxiosResponse, CancelToken} from "axios";
import {fillMissingPropsWithDefaults} from "../utils/objectUtils";

const DEFAULT_FETCH_CONFIG = {
  request: (): Promise<any> => new Promise((res) => setTimeout(() => res("default response"), 2000)),
  deps: [] as any[],
  condition: true,
  mapper: (res: any) => res,
  updater: (res: any, type: "success" | "err") => console.log({res, type}),
};

interface FetchConfig<T> {
  request: (cancelToken: CancelToken) => Promise<T>;
  deps: any[];
  condition: boolean;
  mapper: (response: any) => T;
  updater: (data: T, type: "success" | "err") => void;
}

type UseFetchReturn = [boolean, number, boolean];

const useFetch = <T>(config: Partial<FetchConfig<T>> = DEFAULT_FETCH_CONFIG): UseFetchReturn => {
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [isRequestFailed, setFailedRequest] = useState(false);

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    if (progressEvent.lengthComputable) {
      const currentPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setPercentage(currentPercentage);
    }
  };

  const {request, deps, condition, mapper, updater} = fillMissingPropsWithDefaults(config, DEFAULT_FETCH_CONFIG);

  const savedFetchCall = useRef(request);
  useEffect(() => {
    savedFetchCall.current = request;
  }, [request]);

  const onFetchEnd = () => {
    setPercentage(0);
    setLoading(false);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (condition) {
      const callSavedFetch = () => savedFetchCall.current(source.token, onUploadProgress);

      setLoading(true);
      setFailedRequest(false);

      callSavedFetch()
        .then((res: AxiosResponse) => {
          onFetchEnd();
          updater(mapper(res), "success");
        })
        .catch((err: Error | AxiosError) => {
          if (!axios.isCancel(err)) {
            onFetchEnd();
            setFailedRequest(true);
            updater(err, "err");
          }
        });

      return () => {
        source.cancel();
      };
    }
  }, [...(deps || [])]);

  return [loading, percentage, isRequestFailed];
};

export default useFetch;
