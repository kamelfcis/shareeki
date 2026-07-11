import { sleep } from "@/utils";
import type { ApiResponse } from "@/types";

const API_DELAY = 300;
const ERROR_RATE = 0.05;

function shouldSimulateError(): boolean {
  return Math.random() < ERROR_RATE;
}

async function apiRequest<T>(
  data: T,
  delay = API_DELAY
): Promise<ApiResponse<T>> {
  await sleep(delay + Math.random() * 200);

  if (shouldSimulateError()) {
    throw new Error("Simulated API error. Please try again.");
  }

  return {
    data,
    message: "Success",
    success: true,
  };
}

export async function apiGet<T>(data: T): Promise<ApiResponse<T>> {
  return apiRequest(data);
}

export async function apiPost<T>(data: T): Promise<ApiResponse<T>> {
  return apiRequest(data, 500);
}

export async function apiPut<T>(data: T): Promise<ApiResponse<T>> {
  return apiRequest(data, 400);
}

export async function apiDelete<T>(data: T): Promise<ApiResponse<T>> {
  return apiRequest(data, 300);
}

export async function apiPaginate<T>(
  data: T[],
  page = 1,
  limit = 10,
  delay = API_DELAY
): Promise<ApiResponse<T[]>> {
  await sleep(delay + Math.random() * 200);

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    message: "Success",
    success: true,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
    },
  };
}
