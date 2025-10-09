import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL; // set this in app config

export type LoginResp = {
  token: string;
  agent: { id: string; name: string; email: string };
};

export async function loginAgent(email: string, password: string): Promise<LoginResp> {
  const res = await fetch(`${API_URL}/api/agent/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  // save securely
  await SecureStore.setItemAsync("jwt", data.token);
  await SecureStore.setItemAsync("agentId", data.agent?.id);
  await SecureStore.setItemAsync("agentName", data.agent?.name ?? "");

  return data;
}

export async function getToken() {
  return SecureStore.getItemAsync("jwt");
}

export async function getSavedAgent() {
  const id = await SecureStore.getItemAsync("agentId");
  const name = await SecureStore.getItemAsync("agentName");
  return { id: id ?? "", name: name ?? "" };
}

export async function logoutAgent() {
  await SecureStore.deleteItemAsync("jwt");
  await SecureStore.deleteItemAsync("agentId");
  await SecureStore.deleteItemAsync("agentName");
}
