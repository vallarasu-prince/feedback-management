import { api } from "./axios/apiClient";

export async function login(values: any) {
  return api("/user/login", {
    method: "POST",
    data: values,
  });
}

export async function register(values: any) {
  return api("/user/register", {
    method: "POST",
    data: values,
  });
}

export async function getFeebacks() {
  return api("/feedbacks", {
    method: "GET",
  });
}

export async function getFeebackById(id: string) {
  return api(`/feedback/${id}`, {
    method: "GET",
  });
}

export async function voteFeeback(id: string, values: any) {
  return api(`/feedback/vote/${id}`, {
    method: "POST",
    data: values,
  });
}
export async function saveFeeback(id: string, values: any) {
  return api("/feedback", {
    method: "POST",
    data: values,
  });
}

export async function editFeeback(id: string, values: any) {
  return api(`/feedback/${id}`, {
    method: "PUT",
    data: values,
  });
}

export async function deleteFeeback(id: string) {
  return api(`/feedback/${id}`, {
    method: "DELETE",
  });
}
