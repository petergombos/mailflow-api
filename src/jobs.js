import Queue from 'bull'

import searchCtrl from 'controllers/search'
import config from './config'

export const initQueue = Queue('init search', config.REDIS)

initQueue.on('error', (err) => {
  throw new Error(err)
})

const currentlyProcessing = {}
initQueue.on('global:completed', (job, result) => {
  searchCtrl.update(job.data._id, {
    status: 'processing',
    processes: result,
    leftToProcess: result
  }).then((doc) => {
    currentlyProcessing[doc._id] = doc
  })
})

initQueue.on('global:failed', (job, err) => {
  searchCtrl.update(job.data._id, {
    status: 'finished',
    error: err
  })
})

export const searchQueue = Queue('search', config.REDIS)

searchQueue.on('error', (err) => {
  throw new Error(err)
})

searchQueue.on('global:completed', (job, result) => {
  const current = currentlyProcessing[job.data._id]
  current.leftToProcess = current.leftToProcess - 1
  current.emails = [...current.emails, ...result]
  if (current.leftToProcess === 0) {
    current.status = 'finished'
    current.save()
  }
})

searchQueue.on('global:failed', (job, result) => {
  const current = currentlyProcessing[job.data._id]
  current.leftToProcess = current.leftToProcess - 1
  if (current.leftToProcess === 0) {
    current.status = 'finished'
    current.save()
  }
})

export default {
  searchQueue,
  initQueue
}
