import Search from 'models/search'
import { initQueue } from '../jobs'

export const list = (where, options) =>
  Search.list(where, options)

export const get = (id, populate) =>
  Search.get(id, populate)

export const create = (payload) =>
  Search.create(payload)
    .then((doc) => initQueue.add(doc).then(() => doc))

export const update = (id, payload) =>
  Search.get(id).then(doc => doc.update(payload))

export const remove = (id) =>
  Search.get(id).then(doc => doc.hide())

export default {
  list,
  get,
  create,
  update,
  remove
}
