import React from "react";
import { useMutation } from "react-query";
import { UseQueryOptions } from "../../lib/types";
import { request } from "../../utils/request";
import useQuery from "../../lib/useQuery";
import type { MutationResult, MutationOptions } from "../../lib/types";

export type User = {
  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
};

export const useUsers = (options?: UseQueryOptions) => {
  const { data, ...rest } = useQuery<User[]>(
    `https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address`,
    options
  );

  return {
    ...rest,
    data,
  };
};

export const useQueryUser = ({
  variables,
  ...options
}: UseQueryOptions = {}) => {
  const [query, setQuery] = React.useState<{ [key: string]: any }>();
  const { data, ...rest } = useQuery<User>(
    `https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address/{id}`,
    {
      ...options,
      variables: { ...variables, ...query },
      enabled: !!variables?.id || !!query?.id,
    }
  );

  const refetch = (values: { [key: string]: any }) => {
    setQuery(values);
  };

  return {
    ...rest,
    data,
    refetch,
  };
};

export const useCreateUser = (options: MutationOptions = {}) => {
  const { mutate, isLoading } = useMutation(
    (data: Partial<User>) =>
      request("https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address", {
        method: "POST",
        body: data,
      }),
    {
      ...options,
    }
  );

  return [isLoading, mutate] as MutationResult;
};

export const useUpdateUser = (options: MutationOptions = {}) => {
  const { mutate, isLoading } = useMutation(
    (data: Partial<User>) => {
      return request(
        "https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address/{id}",
        {
          method: "PATCH",
          body: data,
        }
      );
    },
    {
      ...options,
    }
  );

  return [isLoading, mutate] as MutationResult;
};

export const useDeleteUser = (options: MutationOptions = {}) => {
  const { mutate, isLoading } = useMutation(
    (data: Partial<User>) =>
      request(
        "https://fsl-candidate-api-vvfym.ondigitalocean.app/v1/address/{id}",
        {
          method: "DELETE",
          body: data,
        }
      ),
    {
      ...options,
    }
  );

  return [isLoading, mutate] as MutationResult;
};
