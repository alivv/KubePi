import {del, get, patch, post} from "@/plugins/request"

const serviceAccountUrl = (cluster_name) => {
  return `/api/v1/proxy/${cluster_name}/k8s/api/v1/serviceaccounts`
}
const namespaceServiceAccountUrl = (cluster_name, namespace) => {
  return `/api/v1/proxy/${cluster_name}/k8s/api/v1/namespaces/${namespace}/serviceaccounts`
}

export function listServiceAccounts (cluster_name, limit, continueToken, search) {
  let url = serviceAccountUrl(cluster_name)
  const param = {}
  if (limit && limit !== 0) {
    param.limit = limit
  }
  if (continueToken && continueToken !== "") {
    param.continue = continueToken
  }
  if (search && search !== "") {
    param.fieldSelector = "metadata.namespace=" + search
  }
  return get(url, param)
}

export function listServiceAccountsWithNs (cluster_name, namespace) {
  return get(`${namespaceServiceAccountUrl(cluster_name, namespace)}`)
}

export function deleteServiceAccount (cluster_name, namespace, name) {
  return del(`${namespaceServiceAccountUrl(cluster_name, namespace)}/${name}`)
}

export function getServiceAccount (cluster_name, namespace, name) {
  return get(`${namespaceServiceAccountUrl(cluster_name, namespace)}/${name}`)
}

export function createServiceAccount (cluster_name, namespace, data) {
  return post(`${namespaceServiceAccountUrl(cluster_name, namespace)}`, data)
}

export function updateServiceAccount (cluster_name, namespace, name, data) {
  return patch(`${namespaceServiceAccountUrl(cluster_name, namespace)}/${name}`, data)
}

